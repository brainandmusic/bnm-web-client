import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ForgetPassword from './utils/account/ForgetPassword';
import Verification from './utils/account/Verification';
import Welcome from './utils/account/Welcome';

function Account() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/new/welcome/email/:email`}>
        <Welcome />
      </Route>
      <Route path={`${path}/new/verify/email/:email/token/:token`}>
        <Verification />
      </Route>
      <Route path={`${path}/current/forgetpassword`}>
        <ForgetPassword />
      </Route>
      <Route path={`${path}/current/resetpassword/token/:token`}>
        <div>
          this page will let you reset your password
          wont's show full email, but partly obscured
          </div>
      </Route>
    </Switch>
  );
}

export default Account;
