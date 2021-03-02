import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import StudyService from '../../services/Study';
import UserService from '../../services/User';
import UserTable from '../tables/UserTable';

function TeamMemberManager({ studyId }) {
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
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

  // get members from server
  useEffect(() => {
    async function getMembers(sid) {
      let res = await StudyService.getMembers(sid);
      if (res.status === "OK") {
        setMembers(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getMembers(studyId);
    }
    else {
      // user has no permission for this page
      setLoading(false);
    }
  }, [role, studyId]);

  const handleDeleteMember = async (uid) => {
    let res = await StudyService.deleteMember(studyId, uid);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove member from local display
      setMembers(old => old.filter(memberId => memberId !== uid));
    }
    else {
      setSnackSev("error");
    }
    setSnackOpen(true);
    setSnackMsg(res.message);
  }

  const handleSnackClose = () => setSnackOpen(false);

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <Grid container direction="column">
      <Grid item xs={12} md="auto">
        + Team Member
      </Grid>
      <Grid item container direction="column">
        <UserTable
          Ids={members}
          email={false}
          delModP1="Are you sure that you want to remove this team member?"
          handleDelete={handleDeleteMember}
          snackOpen={snackOpen}
          snackSev={snackSev}
          snackMsg={snackMsg}
          handleSnackClose={handleSnackClose}
        />
      </Grid>
    </Grid>
  )
}

export default TeamMemberManager;