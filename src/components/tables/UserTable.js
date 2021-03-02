import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
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
import UserService from '../../services/User';
import DeleteModal from '../modals/DeleteModal';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    overflow: "scroll",
  },
});

function UserTable({ Ids, email = true, role = true, delModP1, delModP2, handleDelete, snackOpen, handleSnackClose, snackSev, snackMsg }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delUid, setDelUid] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);

  useEffect(() => {
    async function getUsers(Ids) {
      let usersRes = await Promise.all(Ids.map(async (Id) => {
        return await UserService.getUser(Id);
      }));
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

  const handleClickDelete = (e) => {
    handleDelModalOpen();
    setDelUid(e.target.closest("button").getAttribute('userid'));
  }

  const handleProcessDelete = () => {
    handleDelModalClose();
    handleDelete && handleDelete(delUid);
  }

  if (loading) {
    return (<div>Loading ...</div>);
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            {email && <TableCell align="right">Email</TableCell>}
            {role && <TableCell align="right">Role</TableCell>}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              {email && <TableCell align="right">{row.email}</TableCell>}
              {role && <TableCell align="right">{row.role}</TableCell>}
              <TableCell align="right">
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleClickDelete} userid={row._id}>
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

export default UserTable;
