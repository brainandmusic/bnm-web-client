import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Layout from '../layout/Layout';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssessmentService from '../../services/Assessment';
import ExperimentService from '../../services/Experiment';
import ScoreService from '../../services/Score';
import StudyService from '../../services/Study';
import UserService from '../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2),
  }
}))

function Report() {
  const { aid } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState({});
  const [study, setStudy] = useState({});
  const [participant, setParticipant] = useState({});
  const [experiment, setExperiment] = useState({});
  const [score, setScore] = useState("NA");

  useEffect(() => {
    async function getAssessment(aid) {
      let res = await AssessmentService.getAssessment(aid);
      if (res.status === "OK") {
        setAssessment(res.result);
        return res.result;
      }
      return {};
    }

    async function getParticipant(uid) {
      let res = await UserService.getUser(uid);
      if (res.status === "OK") {
        setParticipant(res.result);
      }
    }

    async function getStudy(sid) {
      let res = await StudyService.getStudy(sid);
      if (res.status === "OK") {
        setStudy(res.result);
      }
    }

    async function getExperiment(eid) {
      let res = await ExperimentService.getExperiment(eid, 1);
      if (res.status === "OK") {
        setExperiment(res.result);
      }
    }

    async function bootstrap() {
      setLoading(true);
      let { participantId, studyId, experimentId, answer } = await getAssessment(aid);
      await getParticipant(participantId);
      await getStudy(studyId);
      await getExperiment(experimentId);
      setScore(ScoreService.getScore(experimentId, answer));
      setLoading(false);
    }

    if (!aid) { return; }
    bootstrap();
  }, [aid]);

  return loading ? (<div>Loading ...</div>) : (
    <Layout
      title={`Assessment Report`}
    >
      <Paper className={classes.root}>
        <Typography variant="h4">
          Assessment Information
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1">
          <b>Study Name: </b>
          {study.name}
        </Typography>
        <Typography variant="body1">
          <b>Arm Name: </b>
          {study.arms.filter(arm => arm._id === assessment.armId)[0].name}
        </Typography>
        <Typography variant="body1">
          <b>Event Name: </b>
          {study.arms.filter(arm => arm._id === assessment.armId)[0].events.filter(event => event._id === assessment.eventId)[0].name}
        </Typography>
        <Typography variant="body1">
          <b>Experiment Name: </b>
          {experiment.name}
        </Typography>
        <Typography variant="h4">
          Participant Information
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1">
          <b>ID: </b>
          {participant._id}
        </Typography>
        <Typography variant="body1">
          <b>Name: </b>
          {participant.firstName + " " + participant.lastName}
        </Typography>
        <Typography variant="body1">
          <b>E-mail: </b>
          {participant.email}
        </Typography>
        <Typography variant="h4">
          Participant Response
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1">
          <pre>
            {JSON.stringify(assessment.answer, null, 2)}
          </pre>
        </Typography>
        <Typography variant="h4">
          Score
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body1">
          {score}
        </Typography>
      </Paper>

    </Layout>
  )
}

export default Report;
