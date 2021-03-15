import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import ExperimentTable from '../tables/ExperimentTable';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Layout from '../layout/Layout';
import StudyService from '../../services/Study';
import UserService from '../../services/User';

// get role to determine if user can access this page
// get experiments of this event
// add experiments to this event
// remove experiments from this event
// assign experiments of current event to individual/group members
// revoke assignments

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

function Event() {
  const { studyId, armId, eventId } = useParams();
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState({});
  const [event, setEvent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");

  const handleSnackClose = () => setSnackOpen(false);

  const handleRemoveExperiment = async (expId) => {
    let res = await StudyService.deleteExperiments(studyId, armId, eventId, [expId]);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove experiment from local display list
      setEvent(old => {
        old.experiments = old.experiments.filter(id => id !== expId);
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

  // get event from server
  useEffect(() => {
    async function getStudyAndEvent(sid, aid, eid) {
      let res = await StudyService.getStudy(sid);
      if (res.status === "OK") {
        setStudy(res.result)
        const arm = res.result.arms.filter(arm => arm._id === aid)[0];
        setEvent(arm.events.filter(event => event._id === eid)[0]);
      }
    }

    if (role === "admin" || role === "ra") {
      setLoading(true);
      getStudyAndEvent(studyId, armId, eventId);
      setLoading(false);
    }
  }, [role, studyId, armId, eventId]);

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
      title={`Event - ${event.name}`}
    >
      <Paper className={classes.root}>
        <Grid container direction="column">
          <Grid item xs={12} md="auto">
            {/* add experiment */}
            {/* assign participants */}
          </Grid>
          <Grid item container direction="column">
            <ExperimentTable
              expIds={event.experiments}
              delModP1="Are you sure that you want to remove this experiment?"
              handleDelete={handleRemoveExperiment}
              snackOpen={snackOpen}
              snackSev={snackSev}
              snackMsg={snackMsg}
              handleSnackClose={handleSnackClose}
            />
            {/* show experiments */}
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  )
}

export default Event;
