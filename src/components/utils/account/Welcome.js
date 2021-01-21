/*
 * Welcome
 *
 * Welcome component first checks if the account associated with the
 * email is a newly registered account and not verified.
 * 
 * If account is not found or has already been verified, display
 * error accordingly.
 * 
 * If account is newly registered, display welcome message and show
 * the resend button in case user doesn't receive the verification
 * email.
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Paper from '@material-ui/core/Paper';
import Typograph from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

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
  checkCircle: {
    fontSize: 192,
    color: green[500],
  },
  muted: {
    color: grey[500],
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(1),
    maxWidth: '100%',
    overflow: 'hidden',
    padding: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    }
  },
  resendButton: {
    marginTop: theme.spacing(2),
  },
  thanks: {
    color: green[500],
  }
}))

function Welcome() {
  const { email } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <CheckCircleOutlineIcon className={classes.checkCircle} />
        <Typograph className={classes.thanks} component="h3" gutterBottom variant="h3">
          THANKS!
        </Typograph>
        <Typograph gutterBottom>
          Thank you for signing up! In order to make your account more secure, a
          verification email has been sent to <strong>{email}</strong>. Please complete the verification
          process by clicking the link enclosed in the email.
        </Typograph>
        <Typograph className={classes.muted} gutterBottom>
          Note: please do check your spam/junk folder in case it's misclassified.
        </Typograph>
        <Button className={classes.resendButton} variant="outlined">Resend</Button>
      </Paper>
    </div>
  );
}

export default Welcome;
