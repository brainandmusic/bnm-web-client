import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ExperimentManager from './experiments/ExperimentManager';
import Layout from './layout/Layout';
import Study from './utils/studies/Study';
import StudySearch from './utils/studies/StudySearch';

function Studies() {
  const { path } = useRouteMatch();
  return (
    <Layout title="Studies">
      <Switch>
        <Route exact path={path}>
          <StudySearch />
        </Route>
        <Route path={`${path}/study/:studyId/experiment/:experimentId`}>
          <ExperimentManager />
        </Route>
        <Route path={`${path}/study/:studyId`}>
          <Study />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Studies;
