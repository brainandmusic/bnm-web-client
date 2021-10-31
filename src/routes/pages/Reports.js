import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Report from "components/reports/Report";

function Reports() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:aid`}>
        <Report />
      </Route>
    </Switch>
  );
}

export default Reports;
