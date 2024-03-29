import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteModal from "../modals/DeleteModal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    overflow: "scroll"
  }
});

function EventTable({
  studyId,
  armId,
  events,
  delModP1,
  delModP2,
  handleDelete,
  snackOpen,
  handleSnackClose,
  snackSev,
  snackMsg
}) {
  const classes = useStyles();
  const [delUid, setDelUid] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);

  const handleDelModalOpen = () => setDelModalOpen(true);
  const handleDelModalClose = () => setDelModalOpen(false);

  const handleClickDelete = e => {
    handleDelModalOpen();
    setDelUid(e.target.closest("button").getAttribute("eventid"));
  };

  const handleProcessDelete = () => {
    handleDelModalClose();
    handleDelete && handleDelete(delUid);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="event table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell component="th" scope="row">
                <Link
                  href={`/studies/study/${studyId}/arm/${armId}/event/${event._id}`}
                  color="inherit"
                  underline="none"
                >
                  {event._id}
                </Link>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  size="small"
                  onClick={handleClickDelete}
                  eventid={event._id}
                >
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snackSev}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}

export default EventTable;
