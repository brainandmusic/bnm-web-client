import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ExperimentCard from './ExperimentCard';
import ExperimentService from '../../../services/Experiment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NewButton from './NewButton';
import Select from '@material-ui/core/Select';
import UserService from '../../../services/User';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAdminExperiments = async () => {
    let res = await ExperimentService.getExperiments();
    res = res.data;
    if (res.status === "OK") {
      setExperiments(res.result);
    }
    setLoading(false);
  }

  useEffect(() => {
    UserService.isAdmin().then(res => res.data).then(res => {
      if (res.status === "INVALID_REQUEST" && res.message === "JWT token is not valid.") {
        localStorage.removeItem("token");
        history.push("/");
      }
      else if (res.status === "OK") {
        setIsAdmin(res.result.isAdmin);
        res.result.isAdmin && loadAdminExperiments();
      }
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCardClick = (e) => {
    if (e.target.innerText === "Delete") {
      setExperiments(old => {
        return old.filter(oldExp =>
          oldExp._id !== e.target.attributes.experimentid.value
        )
      })
    }
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
      <Grid container direction="column" className={classes.root}>
        <Grid item container className={classes.toolbox}>
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
          {
            isAdmin ? (
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
            isAdmin ? (
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
                <ExperimentCard {...experiment} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    );
}

export default ExperimentSearch;
