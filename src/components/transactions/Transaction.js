import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteModal from '../modals/DeleteModal';
import Layout from '../layout/Layout';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import AssessmentService from '../../services/Assessment';
import ExperimentService from '../../services/Experiment';
import UserService from '../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  }
}))

function Record({ assessment, revokeCb }) {
  const [participant, setParticipant] = useState({});
  const [experiment, setExperiment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getParticipant(pid) {
      let res = await UserService.getUser(pid);
      if (res.status === "OK") {
        setParticipant(res.result);
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
      await getParticipant(assessment.participantId);
      await getExperiment(assessment.experimentId);
      setLoading(false);
    }

    if (!assessment) { return; }
    bootstrap();
  }, [assessment]);

  const handleRevokeClick = (e) => {
    revokeCb(e.target.closest("button").getAttribute('aid'));
  }
  return loading ? (<div>Loading ...</div>) : (
    <TableRow>
      <TableCell>
        {participant._id}
      </TableCell>
      <TableCell align="right">{participant.firstName + " " + participant.lastName}</TableCell>
      <TableCell align="right">{experiment.name}</TableCell>
      <TableCell align="right">{assessment.status}</TableCell>
      <TableCell align="right">{assessment.completeDate ? assessment.completeDate : ""}</TableCell>
      <TableCell align="right">
        {assessment.status === "complete" ? (<Button size="small">View</Button>) : null}
        {assessment.status === "complete" ? null : (
          <Button size="small" aid={assessment._id} onClick={handleRevokeClick}>Revoke</Button>
        )}
      </TableCell>
    </TableRow>
  )
}

function Transaction() {
  const { transId } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [delAssId, setDelAssId] = useState("");

  useEffect(() => {
    async function getAssessments(transId) {
      let res = await AssessmentService.getAssessmentsByTransid(transId);
      if (res.status === "OK") {
        setAssessments(res.result);
      }
    }

    setLoading(true);
    getAssessments(transId);
    setLoading(false);
  }, [transId]);

  const handleDelModalOpen = () => setDelModalOpen(true);
  const handleDelModalClose = () => setDelModalOpen(false);
  const handleProcessDelete = () => {
    setAssessments(old => old.filter(assessment => assessment._id !== delAssId));
    AssessmentService.deleteAssessment(delAssId);
    handleDelModalClose();
  };

  const handleRevokeButtonClick = (aid) => {
    setDelAssId(aid);
    handleDelModalOpen();
  }

  return loading ? (<div>Loading ...</div>) : (
    <Layout
      title={`Assignment - ${transId}`}
    >
      <Paper className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Assigned Participants
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Participant ID</TableCell>
                <TableCell align="right">Participant Name</TableCell>
                <TableCell align="right">Assigned Experiment</TableCell>
                <TableCell align="right">Assessment Status</TableCell>
                <TableCell align="right">Complete Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                assessments.map((assessment) => (
                  <Record
                    key={assessment._id}
                    assessment={assessment}
                    revokeCb={handleRevokeButtonClick} />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DeleteModal
        open={delModalOpen}
        p1={"Are you sure that you want to revoke this assessment?"}
        handleClose={handleDelModalClose}
        handleDelete={handleProcessDelete}
      />
    </Layout>
  );
}

export default Transaction;