import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ForgetPassword from "components/accounts/ForgetPassword";
import ResetPassword from "components/accounts/ResetPassword";
import Verification from "components/accounts/Verification";
import Welcome from "components/accounts/Welcome";

function Accounts() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:uid/welcome`}>
        <Welcome />
      </Route>
      <Route path={`${path}/:uid/verify/token/:token`}>
        <Verification />
      </Route>
      <Route path={`${path}/current/forgetpassword`}>
        <ForgetPassword />
      </Route>
      <Route path={`${path}/:uid/resetpassword/token/:token`}>
        <ResetPassword />
      </Route>
    </Switch>
  );
}

export default Accounts;
