import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import StudyCard from './StudyCard';
import NewStudyButton from './NewStudyButton';

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

function StudySearch() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container className={classes.toolbox}>
        <Grid item xs={12} md={2} lg={1} className={classes.filter}>
          <FormControl className={classes.formcontrol}>
            <InputLabel id="study-status-select-label">Status</InputLabel>
            <Select
              labelId="study-status-select-label"
              id="study-status-select"
              defaultValue="public"
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md="auto" className={classes.filter}>
          <NewStudyButton />
        </Grid>
      </Grid>
      <Grid item container className={classes.experiments}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card, index) => (
            <Grid item xs={12} md={6} lg={2} key={index} className={classes.experiment}>
              <StudyCard />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default StudySearch;
