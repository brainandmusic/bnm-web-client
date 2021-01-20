import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuAppBar from './MenuAppBar';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  contentContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    padding: theme.spacing(3),
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
  toolbar: {
    ...theme.mixins.toolbar,
  }
}));

function Layout({ children, title }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleMobileMenuOpen = () => setOpen(true);

  const handleMobileMenuClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAppBar
        handleMenuClick={handleMobileMenuOpen}
        menu={
          <SideBar
            open={open}
            handleClose={handleMobileMenuClose}
          />
        }
        title={title}
      />
      <div className={classes.sectionDesktop}>
        <SideBar variant="persistent" />
      </div>
      <main className={classes.contentContainer}>
        <div className={classes.toolbar}></div>
        <div className={classes.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
