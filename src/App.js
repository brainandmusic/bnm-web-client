import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';
import Experiments from './components/Experiments';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
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
