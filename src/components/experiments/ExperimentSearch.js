import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ExperimentCards from './ExperimentCards';
import Layout from '../layout/Layout';
import UserService from '../../services/User';
import AssessmentCards from '../assessments/AssessmentCards';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  experiments: {
    marginTop: theme.spacing(2)
  }
}))

function ExperimentSearch() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("participant");

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
      setLoading(false);
    }

    getRole();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (<div>Loading ...</div>) : (
    <Layout
      title={"Experiments"}>
      <Grid container direction="column" className={classes.root}>
        <Grid item container className={classes.experiments}>
          {
            role === "participant" ? (
              <AssessmentCards uid={localStorage.getItem("uid")} />
            ) : (
              <ExperimentCards role={role} />
            )
          }
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ExperimentSearch;
