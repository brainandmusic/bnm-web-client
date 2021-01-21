import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Account from './components/Account';
import Experiments from './components/Experiments';
import Messages from './components/Messages';
import NotFound from './components/NotFound';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/account' children={<Account />} />
        <Route path='/login' children={<SignInSide />} />
        <Route path='/signup' children={<SignUpSide />} />
        <Route path='/experiments' children={<Experiments />} />
        <Route path='/settings' children={<Settings />} />
        <Route path='/notifications' children={<Notifications />} />
        <Route path='/messages' children={<Messages />} />
        <Route path='*' children={<NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
