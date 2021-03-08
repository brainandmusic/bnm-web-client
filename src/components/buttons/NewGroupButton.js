import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupService from '../../services/Group';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: 350,
    maxWidth: "100%",
    margin: theme.spacing(0, 5),
    boxShadow: theme.shadows[5],
    // remove the blue border when modal is first opened
    "&:focus": {
      outline: "none",
    },
  },
  modalButton: {
    marginLeft: "auto"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  formcontrol: {
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(1),
  }
}));

function NewGroupButton({ studyId, handleCreated }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [groupDesc, setGroupDesc] = useState("");

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    if (e.target.value.trim()) {
      setGroupNameError(false);
    }
  }

  const handleGroupDescChange = (e) => {
    setGroupDesc(e.target.value);
  }

  const handleClickCreate = async () => {
    if (!groupName.trim()) {
      setGroupNameError(true);
    }
    else {
      handleModalClose();
      let res = await GroupService.createGroup({
        name: groupName,
        ...(groupDesc && { description: groupDesc }),
        creator: localStorage.getItem("uid"),
        studyId: studyId,
      });
      // pass result to cb function
      handleCreated && handleCreated(res);
    }
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
        New Group
    </Button>
      <Modal
        aria-labelledby="new group modal"
        aria-describedby="create a new group"
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
                Create New Group
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.content}>
                <form noValidate autoComplete="off" className={classes.form}>
                  <TextField
                    className={classes.formcontrol}
                    error={groupNameError}
                    helperText={groupNameError && "Group name is empty."}
                    required
                    variant="outlined"
                    label="Group Name"
                    fullWidth
                    autoFocus
                    value={groupName}
                    onChange={handleGroupNameChange} />
                  <TextField
                    className={classes.formcontrol}
                    variant="outlined"
                    label="Group Description"
                    fullWidth
                    value={groupDesc}
                    onChange={handleGroupDescChange} />
                </form>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleModalClose} className={classes.modalButton}>Cancel</Button>
              <Button size="small" variant="contained" color="secondary" className={classes.modalButton} onClick={handleClickCreate}>Create</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default NewGroupButton;
