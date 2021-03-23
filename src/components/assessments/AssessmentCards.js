/*
 * Load all assessments assigned to the participants with a given status
 */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AssessmentCard from './AssessmentCard';

import AssessmentService from '../../services/Assessment';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  toolbox: {
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
  filter: {
    margin: theme.spacing(1),
  },
  button: {
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "auto",
    },
  },
  formcontrol: {
    width: "100%",
  },
  experiments: {
    marginTop: theme.spacing(2)
  },
  experiment: {
    margin: theme.spacing(1),
  }
}))

function AssessmentCards({ uid }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [assessmentStatus, setAssessmentStatus] = useState("pending");

  const handleAssessmentStatusChange = (e) => setAssessmentStatus(e.target.value);

  useEffect(() => {
    // load assessment of the status
    async function loadAssessments(uid, status) {
      setLoading(true);
      // retrieve data from server
      let res = await AssessmentService.getAssessments(uid, status);
      if (res.status === "OK") {
        setAssessments(res.result);
      }
      else {
        setAssessments([]);
      }
      setLoading(false);
    }

    loadAssessments(uid, assessmentStatus);
  }, [uid, assessmentStatus])

  return loading ? (<div>loading ...</div>) : (
    <Grid container direction="column" className={classes.root}>
      <Grid item container className={classes.toolbox}>
        <Grid item xs={12} md={2} lg={1} className={classes.filter}>
          <FormControl className={classes.formcontrol}>
            <InputLabel id="user-experiment-status-select-label">Status</InputLabel>
            <Select
              labelId="user-assessment-status-select-label"
              id="user-assessment-status-select"
              value={assessmentStatus}
              onChange={handleAssessmentStatusChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container className={classes.experiments}>
        {
          assessments.map((assessment, index) => (
            <Grid item xs={12} md={6} lg={2} key={`assessment_card_id_${index}`} className={classes.experiment}>
              {/* <ExperimentCard role={role} {...experiment} /> */}
              <AssessmentCard {...assessment} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default AssessmentCards;
