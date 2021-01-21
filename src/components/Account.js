import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ForgetPassword from './utils/account/ForgetPassword';
import ResetPassword from './utils/account/ResetPassword';
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
        <ResetPassword />
      </Route>
    </Switch>
  );
}

export default Account;
