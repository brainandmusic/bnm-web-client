import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteModal from '../modals/DeleteModal';
import ExperimentService from '../../services/Experiment';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    overflow: "scroll",
  },
});

function ExperimentTable({ expIds = [], delModP1, delModP2, handleDelete, snackOpen, handleSnackClose, snackSev, snackMsg }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [experiments, setExperiments] = useState([]);
  const [delUid, setDelUid] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);

  const handleDelModalOpen = () => setDelModalOpen(true);
  const handleDelModalClose = () => setDelModalOpen(false);

  const handleClickDelete = (e) => {
    handleDelModalOpen();
    setDelUid(e.target.closest("button").getAttribute('expid'));
  }

  const handleProcessDelete = () => {
    handleDelModalClose();
    handleDelete && handleDelete(delUid);
  }

  useEffect(() => {
    async function loadExperiments(expIds) {
      let results = await Promise.all(expIds.map(async (expId) => {
        return await ExperimentService.getExperiment(expId, 1);
      }));
      results.forEach(result => {
        if (result.status === "OK") {
          setExperiments(old => [...old, result.result]);
        }
      });
    }
    setExperiments([]);
    loadExperiments(expIds);
    setLoading(false);
  }, [expIds])

  if (loading) {
    return (<div>Loading ...</div>)
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="event table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Experiment Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experiments.map((experiment) => (
            <TableRow key={experiment._id}>
              <TableCell component="th" scope="row">
                <Link href={`/experiments/builder/platform/${experiment.platform.toLowerCase().replaceAll(".", "")}/experiment/${experiment._id}`} color="inherit" underline="none">
                  {experiment._id}
                </Link>
              </TableCell>
              <TableCell align="right">{experiment.name}</TableCell>
              <TableCell align="right">{experiment.description || "N/A"}</TableCell>
              <TableCell align="right">{experiment.platform}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleClickDelete} expid={experiment._id}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteModal
        open={delModalOpen}
        p1={delModP1}
        p2={delModP2}
        handleClose={handleDelModalClose}
        handleDelete={handleProcessDelete}
      />
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={snackSev}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}

export default ExperimentTable;
