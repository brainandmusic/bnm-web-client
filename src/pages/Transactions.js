import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Transaction from '../components/transactions/Transaction';

function Transactions() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <div>Sorry this page does not exist ...</div>
      </Route>
      <Route path={`${path}/:transId`}>
        <Transaction />
      </Route>
    </Switch>
  );
}

export default Transactions;
