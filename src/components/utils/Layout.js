import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import { useRouteMatch } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  avatar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const drawerMenus = [
  {
    icon: <AssignmentIcon />,
    text: "Experiments",
  },
  {
    icon: <SettingsIcon />,
    text: "Settings",
  },
];

function getAppBarTitleFromPath(path) {
  // remove the first '/'
  let title = path.slice(1);
  let slashIdx = title.indexOf("/");
  slashIdx = slashIdx === -1 ? title.lengh : slashIdx;
  title = title.charAt(0).toUpperCase() + title.slice(1, slashIdx).toLowerCase();
  return title;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        {'USC Brain & Music Lab'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Layout(props) {
  const { window, children } = props;
  const { path } = useRouteMatch();
  const [appBarTitle] = useState(getAppBarTitleFromPath(path));
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.avatar}>
        <Avatar src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Wenhe+Qi" />
        <Button>Exit</Button>
      </div>
      <Divider />
      <List>
        {drawerMenus.map((menu, index) => (
          <Link
            underline="none"
            color="inherit"
            href={`/${menu.text.toLowerCase()}`}
            key={`layout_appbar_toolbar_drawer_link_${menu.text}`}
          >
            <ListItem
              button
              selected={path.toLowerCase().startsWith(`/${menu.text.toLowerCase()}`)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />

            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.contentContainer}>
        <div className={classes.toolbar} />
        <div className={classes.content}>
          {children}
        </div>
        <Copyright />
      </main>
    </div>
  );
}

export default Layout;
