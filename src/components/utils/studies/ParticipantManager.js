import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NewParticipantButton from './NewParticipantButton';
import ParticipantTable from './ParticipantTable';
import UserService from '../../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  toolbar: {
    marginBottom: theme.spacing(2),
  },
  table: {
    marginBottom: theme.spacing(2),
  },
}))

function ParticipantManager() {
  const { studyId, experimentId } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setLoading(true);
    UserService.getUsers(
      { experiments: { $elemMatch: { studyId, experimentId } } },
      { _id: 1, firstName: 1, lastName: 1, email: 1, "experiments.$": 1 }
    ).then(res => res.data).then(res => {
      setLoading(false);
      if (res.status === "OK") {
        let participantsFromDb = [];
        res.result.forEach(participant => {
          participant.experiments.forEach(exp => {
            participantsFromDb.push({
              id: participant._id,
              firstName: participant.firstName,
              lastName: participant.lastName,
              email: participant.email,
              ...exp
            })
          })
        })
        // alert(JSON.stringify(res.result));
        setParticipants(participantsFromDb);
      }
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }, [studyId, experimentId]);

  return loading ? (
    <div>Loading ...</div>
  ) : (
      <div className={classes.root}>
        <div className={classes.toolbar}>
          <NewParticipantButton studyId={studyId} experimentId={experimentId} />
        </div>
        <div className={classes.table}>
          <ParticipantTable participants={participants} />
        </div>
      </div>
    )
}

export default ParticipantManager;