import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./layout/Layout";

import UserService from "services/User";
import { cleanLocalStorage } from "configs/Helpers";
import { useUser } from "contexts/AuthContext";

const Settings = () => {
  const user = useUser();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const getUserName = async uid => {
    const res = await UserService.getUser(uid);
    if (res.status === "LOGIN_REQUIRED") {
      cleanLocalStorage();
      history.go(0);
    } else if (res.status === "OK") {
      setFirstName(res.result.firstName);
      setLastName(res.result.lastName);
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      // uid should exist if user is loggedin
      cleanLocalStorage();
      user.setIsLoggedIn(false);
    } else {
      getUserName(uid);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleLogout = async () => {
    await UserService.signout();
    cleanLocalStorage();
    user.setIsLoggedIn(false);
  };
  return <Layout title="Settings">This is setting page.</Layout>;
};

export default Settings;
