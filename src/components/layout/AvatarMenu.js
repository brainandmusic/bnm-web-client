import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../contexts/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../services/User';
import { cleanLocalStorage } from '../../configs/Helpers';

function AvatarMenu() {
  const user = useUser();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const getUserName = async (uid) => {
    const res = await UserService.getUser(uid);
    if (res.status === "LOGIN_REQUIRED") {
      cleanLocalStorage();
      history.go(0);
    }
    else if (res.status === "OK") {
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
    }
    else {
      getUserName(uid);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await UserService.signout();
    cleanLocalStorage();
    user.setIsLoggedIn(false);
  }

  return (
    <div>
      <IconButton aria-controls="avatar-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar src={`https://ui-avatars.com/api/?color=fff&name=${firstName}+${lastName}`} />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default AvatarMenu;