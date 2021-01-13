import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExperimentCard from './ExperimentCard';
import NewButton from './NewButton';

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
  return (
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
        <Grid item xs={12} md="auto" className={classes.filter}>
          <NewButton />
        </Grid>
      </Grid>
      <Grid item container className={classes.experiments}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card, index) => (
            <Grid item xs={12} md={6} lg={2} key={index} className={classes.experiment}>
              <ExperimentCard />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default ExperimentSearch;
