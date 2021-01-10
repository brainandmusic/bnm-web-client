import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
function Experiments() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>
          <h2>experiments page</h2>
          <p>If user is a participant, all pending/complete experiments show here.</p>
          <p>If user is an admin/R.A., all experiments cards should show here.</p>
        </div>
      </Route>
      <Route path={`${path}/compose/platform/:platform/new`}>
        <div>
          <h2>experiment composition page</h2>
          <p>Depending on the platform, admin/R.A. can compose experiments here</p>
          <p>After creation, user can go back to experiment page to see if it is published.</p>
          <p>Of course use can save and review draft.</p>
        </div>
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

  );
}

export default Experiments;
