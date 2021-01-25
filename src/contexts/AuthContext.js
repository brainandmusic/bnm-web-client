import React, { useState, useContext } from "react";
import UserService from '../services/User';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
});

export const useProvideUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  // TODO: get admin status from server
  const [isAdmin, setIsAdmin] = useState(false);

  const signin = (email, password) => {
    return UserService.signin(email, password);
  }

  const signup = (firstName, lastName, email, password) => {
    return UserService.signup(firstName, lastName, email, password);
  }

  const signout = () => {
    return UserService.signout();
  }

  return {
    isLoggedIn,
    isAdmin,
    setIsAdmin,
    setIsLoggedIn,
    signin,
    signup,
    signout,
  }
};

export const AuthContextProvider = ({ children }) => {
  const user = useProvideUser();
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  return useContext(AuthContext);
}

export const AuthContextConsumer = AuthContext.Consumer;


export default AuthContext;
