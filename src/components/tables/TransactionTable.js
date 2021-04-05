import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
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

import GroupService from '../../services/Group';
import UserService from '../../services/User';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    overflow: "scroll",
  },
});

function GroupNames({ groupIds }) {
  const [groupNames, setGroupNames] = useState(["NA"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getGroupNames(groupIds) {
      await groupIds.forEach(async (groupId) => {
        let res = await GroupService.getGroup(groupId);
        if (res.status === "OK") {
          setGroupNames(old => [...old, res.result.name]);
        }
      });
      setLoading(false);
    }

    if (groupIds && groupIds.length > 0) {
      setLoading(true);
      setGroupNames([])
      getGroupNames(groupIds);
      setLoading(false);
    }
  }, [groupIds]);

  if (loading) {
    return (<div>Loading ...</div>)
  }
  return (<div>{groupNames.join(", ")}</div>);
}

function ParticipantNames({ participantIds }) {
  const [participantNames, setParticipantNames] = useState(["NA"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getParticipantNames(participantIds) {
      participantIds.forEach(async (participantId) => {
        let res = await UserService.getUser(participantId);
        if (res.status === "OK") {
          setParticipantNames(old => [...old, res.result.firstName + " " + res.result.lastName]);
        }
      });
    }

    if (participantIds && participantIds.length > 0) {
      setLoading(true);
      setParticipantNames([]);
      getParticipantNames(participantIds);
      setLoading(false);
    }
  }, [participantIds]);

  if (loading) {
    return (<div>Loading ...</div>)
  }
  return (<div>{participantNames.join(", ")}</div>);
}

function GroupTable({ transactions, delModP1, delModP2, handleDelete, snackOpen, handleSnackClose, snackSev, snackMsg }) {
  const classes = useStyles();
  const [delUid, setDelUid] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);

  const handleDelModalOpen = () => setDelModalOpen(true);
  const handleDelModalClose = () => setDelModalOpen(false);

  const handleClickDelete = (e) => {
    handleDelModalOpen();
    setDelUid(e.target.closest("button").getAttribute('transid'));
  }

  const handleProcessDelete = () => {
    handleDelModalClose();
    handleDelete && handleDelete(delUid);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Group Names</TableCell>
            <TableCell align="right">Individual Participant Names</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell component="th" scope="row">{transaction._id}</TableCell>
              <TableCell align="right">
                <GroupNames groupIds={transaction.groupIds} />
              </TableCell>
              <TableCell align="right">
                <ParticipantNames participantIds={transaction.participantIds} />
              </TableCell>
              <TableCell align="right">{new Date(transaction.creationDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleClickDelete} transid={transaction._id}>
                  <CancelIcon fontSize="small" />
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

export default GroupTable;
