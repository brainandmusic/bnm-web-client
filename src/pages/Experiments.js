import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ExperimentBuilder from '../components/experiments/ExperimentBuilder';
import ExperimentSearch from '../components/experiments/ExperimentSearch';
import Layout from '../components/layout/Layout';

function Experiments() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ExperimentSearch />
      </Route>
      <Route path={`${path}/builder/platform/:platform/experiment/:experimentId`}>
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route>
      <Route path={`${path}/builder/platform/:platform/`}>
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route>
      <Route path={`${path}/run/platform/:platform/project/:pid/experiment/:eid/complete`}>
        <Layout title="Experiments">
          <div>
            <h2>Experiment complete page</h2>
            <p>Participant will be redirected here after compeleting the experiment.</p>
            <p>We could also add some short survey like star rating how noisy the env is during the experiment.</p>
          </div>
        </Layout>
      </Route>
      <Route path={`${path}/run/platform/:platform/project/:pid/experiment/:eid`}>
        <Layout title="Experiments">
          <div>
            <h2>Experiment runner page</h2>
            <p>User was tested in thise page</p>
          </div>
        </Layout>
      </Route>
    </Switch>
  );
}

export default Experiments;
