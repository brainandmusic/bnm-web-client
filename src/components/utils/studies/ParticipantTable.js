import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
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

function ParticipantTable({ participants }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Participant ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Assign Date</TableCell>
            <TableCell>Complete Date</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={`${participant._id}_${participant.assignDate}`}>
              <TableCell component="th" scope="row">
                {participant._id}
              </TableCell>
              <TableCell>{participant.firstName}</TableCell>
              <TableCell>{participant.lastName}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.assignDate}</TableCell>
              <TableCell>{participant.completeDate}</TableCell>
              <TableCell align="right">
                <IconButton color="secondary" aria-label="remove assigment" participantid={participant._id}>
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

export default ParticipantTable;
