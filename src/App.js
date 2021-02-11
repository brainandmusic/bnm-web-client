import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import Account from './components/Account';
import Experiments from './pages/Experiments';
import Messages from './components/Messages';
import NotFound from './components/NotFound';
import Notifications from './components/Notifications';
import PrivateRoute from './routes/PrivateRoute';
import Settings from './components/Settings';
import SignInSide from './pages/SignInSide';
import SignUpSide from './components/SignUpSide';
import Studies from './components/Studies';
import Groups from './pages/Groups';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' children={<Redirect to="/experiments" />} />
          <Route path='/account' children={<Account />} />
          <Route path='/login' children={<SignInSide />} />
          <Route path='/signup' children={<SignUpSide />} />
          <PrivateRoute path='/experiments' children={<Experiments />} />
          <PrivateRoute path='/groups' children={<Groups />} />
          <PrivateRoute path='/settings' children={<Settings />} />
          <PrivateRoute path='/studies' children={<Studies />} />
          <PrivateRoute path='/notifications' children={<Notifications />} />
          <PrivateRoute path='/messages' children={<Messages />} />
          <Route path='*' children={<NotFound />} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
