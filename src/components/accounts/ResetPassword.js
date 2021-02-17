import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typograph from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import UserService from '../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 12px)',
  },
  lockOpenIcon: {
    fontSize: 192,
    color: deepOrange[500],
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(1),
    width: '-webkit-fill-available',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    }
  },
  title: {
    color: deepOrange[500],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  formElement: {
    width: '100%',
    margin: theme.spacing(1),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: 300,
    }
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResetPassword() {
  const classes = useStyles();
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackStatus, setSnackStatus] = useState("OK");
  const [snackMsg, setSnackMsg] = useState("");

  const validPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/.test(password);
  }
  const validConfirmPassword = (cpwd) => cpwd === password;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (validPassword(newPassword)) {
      setErrorPassword(false);
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (validConfirmPassword(newConfirmPassword)) {
      setErrorConfirmPassword(false);
    }
  }

  const handleReset = async (e) => {
    e.preventDefault();
    let validForm = true;

    if (!validPassword(password)) {
      validForm = false;
      setErrorPassword(true);
    }
    if (!validConfirmPassword(confirmPassword)) {
      validForm = false;
      setErrorConfirmPassword(true);
    }
    if (validForm) {
      setResetting(true);
      let res = await UserService.resetPassword(uid, token, password);
      setResetting(false);
      setSnackStatus(res.status);
      setSnackMsg(res.message);
      handleOpenSnackbar();
    }
  }

  const handleOpenSnackbar = () => setOpenSnackbar(true);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <LockOpenIcon className={classes.lockOpenIcon} />
        <Typograph className={classes.title} component="h3" gutterBottom variant="h4">
          RESET PASSWORD
        </Typograph>
        <form className={classes.form}>
          <div className={classes.formElement}>
            <TextField
              autoComplete="new-password"
              error={errorPassword}
              fullWidth
              helperText={errorPassword && "Password should be 8-25 characters long and contain at least one digit, one uppercase letter, one lowercase letter and a special character like .!@#$%^&*()_+-="}
              id="password"
              label="Password"
              name="password"
              onChange={handlePasswordChange}
              required
              type="password"
              value={password}
              variant="outlined"
            />
          </div>
          <div className={classes.formElement}>
            <TextField
              autoComplete="new-password"
              error={errorConfirmPassword}
              fullWidth
              helperText={errorConfirmPassword && "Confirm password is different from password"}
              id="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              onChange={handleConfirmPasswordChange}
              required
              type="password"
              value={confirmPassword}
              variant="outlined"
            />
          </div>
          <div className={classes.formElement}>
            <Button
              color="primary"
              disabled={resetting}
              fullWidth
              onClick={handleReset}
              type="submit"
              variant="contained"
            >
              Reset
            </Button>
            {resetting && <CircularProgress className={classes.buttonProgress} color="secondary" size={24} />}
          </div>
        </form>
        <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackStatus === "OK" ? "success" : "error"}>
            {
              snackStatus === "OK" ? (
                <>
                  Your password has been reset. Please go to {" "}
                  <Link href="/login" color="inherit" underline="always">LOGIN</Link> page to sign in.
                </>
              ) : snackMsg
            }
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}

export default ResetPassword;
