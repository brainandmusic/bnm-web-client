import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import Layout from '../layout/Layout';
import ArmManager from './ArmManager';
import GroupManager from './GroupManager';
import ParticipantManager from './ParticipantManager';
import TeamMemberManager from './TeamMemberManager';
import StudyService from '../../services/Study';
import UserService from '../../services/User';

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
  }
}))

function Study() {
  const { studyId } = useParams();
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState({});
  const [value, setValue] = useState(0);

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

  // get study from server
  useEffect(() => {
    async function getStudy(sid) {
      let res = await StudyService.getStudy(sid);
      if (res.status === "OK") {
        setStudy(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getStudy(studyId);
    }
  }, [role, studyId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Layout title="Loading ...">
        <div>Loading ...</div>
      </Layout>
    );
  }
  else if (role === "participant" ||
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
      title={`Study - ${study.name}`}
    >
      <Paper className={classes.root}>
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Study Title
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          {study.name}
        </Typography>
        <Divider className={classes.divider} />
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Study ID
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          {study._id}
        </Typography>
        <Divider className={classes.divider} />
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Study Description
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          {study.description || "N/A"}
        </Typography>
        <Divider className={classes.divider} />
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="study tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Team Members" {...a11yProps(0)} />
          <Tab label="Participants" {...a11yProps(1)} />
          <Tab label="Groups" {...a11yProps(2)} />
          <Tab label="Arms" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TeamMemberManager studyId={study._id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ParticipantManager studyId={study._id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GroupManager studyId={study._id} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ArmManager studyId={study._id} />
        </TabPanel>
      </Paper>
    </Layout>
  );
}

export default Study;
