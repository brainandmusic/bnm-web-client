import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from '../contexts/AuthContext';

function PrivateRoute({ children, ...rest }) {
  const user = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;
