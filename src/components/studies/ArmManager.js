import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import ArmTable from '../tables/ArmTable';
import NewArmButton from '../buttons/NewArmButton';
import StudyService from '../../services/Study';
import UserService from '../../services/User';



function GroupManager({ studyId }) {
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [arms, setArms] = useState([]);
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
    async function getArms(sid) {
      let res = await StudyService.getArms(sid);
      if (res.status === "OK") {
        setArms(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getArms(studyId);
    }
    else {
      // user has no permission for this page
      setLoading(false);
    }
  }, [role, studyId]);

  const handleDeleteArm = async (aid) => {
    let res = await StudyService.deleteArm(studyId, aid);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove group from local display
      setArms(old => old.filter(group => group._id !== aid));
    }
    else {
      setSnackSev("error");
    }
    setSnackOpen(true);
    setSnackMsg(res.message);
  }

  const handleSnackClose = () => setSnackOpen(false);

  const handleArmCreated = (res) => {
    if (res.status === "OK") {
      // res.result is the whole study info
      // extract arm info and update the state
      setArms(res.result.arms);
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
        <NewArmButton studyId={studyId} handleCreated={handleArmCreated} />
      </Grid>
      <Grid item container direction="column">
        <ArmTable
          studyId={studyId}
          arms={arms}
          delModP1="Are you sure that you want to remove this arm?"
          handleDelete={handleDeleteArm}
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
