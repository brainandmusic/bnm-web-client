import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';

import ExperimentService from '../../services/Experiment';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  title: {
    fontSize: 14,
  },
  description: {
    marginBottom: 12,
  },
  expend: {
    marginLeft: "auto",
  }
});

function AssessmentCard({ _id, assignDate, status, experimentId, participantId }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [experiment, setExperiment] = useState({});

  useEffect(() => {
    async function loadExperimentSummary(eid) {
      setLoading(true);
      let res = await ExperimentService.getExperiment(eid, 1);
      if (res.status === "OK") {
        setExperiment(res.result);
      }
      setLoading(false);
    }

    loadExperimentSummary(experimentId);
  }, [experimentId])

  const handleRunExp = () => {
    history.push(`/experiments/run/assessment/${_id}/experiment/${experimentId}`)
  }

  return loading ? (<div>Loading ...</div>) : (
    <Card className={classes.root}>
      <CardActionArea onClick={handleRunExp}>
        <CardContent>
          <Typography variant="subtitle1" component="h2" gutterBottom >
            {experiment.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.description}>
            {experiment.description || ""}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="start experiment" onClick={handleRunExp}>
          <PlayArrowIcon />
        </IconButton>
      </CardActions>
    </Card >
  )
}

export default AssessmentCard;
