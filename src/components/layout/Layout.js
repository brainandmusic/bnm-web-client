import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuAppBar from './MenuAppBar';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SideBar from './SideBar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const handleMobileMenuOpen = () => setMenuOpen(true);

  const handleMobileMenuClose = () => setMenuOpen(false);

  const handleSnackbarOpen = () => setSnackbarOpen(true);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAppBar
        handleMenuClick={handleMobileMenuOpen}
        menu={
          <SideBar
            open={menuOpen}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Layout;
