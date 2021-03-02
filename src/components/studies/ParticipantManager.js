import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import StudyService from '../../services/Study';
import UserService from '../../services/User';
import UserTable from '../tables/UserTable';
import UsersModalButton from '../buttons/UsersModalButton';

function ParticipantManager({ studyId }) {
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
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

  // get participants from server
  useEffect(() => {
    async function getParticipants(sid) {
      let res = await StudyService.getParticipants(sid);
      if (res.status === "OK") {
        setParticipants(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getParticipants(studyId);
    }
    else {
      // user has no permission for this page
      setLoading(false);
    }
  }, [role, studyId]);

  const handleDeleteParticipant = async (uid) => {
    let res = await StudyService.deleteParticipant(studyId, uid);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove from local display
      setParticipants(old => old.filter(participantId => participantId !== uid));
    }
    else {
      setSnackSev("error");
    }
    setSnackOpen(true);
    setSnackMsg(res.message);
  }

  const handleSnackClose = () => setSnackOpen(false);

  const handleAddParticipants = async (Ids) => {
    let res = await StudyService.addParticipants(studyId, Ids);
    if (res.status === "OK") {
      // add to local display
      setParticipants(old => {
        return old.concat(Ids.filter((Id) => old.indexOf(Id) < 0))
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
        <UsersModalButton
          buttonLabel="Participant"
          modalTitle="Add Participant"
          roles={["participant"]}
          submitBtnLabel="Add"
          onSubmit={handleAddParticipants}
        />
      </Grid>
      <Grid item container direction="column">
        <UserTable
          Ids={participants}
          email={false}
          role={false}
          delModP1="Are you sure that you want to remove this participant?"
          handleDelete={handleDeleteParticipant}
          snackOpen={snackOpen}
          snackSev={snackSev}
          snackMsg={snackMsg}
          handleSnackClose={handleSnackClose}
        />
      </Grid>
    </Grid>
  )
}

export default ParticipantManager;
