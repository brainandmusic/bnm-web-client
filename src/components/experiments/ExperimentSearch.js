import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DelExpModal from './DelExpModal';
import ExperimentCard from './ExperimentCard';
import ExperimentService from '../../services/Experiment';
import NewButton from './NewButton';
import UserService from '../../services/User';

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

function ExperimentSearch() {
  const classes = useStyles();
  const history = useHistory();
  const [role, setRole] = useState("participant");
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);


  const [delExpId, setDelExpId] = useState("");
  const [delExpOpen, setDelExpOpen] = useState(false);

  const handleDelExpOpen = () => setDelExpOpen(true);
  const handleDelExpClose = () => setDelExpOpen(false);
  const handleDelExpConfirm = async () => {
    handleDelExpClose();
    let res = await ExperimentService.deleteExperiment(delExpId);
    res = res.data;
    // TODO: add snackbar to show the delete result using res
    if (res.status === "OK") {
      setExperiments(old => {
        return old.filter(oldExp =>
          oldExp._id !== delExpId
        )
      });
    }
  }

  const loadAdminExperiments = async () => {
    let res = await ExperimentService.getExperiments();
    if (res.status === "OK") {
      setExperiments(res.result);
    }
    setLoading(false);
  }

  const loadParticipantExperiments = async () => {
    // TODO: load from server
    setLoading(false);
  }

  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status !== "OK") {
        // clean up local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("uid");
        history.go(0);
      }
      setRole(res.result.role);
      return res.result.role;
    }

    async function getExperimentList() {
      const roleFromDb = await getRole();
      roleFromDb === "admin" && loadAdminExperiments();
      roleFromDb === "participant" && loadParticipantExperiments();
    }

    getExperimentList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCardClick = (e) => {
    if (e.target.innerText === "Delete") {
      setDelExpId(e.target.attributes.experimentid.value);
      handleDelExpOpen()
    }
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
      <Grid container direction="column" className={classes.root}>
        <Grid item container className={classes.toolbox}>
          {
            role === "participant" ? (
              <Grid item xs={12} md={2} lg={1} className={classes.filter}>
                <FormControl className={classes.formcontrol}>
                  <InputLabel id="user-experiment-status-select-label">Status</InputLabel>
                  <Select
                    labelId="user-experiment-status-select-label"
                    id="user-experiment-status-select"
                    value="Pending"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Complete">Complete</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : null
          }
          {
            role !== "participant" ? (
              <Grid item xs={12} md={2} lg={1} className={classes.filter}>
                <FormControl className={classes.formcontrol}>
                  <InputLabel id="user-experiment-platform-select-label">Platform</InputLabel>
                  <Select
                    labelId="user-experiment-platform-select-label"
                    id="user-experiment-platform-select"
                  >
                    <MenuItem value="jspsych">jsPsych</MenuItem>
                    <MenuItem value="labjs">Lab.js</MenuItem>
                    <MenuItem value="psychopy">PsychoPy</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : null
          }
          {
            role !== "participant" ? (
              <Grid item xs={12} md="auto" className={classes.filter}>
                <NewButton />
              </Grid>
            ) : null
          }
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
          handleDelete={handleDelExpConfirm} />
      </Grid>
    );
}

export default ExperimentSearch;
