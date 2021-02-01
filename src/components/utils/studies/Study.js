import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import MemberTable from './MemberTable';
import NewMemberButton from './NewMemberButton';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import StudyService from '../../../services/Study';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
    width: "100%",
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  memberbutton: {
    marginBottom: theme.spacing(2),
  },
  membertab: {
    display: "flex",
    flexDirection: "column",
  },
  membertable: {
    maxWidth: "100%",
  }
}))

function Study() {
  const { studyId } = useParams();
  const classes = useStyles();
  const [indexValue, setIndexValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setLoading(true);
    StudyService.getStudies({ _id: studyId }, {}).then(res => res.data).then(res => {
      if (res.status === "OK") {
        setStudy(res.result[0]);
        setMembers(res.result[0].members);
        setLoading(false);
      }
    })
  }, [studyId]);


  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  const handleAddMembers = (newMembers) => {
    const filter = { _id: study._id };
    const update = { $addToSet: { members: { $each: newMembers } } };
    StudyService.updateStudy(filter, update).then(res => res.data).then(res => {
      if (res.status === "OK") {
        setMembers(old => [...old, ...newMembers]);
      }
    })
  }

  const handleRemoveMember = (e) => {
    // talk to server
    // update local array
    // alert(JSON.stringify(e.target));
    if (e.target.tagName === "path") { // svg button
      const memberId = e.target.closest("button").attributes.memberid.value;
      const filter = { _id: study._id };
      const update = { $pull: { members: { _id: memberId } } };
      StudyService.updateStudy(filter, update).then(res => res.data).then(res => {
        if (res.status === "OK") {
          setMembers(old => {
            return old.filter(member => member._id != memberId);
          });
        }
      })
    }

  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
      <Paper className={classes.root}>
        <Typography component="h5" variant="h5" gutterBottom>
          Study ID
        </Typography>
        <Typography component="p" variant="subtitle1" gutterBottom>
          {study._id}
        </Typography>
        <Typography component="h5" variant="h5" gutterBottom>
          Name
        </Typography>
        <Typography component="p" variant="subtitle1" gutterBottom>
          {study.name}
        </Typography>
        {/* <Divider className={classes.divider} /> */}
        <Typography component="h5" variant="h5" gutterBottom>
          Description
        </Typography>
        <Typography component="p" variant="subtitle1" gutterBottom>
          {study.description}
        </Typography>
        <Typography component="h5" variant="h5" gutterBottom>
          Status
        </Typography>
        <Typography component="p" variant="subtitle1" gutterBottom>
          {study.status}
        </Typography>
        <Divider className={classes.divider} />
        <Tabs
          value={indexValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="study tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Team Members" {...a11yProps(0)} />
          <Tab label="Experiments" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={indexValue} index={0}>
          <div className={classes.membertab}>
            <div className={classes.memberbutton}>
              <NewMemberButton onAddMembers={handleAddMembers} />
            </div>
            <div className={classes.membertable} onClick={handleRemoveMember}>
              <MemberTable members={members} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={indexValue} index={1}>
          In addition, admin can add/ remove experiments from the study.
          So there should be two tabs.
          Note: this won't affect the existence of the experiments themselves.
        </TabPanel>
        <div>
        </div>
      </Paper>
    );
}

export default Study;
