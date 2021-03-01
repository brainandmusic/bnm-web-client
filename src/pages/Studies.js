import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ExperimentManager from '../components/experiments/ExperimentManager';
import Layout from '../components/layout/Layout';
import Study from '../components/studies/Study';
import StudySearch from '../components/studies/StudySearch';

function Studies() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <StudySearch />
      </Route>
      <Route path={`${path}/study/:studyId/experiment/:experimentId`}>
        <Layout title="Studies">
          <ExperimentManager />
        </Layout>
      </Route>
      <Route path={`${path}/study/:studyId`}>
        <Layout title="Studies">
          <Study />
        </Layout>
      </Route>
    </Switch>
  );
}

export default Studies;
