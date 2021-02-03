import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ParticipantManager from './utils/studies/ParticipantManager';
import Layout from './utils/layout/Layout';
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
          <ParticipantManager />
        </Route>
        <Route path={`${path}/study/:studyId`}>
          <Study />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Studies;
