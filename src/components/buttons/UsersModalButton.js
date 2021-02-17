import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid } from '@material-ui/data-grid';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import UserService from '../../services/User';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 160 },
];

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& .MuiFormControl-root": {
      marginTop: theme.spacing(2),
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(0, 1),
    boxShadow: theme.shadows[5],
    width: "100%",
    // remove the blue border when modal is first opened
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
  cancel: {
    marginLeft: "auto"
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  platforms: {
    marginTop: theme.spacing(1),
  },
  platform: {
    justifyContent: "flex-start",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    }
  },
  usertable: {
    height: 400,
    width: "100%",
    marginTop: theme.spacing(1),
  }
}));

function UsersModalButton({ buttonLabel, modalTitle, roles, submitBtnLabel, onSubmit }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]); // data rows for displaying
  const [keyword, setKeyword] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    async function loadUsers(roles = ["participant", "ra", "admin"]) {
      let res = await UserService.getUsers();
      if (res.status === "OK") {
        res.result = res.result.filter(user => roles.includes(user.role)).map(u => {
          u.id = u._id; // data grid requires id field
          return u;
        });

        setUsers(res.result);
        setRows(res.result); // default display all admins
      }
    }

    loadUsers(roles);
  }, [roles]);

  useEffect(() => {
    var re = new RegExp(keyword, "i");
    setRows(users.filter(user => user._id.match(re) ||
      user.firstName.match(re) ||
      user.lastName.match(re) ||
      user.email.match(re)
    ));
    setSelectedUserIds([]);
  }, [keyword, users]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSelectedUserChange = (param) => {
    setSelectedUserIds(param.rowIds);
  }

  const handleRowSelected = (param) => {
    if (param.isSelected) {
      setSelectedUserIds(old => {
        if (!old.includes(param.data._id)) {
          old.push(param.data._id);
        }
        return old;
      })
    }
    else {
      setSelectedUserIds(old => {
        return old.filter(o => o !== param.data._id);
      })
    }
  }

  const handleSubmit = () => {
    const newMembers = users.filter(user => selectedUserIds.includes(user._id));
    handleModalClose();
    onSubmit(newMembers);
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleModalOpen}
      >
        {buttonLabel}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Card className={classes.paper} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                {modalTitle}
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.platforms}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-secondary"
                    variant="outlined"
                    color="primary"
                    placeholder="Search for user ID, name, email ..."
                    value={keyword}
                    onChange={handleKeywordChange}
                    autoFocus
                  />
                  <div className={classes.usertable}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionChange={handleSelectedUserChange} onRowSelected={handleRowSelected} />
                  </div>
                </form>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={handleModalClose} className={classes.cancel}>Cancel</Button>
              <Button size="small" color="primary" onClick={handleSubmit}>{submitBtnLabel}</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default UsersModalButton;
