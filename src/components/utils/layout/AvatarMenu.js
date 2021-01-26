import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../../contexts/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../../services/User';

function AvatarMenu() {
  const user = useUser();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    UserService.signout().then(() => {
      user.setIsLoggedIn(false);
      localStorage.removeItem("token");
      history.push("/login");
    });
  }

  return (
    <div>
      <IconButton aria-controls="avatar-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Wenhe+Qi" />
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