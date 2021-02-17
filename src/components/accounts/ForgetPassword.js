import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typograph from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
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
  input: {
    marginRight: theme.spacing(1),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: 'relative',
    marginTop: theme.spacing(2),
  },
}))

function ForgetPassword() {
  const classes = useStyles();
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");

  const sendForgetPasswordEmail = async () => {
    setSending(true);
    // send the email
    await UserService.forgetPassword(email);
    setSending(false);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <LockOpenIcon className={classes.lockOpenIcon} />
        <Typograph className={classes.title} component="h3" gutterBottom variant="h4">
          We GOT THIS.
        </Typograph>
        <Typograph gutterBottom>
          Enter your email address below and we'll send you a link to reset your password.
        </Typograph>
        <TextField id="forget-password-email" label="Email" className={classes.input} onChange={handleEmailChange} />
        <div className={classes.buttonWrapper}>
          <Button
            variant="outlined"
            onClick={sendForgetPasswordEmail}
            disabled={sending}
          >
            Send
          </Button>
          {sending && <CircularProgress className={classes.buttonProgress} color="secondary" size={24} />}
        </div>
      </Paper>
    </div>
  );
}

export default ForgetPassword;
