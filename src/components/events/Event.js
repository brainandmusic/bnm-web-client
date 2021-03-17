import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import Box from '@material-ui/core/Box';
import ExperimentsModalButton from '../buttons/ExperimentsModalButton';
import ExperimentTable from '../tables/ExperimentTable';
import Grid from '@material-ui/core/Grid';
import Layout from '../layout/Layout';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TransactionTable from '../tables/TransactionTable';
import UsersModalButton from '../buttons/UsersModalButton';
import GroupsModalButton from '../buttons/GroupsModalButton';

import StudyService from '../../services/Study';
import TransactionService from '../../services/Transaction';
import UserService from '../../services/User';

// get role to determine if user can access this page
// get experiments of this event
// add experiments to this event
// remove experiments from this event
// assign experiments of current event to individual/group members
// revoke assignments

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
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
  const [transactions, setTransactions] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

    async function getTransactions(eid) {
      let res = await TransactionService.getTransactions(eid);
      if (res.status === "OK") {
        setTransactions(res.result);
      }
    }

    if (role === "admin" || role === "ra") {
      setLoading(true);
      getStudyAndEvent(studyId, armId, eventId);
      getTransactions(eventId);
      setLoading(false);
    }
  }, [role, studyId, armId, eventId]);

  const handleAddExperimentsToEvent = async (expIds) => {
    let res = await StudyService.addExperimentsToEvent(studyId, armId, eventId, expIds);
    if (res.status === "OK") {
      // update local list
      setEvent(old => {
        old.experiments = [...new Set([...old.experiments, ...expIds])]
        return old;
      });
      setSnackSev("success");
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleAssignIndividualsToEvent = async (participantIds) => {
    let res = await TransactionService.createTransaction({
      studyId,
      armId,
      eventId,
      creator: localStorage.getItem("uid"),
      participantIds
    });
    if (res.status === "OK") {
      setTransactions(old => [res.result, ...old]);
      setSnackSev("success");
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleAssignGroupsToEvent = async (groupIds) => {
    let res = await TransactionService.createTransaction({
      studyId,
      armId,
      eventId,
      creator: localStorage.getItem("uid"),
      groupIds
    });
    if (res.status === "OK") {
      setTransactions(old => [res.result, ...old]);
      setSnackSev("success");
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleRevokeTransaction = async (transId) => {
    let res = await TransactionService.deleteTransaction(transId);
    if (res.status === "OK") {
      //update local list
      setTransactions(old => old.filter(trans => trans._id !== transId));
      setSnackSev("success");
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
      title={`Event - ${event.name}`}
    >
      <Paper className={classes.root}>
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="study tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Experiments" {...a11yProps(0)} />
          <Tab label="Assignments" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Grid container direction="column">
            <Grid item xs={12} md="auto" className={classes.button}>
              <ExperimentsModalButton
                buttonLabel="Add Experiments"
                modalTitle="Select Experiments"
                submitBtnLabel="Add"
                onSubmit={handleAddExperimentsToEvent}
              />
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
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container direction="column">
            <Grid item container>
              <Grid item xs={12} md="auto" className={classes.button}>
                {/* assign participants */}
                <UsersModalButton
                  Ids={study.participants}
                  buttonLabel="Assign Participants"
                  modalTitle="Assign Participants"
                  submitBtnLabel="Assign"
                  onSubmit={handleAssignIndividualsToEvent}
                />
              </Grid>
              <Grid item xs={12} md="auto" className={classes.button}>
                <GroupsModalButton
                  studyId={studyId}
                  buttonLabel="Assign Groups"
                  modalTitle="Assign Groups"
                  submitBtnLabel="Assign"
                  onSubmit={handleAssignGroupsToEvent}
                />
              </Grid>
            </Grid>
            <Grid item container direction="column">
              {/* transaction history table */}
              <TransactionTable
                transactions={transactions}
                delModP1="Are you sure that you want to revoke this assignment?"
                handleDelete={handleRevokeTransaction}
                snackOpen={snackOpen}
                snackSev={snackSev}
                snackMsg={snackMsg}
                handleSnackClose={handleSnackClose}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Layout>
  )
}

export default Event;
