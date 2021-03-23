import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DelExpModal from './DelExpModal';
import ExperimentCard from './ExperimentCard';
import ExperimentService from '../../services/Experiment';
import NewButton from './NewButton';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  toolbox: {
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
  filter: {
    margin: theme.spacing(1),
  },
  button: {
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "auto",
    },
  },
  formcontrol: {
    width: "100%",
  },
  experiments: {
    marginTop: theme.spacing(2)
  },
  experiment: {
    margin: theme.spacing(1),
  }
}))

function ExperimentCards({ role }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [experiments, setExperiments] = useState([]);
  const [delExpId, setDelExpId] = useState("");
  const [delExpOpen, setDelExpOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleDelExpOpen = () => setDelExpOpen(true);
  const handleDelExpClose = () => setDelExpOpen(false);
  const handleDelExpConfirm = async () => {
    handleDelExpClose();
    try {
      let res = await ExperimentService.deleteExperiment(delExpId);
      if (res.status === "OK") {
        setExperiments(old => {
          return old.filter(oldExp =>
            oldExp._id !== delExpId
          )
        });
        setSeverity("info");
      }
      else {
        setSeverity("warning");
      }
      setSnackMsg(res.message);
    } catch (e) {
      setSeverity("error");
      setSnackMsg("Server Error: please try again later.");
    } finally {
      setSnackOpen(true);
    }
  }

  const handleSnackClose = () => setSnackOpen(false);

  const handleCardClick = (e) => {
    if (e.target.innerText === "Delete") {
      setDelExpId(e.target.attributes.experimentid.value);
      handleDelExpOpen()
    }
  }

  useEffect(() => {
    const loadExperiments = async () => {
      // get all experiments
      let res = await ExperimentService.getExperiments(1);
      if (res.status === "OK") {
        setExperiments(res.result);
      }
      setLoading(false);
    }

    if (role !== "participant") {
      loadExperiments();
    }
  }, [role]);

  return loading ? (<div>loading ...</div>) : (
    <Grid container direction="column" className={classes.root}>
      <Grid item xs={12} md="auto" className={classes.filter}>
        <NewButton />
      </Grid>
      <Grid item container className={classes.experiments} onClick={handleCardClick}>
        {
          experiments.map((experiment, index) => (
            <Grid item xs={12} md={6} lg={2} key={`experiment_card_id_${index}`} className={classes.experiment}>
              <ExperimentCard role={role} {...experiment} />
            </Grid>
          ))
        }
      </Grid>
      <DelExpModal
        open={delExpOpen}
        handleClose={handleDelExpClose}
        handleDelete={handleDelExpConfirm}
      />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={severity}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default ExperimentCards;
