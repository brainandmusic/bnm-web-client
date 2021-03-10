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
import StudyService from '../../services/Study';

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

function NewEventButton({ studyId, armId, handleCreated }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventNameError, setEventNameError] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
    if (e.target.value.trim()) {
      setEventNameError(false);
    }
  }

  const handleClickCreate = async () => {
    if (!eventName.trim()) {
      setEventNameError(true);
    }
    else {
      handleModalClose();
      let res = await StudyService.createEvent(studyId, armId, {
        name: eventName,
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
        New Event
    </Button>
      <Modal
        aria-labelledby="new event modal"
        aria-describedby="create a new event"
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
                Create New Event
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.content}>
                <form noValidate autoComplete="off" className={classes.form}>
                  <TextField
                    className={classes.formcontrol}
                    error={eventNameError}
                    helperText={eventNameError && "Event name is empty."}
                    required
                    variant="outlined"
                    label="Event Name"
                    fullWidth
                    autoFocus
                    value={eventName}
                    onChange={handleEventNameChange} />
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

export default NewEventButton;
