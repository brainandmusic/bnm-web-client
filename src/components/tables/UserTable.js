import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import UserService from "../../services/User";
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

function UserTable({
  Ids = [],
  email = true,
  role = true,
  delModP1,
  delModP2,
  handleDelete,
  snackOpen,
  handleSnackClose,
  snackSev,
  snackMsg
}) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delUid, setDelUid] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);

  useEffect(() => {
    async function getUsers(Ids) {
      let usersRes = await Promise.all(
        Ids.map(async Id => {
          return await UserService.getUser(Id);
        })
      );
      usersRes.forEach(userRes => {
        if (userRes.status === "OK") {
          setRows(old => [...old, userRes.result]);
        }
      });
    }
    setRows([]);
    if (Ids.length > 0) {
      setLoading(true);
      getUsers(Ids);
      setLoading(false);
    }
  }, [Ids]);

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

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {email && <TableCell>Email</TableCell>}
            {role && <TableCell>Role</TableCell>}
            <TableCell>ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row._id}>
              <TableCell>
                {row.firstName} {row.lastName}
              </TableCell>
              {email && <TableCell>{row.email}</TableCell>}
              {role && <TableCell>{row.role}</TableCell>}
              <TableCell>
                <Tooltip title="Copy to clipboard">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(row._id);
                    }}
                  >
                    {row._id}
                  </Button>
                </Tooltip>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={handleClickDelete}
                  userid={row._id}
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

export default UserTable;
