import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import NewGroupButton from '../buttons/NewGroupButton';
import StudyService from '../../services/Study';
import UserService from '../../services/User';
import GroupTable from '../tables/GroupTable';
import GroupService from '../../services/Group';

function GroupManager({ studyId }) {
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");

  // get user role from server
  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status === "OK") {
        setRole(res.result.role);
      }
      else if (res.status === "LOGIN_REQUIRED") {
        cleanLocalStorage();
        user.setIsLoggedIn(false);
      }
    }

    if (user.isLoggedIn) {
      getRole();
    }
  }, [user]);

  // get groups from server
  useEffect(() => {
    async function getGroups(sid) {
      let res = await GroupService.getGroups(sid);
      if (res.status === "OK") {
        setGroups(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getGroups(studyId);
    }
    else {
      // user has no permission for this page
      setLoading(false);
    }
  }, [role, studyId]);

  const handleDeleteGroup = async (gid) => {
    let res = await GroupService.deleteGroup(gid);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove group from local display
      setGroups(old => old.filter(group => group._id !== gid));
    }
    else {
      setSnackSev("error");
    }
    setSnackOpen(true);
    setSnackMsg(res.message);
  }

  const handleSnackClose = () => setSnackOpen(false);

  const handleGroupCreated = (res) => {
    if (res.status === "OK") {
      // add group to local display
      setGroups(old => {
        old.push(res.result);
        return old;
      });
      setSnackSev("success");
    }
    else {
      setSnackSev("error");
    }
    setSnackOpen(true);
    setSnackMsg(res.message);
  }

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <Grid container direction="column">
      <Grid item xs={12} md="auto">
        <NewGroupButton studyId={studyId} handleCreated={handleGroupCreated} />
      </Grid>
      <Grid item container direction="column">
        <GroupTable
          studyId={studyId}
          groups={groups}
          delModP1="Are you sure that you want to remove this group?"
          handleDelete={handleDeleteGroup}
          snackOpen={snackOpen}
          snackSev={snackSev}
          snackMsg={snackMsg}
          handleSnackClose={handleSnackClose}
        />
      </Grid>
    </Grid>
  )
}

export default GroupManager;
