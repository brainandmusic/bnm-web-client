import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ExperimentBuilder from './utils/experiments/ExperimentBuilder';
import ExperimentSearch from './utils/experiments/ExperimentSearch';
import Layout from './utils/Layout';

function Experiments() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <ExperimentSearch />
        </Route>
        <Route path={`${path}/builder/platform/:platform/experiment/:experimentId`}>
          <ExperimentBuilder />
        </Route>
        <Route path={`${path}/builder/platform/:platform/`}>
          <ExperimentBuilder />
        </Route>
        <Route path={`${path}/run/platform/:platform/project/:pid/experiment/:eid/complete`}>
          <div>
            <h2>Experiment complete page</h2>
            <p>Participant will be redirected here after compeleting the experiment.</p>
            <p>We could also add some short survey like star rating how noisy the env is during the experiment.</p>
          </div>
        </Route>
        <Route path={`${path}/run/platform/:platform/project/:pid/experiment/:eid`}>
          <div>
            <h2>Experiment runner page</h2>
            <p>User was tested in thise page</p>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default Experiments;
