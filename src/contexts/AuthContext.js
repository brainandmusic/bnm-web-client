import React, { useState } from "react";
import UserService from '../services/User';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
});

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  // TODO: get admin status from server
  const [isAdmin, setIsAdmin] = useState(false);

  const signin = (email, pwd) => {
    // TODO: signin with the server, save jwt token to localStorage
    // setisLoggedIn and isAdmin accordingly
  }

  const signup = (firstName, lastName, email, password) => {
    return UserService.signup(firstName, lastName, email, password);
  }

  const signout = () => {
    // TODO: signout with the server
    // setisLoggedIn and isAdmin accordingly
  }

  return {
    isLoggedIn,
    isAdmin,
    signin,
    signup,
    signout,
  }
};

export const AuthContextProvider = ({ children }) => {
  const user = useUser();
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContextConsumer = AuthContext.Consumer;


export default AuthContext;
