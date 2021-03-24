import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { makeStudyTreeJSON } from '../utils/experiments/builders/labjs/logic/io/assemble/script';
import ExperimentService from '../../services/Experiment';
import AssessmentService from '../../services/Assessment';

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  logbox: {
    textAlign: 'left',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  logitem: {
    marginBottom: theme.spacing(1)
  }
}))

function Assessment() {
  const classes = useStyles();
  const { assessmentId, experimentId } = useParams();
  const [experiment, setExperiment] = useState({});
  const [expDataLoaded, setExpDataLoaded] = useState(false);
  const [expPageOpen, setExpPageOpen] = useState(false);
  const [expRespSaved, setExpRespSaved] = useState(false);

  const handleLocalStorageChange = async (e) => {
    if (e.key === "expStatus" && e.newValue === "complete") {
      let res = await AssessmentService.updateAssessment(assessmentId, {
        status: "complete",
        answer: JSON.parse(localStorage.getItem("answer")),
        completeDate: Date.now()
      });
      if (res.status === "OK") {
        setExpRespSaved(true);
      }
    }
  }

  const jsonToStringWithFunc = (obj) => {
    return JSON.stringify(obj, function (key, value) {
      if (typeof value === "function") {
        return "/Function(" + value.toString() + ")/";
      }
      return value;
    });
  }

  useEffect(() => {
    function clearExpData() {
      localStorage.removeItem("questions");
      localStorage.removeItem("answer");
      localStorage.removeItem("expStatus");
    }
    async function loadExperiment(eid) {
      setExpDataLoaded(false);
      let res = await ExperimentService.getExperiment(eid);
      if (res.status === "OK") {
        let studyTree = makeStudyTreeJSON(JSON.parse(res.result.data));
        localStorage.setItem("questions", jsonToStringWithFunc(studyTree));
        setExperiment(res.result);
      }
      setExpDataLoaded(true);
    }

    clearExpData();
    loadExperiment(experimentId);
    let hdlr = window.addEventListener('storage', handleLocalStorageChange)
    return () => { window.removeEventListener(hdlr); }
  }, [experimentId]);

  useEffect(() => {
    if (expDataLoaded && experiment) {
      let win = window.open(`/experiments/runner/${experiment.platform.toLowerCase().replace(/\./g, "")}/`, "_blank")
      if (win) {
        setExpPageOpen(true);
      }
    }
  }, [expDataLoaded, experiment])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ backgroundColor: '#cfe8fc', height: '100vh', textAlign: 'center' }}>
        <Typography className={classes.heading} variant="h3">
          PLEASE KEEP THIS PAGE OPEN WHILE EXPERIMENT IS RUNNING!
        </Typography>
        <div className={classes.logbox}>
          <Typography className={classes.logitem} variant="h5">Load experiment data ... {expDataLoaded ? `✅` : ``}</Typography>
          <Typography className={classes.logitem} variant="h5">Open experiment page ... {expPageOpen ? `✅` : ``}</Typography>
          <Typography className={classes.logitem} variant="h5">Save response to server ... {expRespSaved ? `✅` : ``}</Typography>
        </div>
        {expRespSaved && <Typography className={classes.heading} variant="h4">
          Thank you for participating, your response has been saved in our database securely. You may close this page now.
        </Typography>}
      </Container>
    </React.Fragment>
  )
}

export default Assessment;
