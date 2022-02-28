import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "contexts/AuthContext";
import Account from "routes/pages/Accounts";
import Experiments from "routes/pages/Experiments";
import Groups from "routes/pages/Groups";
import Messages from "components/Messages";
import NotFound from "components/NotFound";
import Notifications from "components/Notifications";
import PrivateRoute from "routes/PrivateRoute";
import Reports from "routes/pages/Reports";
import Settings from "components/Settings";
import Entry from "routes/pages/Entry";
import SignInSide from "routes/pages/SignInSide";
import SignUpSide from "routes/pages/SignUpSide";
import Studies from "routes/pages/Studies";
import Transactions from "routes/pages/Transactions";
import Users from "routes/pages/Users";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            children={<Redirect to="/experiments" />}
          />

          <Route path="/entry" children={<Entry />} />
          <Route path="/accounts" children={<Account />} />
          <Route path="/login" children={<SignInSide />} />
          <Route path="/signup" children={<SignUpSide />} />
          <PrivateRoute path="/experiments" children={<Experiments />} />
          <PrivateRoute path="/groups" children={<Groups />} />
          <PrivateRoute path="/users" children={<Users />} />
          <PrivateRoute path="/reports" children={<Reports />} />
          <PrivateRoute path="/settings" children={<Settings />} />
          <PrivateRoute path="/studies" children={<Studies />} />
          <PrivateRoute path="/transactions" children={<Transactions />} />
          <PrivateRoute path="/notifications" children={<Notifications />} />
          <PrivateRoute path="/messages" children={<Messages />} />
          <Route path="*" children={<NotFound />} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
