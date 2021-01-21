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
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DoneAllIcon from '@material-ui/icons/DoneAll';
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
  doneAllIcon: {
    fontSize: 192,
    color: green[500],
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
  button: {
    marginTop: theme.spacing(2),
  },
  thanks: {
    color: green[500],
  }
}))

function Verification() {
  // const { email, token } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => history.push('/');

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <DoneAllIcon className={classes.doneAllIcon} />
        <Typograph className={classes.thanks} component="h3" gutterBottom variant="h3">
          GREAT!
        </Typograph>
        <Typograph gutterBottom>
          You are all set!
        </Typograph>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          GO TO HOMEPAGE
        </Button>
      </Paper>
    </div>
  );
}

export default Verification;
