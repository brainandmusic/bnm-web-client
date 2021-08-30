import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../contexts/AuthContext";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
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
              pathname: "/entry",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
