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
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    overflow: "scroll"
  }
});

function GroupTable({
  studyId,
  groups,
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
    setDelUid(e.target.closest("button").getAttribute("userid"));
  };

  const handleProcessDelete = () => {
    handleDelModalClose();
    handleDelete && handleDelete(delUid);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell>Group Description</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map(group => (
            <TableRow key={group._id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.description || "NA"}</TableCell>
              <TableCell>
                {new Date(group.creationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link
                  href={`/studies/study/${studyId}/group/${group._id}`}
                  color="inherit"
                  underline="none"
                >
                  {group._id}
                </Link>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={handleClickDelete}
                  userid={group._id}
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

export default GroupTable;
