import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ExperimentBuilder from "components/experiments/ExperimentBuilder";
import ExperimentSearch from "components/experiments/ExperimentSearch";
import Assessment from "components/assessments/Assessment";
import Layout from "components/layout/Layout";

function Experiments() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ExperimentSearch />
      </Route>
      <Route
        path={`${path}/builder/platform/:platform/experiment/:experimentId`}
      >
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route>
      <Route path={`${path}/builder/platform/:platform/`}>
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route>
      <Route
        path={`${path}/run/assessment/:assessmentId/experiment/:experimentId`}
      >
        <Assessment />
      </Route>
    </Switch>
  );
}

export default Experiments;
