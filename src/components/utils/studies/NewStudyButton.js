import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import StudyService from '../../../services/Study';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
  }
}));

function NewStudyButton({ onCreateCallback }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [studyName, setStudyName] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [studyStat, setStudyStat] = useState("private");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // reset each field
    setStudyName("");
    setStudyDesc("");
    setStudyStat("private");
    // close window
    setOpen(false);
  };

  const handleCreateStudy = () => {
    StudyService.createStudy({ name: studyName, description: studyDesc, status: studyStat }).then(res => res.data).then(res => {
      onCreateCallback(res.status, res.result, res.message);
      handleClose();
    });
  }

  const handleStudyNameChange = (e) => {
    setStudyName(e.target.value);
  }

  const handleStudyDescChange = (e) => {
    setStudyDesc(e.target.value);
  }

  const handleStudyStatChange = (e) => {
    if (e.target.checked) {
      setStudyStat("public");
    }
    else {
      setStudyStat("private");
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
        onClick={handleOpen}
      >
        New Study
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.paper} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                Create a Study
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.platforms}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="form-new-study-name"
                    label="Name"
                    multiline
                    rowsMax={2}
                    placeholder="Study Name"
                    variant="outlined"
                    autoFocus
                    required
                    value={studyName}
                    onChange={handleStudyNameChange}
                  />
                  <TextField
                    id="form-new-study-description"
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="This study is ..."
                    variant="outlined"
                    value={studyDesc}
                    onChange={handleStudyDescChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="public" color="primary" onChange={handleStudyStatChange} />}
                    label="Public"
                  />
                </form>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={handleClose} className={classes.cancel}>Cancel</Button>
              <Button size="small" color="primary" onClick={handleCreateStudy}>Create</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default NewStudyButton;
