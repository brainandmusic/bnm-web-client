import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: "100%",
  },
});

function ExperimentTable({ studyId, experiments }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Experiment ID</TableCell>
            <TableCell>Experiment Name</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experiments.map((experiment) => (
            <TableRow key={experiment._id}>
              <TableCell component="th" scope="row">
                <Link href={`/studies/study/${studyId}/experiment/${experiment._id}`}>
                  {experiment._id}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/studies/study/${studyId}/experiment/${experiment._id}`}>
                  {experiment.name}
                </Link>
              </TableCell>
              <TableCell align="right">
                <IconButton color="secondary" aria-label="remove experiment" experimentid={experiment._id}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExperimentTable;
