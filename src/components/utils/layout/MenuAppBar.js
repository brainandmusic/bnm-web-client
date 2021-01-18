import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

function MenuAppBar({ handleMenuClick, menu, title }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <div className={classes.sectionMobile}>
          <IconButton aria-label="menu" className={classes.menuButton} color="inherit" edge="start" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
        </div>
        <Typography className={classes.title} color="inherit" noWrap variant="h6">
          {title || ""}
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Avatar src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Wenhe+Qi" />
        </div>
      </Toolbar>
      {menu}
    </AppBar>
  );
}

export default MenuAppBar;
