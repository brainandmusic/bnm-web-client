import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import UserSearch from "../components/users/UserSearch";
import UserProfile from "../components/users/UserProfile";

function Users() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <UserSearch />
      </Route>
      <Route path={`${path}/:userId`}>
        <UserProfile />
      </Route>
      {/* <Route path={`${path}/builder/platform/:platform/experiment/:experimentId`}>
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route> */}
    </Switch>
  );
}

export default Users;
