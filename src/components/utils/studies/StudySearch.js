import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import StudyCard from './StudyCard';
import NewStudyButton from './NewStudyButton';
import StudyService from '../../../services/Study';

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
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StudyService.getStudies({}, {}).then(res => res.data).then(res => {
      if (res.status === "OK") {
        setStudies(res.result);
      }
      setLoading(false);
    })
  }, []);

  const handleNewStudyCreated = (cStatus, cResult, cMsg) => {
    console.log(cStatus);
    console.log(cResult);
    console.log(cMsg);
    if (cStatus === "OK") {
      setStudies(old => {
        return [...old, cResult];
      });
    }
    else {
      console.log(cMsg);
    }
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
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
            <NewStudyButton onCreateCallback={handleNewStudyCreated} />
          </Grid>
        </Grid>
        <Grid item container className={classes.experiments}>
          {
            studies.map((study, index) => (
              <Grid item xs={12} md={6} lg={2} key={`study_card_index_${index}`} className={classes.experiment}>
                <StudyCard {...study} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    );
}

export default StudySearch;
