import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import EventTable from '../tables/EventTable';
import Layout from '../layout/Layout';
import NewEventButton from '../buttons/NewEventButton';
import StudyService from '../../services/Study';
import UserService from '../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

function Arm() {
  const { studyId, armId } = useParams();
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [arm, setArm] = useState({});
  const [study, setStudy] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");

  const handleSnackClose = () => setSnackOpen(false);

  const handleDeleteEvent = async (eventId) => {
    let res = await StudyService.deleteEvent(studyId, armId, eventId);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove event from local display list
      setArm(old => {
        old.events = old.events.filter(event => event._id !== eventId);
        return old;
      })
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  // get user role from server
  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status === "OK") {
        setRole(res.result.role);
        // user has no permission for this page
        if (res.result.role === "participant") {
          setLoading(false);
        }
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

  // get arm from server
  useEffect(() => {
    async function getStudyAndArm(sid, aid) {
      let res = await StudyService.getStudy(sid);
      if (res.status === "OK") {
        setStudy(res.result)
        setArm(res.result.arms.filter(arm => arm._id === aid)[0]);
      }
    }

    if (role === "admin" || role === "ra") {
      setLoading(true);
      getStudyAndArm(studyId, armId);
      setLoading(false);
    }
  }, [role, armId, studyId]);

  const handleEventCreated = (res) => {
    if (res.status === "OK") {
      setSnackSev("success");
      setArm(res.result.arms.filter(arm => arm._id === armId)[0]);
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  if (loading) {
    return (
      <Layout title="Loading ...">
        <div>Loading ...</div>
      </Layout>
    );
  }
  if (role === "participant" || !study || !study.members ||
    (localStorage.getItem("uid") !== study.creator &&
      !study.members.includes(localStorage.getItem("uid")))) {
    return (
      <Layout title="Access Denied">
        <div>You don't have access to this page</div>
      </Layout>
    );
  }
  return (
    <Layout
      title={`Arm - ${arm.name}`}
    >
      <Paper className={classes.root}>
        <Grid container direction="column">
          <Grid item xs={12} md="auto">
            <NewEventButton studyId={studyId} armId={armId} handleCreated={handleEventCreated} />
          </Grid>
          <Grid item container direction="column">
            <EventTable
              studyId={studyId}
              armId={armId}
              events={arm.events || []}
              delModP1="Are you sure that you want to remove this event?"
              handleDelete={handleDeleteEvent}
              snackOpen={snackOpen}
              snackSev={snackSev}
              snackMsg={snackMsg}
              handleSnackClose={handleSnackClose}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
}

export default Arm;
