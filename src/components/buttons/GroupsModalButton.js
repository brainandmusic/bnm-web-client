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
import GroupService from '../../services/Group';

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 200 },
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

function GroupsModalButton({ studyId, buttonLabel, modalTitle, submitBtnLabel, onSubmit }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [rows, setRows] = useState([]); // data rows for displaying
  const [keyword, setKeyword] = useState("");
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  useEffect(() => {
    async function loadGroups(studyId) {
      let res = await GroupService.getGroups(studyId);
      if (res.status === "OK") {
        res.result = res.result.map(group => {
          group.id = group._id; // data grid requires id field
          return group;
        });

        setGroups(res.result);
        setRows(res.result); // default display all admins
      }
    }

    setGroups([]);
    setRows([]);
    if (studyId) {
      loadGroups(studyId);
    }
  }, [studyId]);

  useEffect(() => {
    var re = new RegExp(keyword, "i");
    setRows(groups.filter(group => group._id.match(re) ||
      group.name.match(re) ||
      group.description.match(re)
    ));
    setSelectedGroupIds([]);
  }, [keyword, groups]);

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
    setSelectedGroupIds(param.selectionModel);
  }

  const handleSubmit = () => {
    handleModalClose();
    onSubmit(selectedGroupIds);
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
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={handleSelectedUserChange} />
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

export default GroupsModalButton;
