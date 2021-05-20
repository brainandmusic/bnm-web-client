import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import UserService from '../services/User';
import Copyright from '../components/footer/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/8QrPJ3Kfie4)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 12px)',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signInButtonWrapper: {
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  tools: {
    justifyContent: 'space-between'
  }
}));

function SignInSide() {
  const classes = useStyles();
  const user = useUser();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // when user is logged in, redirect this page to home page
    if (user.isLoggedIn) {
      history.replace("/");
    }
  }, [user.isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    setSigningIn(true);
    const res = await UserService.signin(email.toLowerCase(), password);
    setSigningIn(false);

    // display error message
    if (res.status !== "OK") {
      setSnackbarMessage(res.message);
      handleOpenSnackbar();
      return;
    }

    // store login information to local storage
    localStorage.setItem("auth_token", res.result.auth_token);
    localStorage.setItem("uid", res.result.uid);
    user.setIsLoggedIn(true);

    // go to the page before login, if exists
    history.replace(from);
  }

  const handleOpenSnackbar = () => setOpenSnackbar(true);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} lg={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
            />
            <div className={classes.signInButtonWrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
                disabled={signingIn}
              >
                Sign In
            </Button>
              {signingIn && <CircularProgress className={classes.buttonProgress} color="secondary" size={24} />}
            </div>
          </form>
          <Grid container className={classes.tools}>
            <Grid item>
              <Link href="/accounts/current/forgetpassword" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
              {"Don't have an account? "}
              <Link href="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignInSide;
