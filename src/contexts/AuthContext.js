import React, { useState, useContext } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export const useProvideUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth_token") ? true : false);

  return {
    isLoggedIn,
    setIsLoggedIn,
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
