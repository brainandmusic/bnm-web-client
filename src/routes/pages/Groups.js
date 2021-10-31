import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import GroupSearch from "components/groups/GroupSearch";
import GroupMembers from "components/groups/GroupMembers";

function Groups() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <GroupSearch />
      </Route>
      <Route path={`${path}/:groupId/members`}>
        <GroupMembers />
      </Route>
      {/* <Route path={`${path}/builder/platform/:platform/experiment/:experimentId`}>
        <Layout title="Experiments">
          <ExperimentBuilder />
        </Layout>
      </Route> */}
    </Switch>
  );
}

export default Groups;
