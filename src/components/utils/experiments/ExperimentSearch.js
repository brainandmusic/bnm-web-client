import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  search: {
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
  },
  filter: {
    margin: theme.spacing(1),
  },
  formcontrol: {
    width: "100%",
  },
  experiments: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
  }
}))

function ExperimentSearch() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container className={classes.search}>
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
      </Grid>
      <Grid item container className={classes.experiments}>
        All filtered experiments are shown here.
      </Grid>
    </Grid>
  );
}

export default ExperimentSearch;
