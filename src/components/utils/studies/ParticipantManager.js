import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NewParticipantButton from './NewParticipantButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  toolbar: {
    marginBottom: theme.spacing(2),
  }
}))

function ParticipantManager() {
  const { studyId, experimentId } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <NewParticipantButton />
      </div>
      study id {studyId}
      experiment id {experimentId}
    </div>
  )
}

export default ParticipantManager;