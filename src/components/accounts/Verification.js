import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useUser } from '../../contexts/AuthContext';
import UserService from '../../services/User';
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
  const { uid, token } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const user = useUser();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => history.push('/');

  useEffect(() => {
    async function verifyEmail() {
      setVerifying(true);
      let res = await UserService.verifyEmail(uid, token)
      setVerifying(false);
      if (res.status === "OK") {
        localStorage.setItem("auth_token", res.result.auth_token);
        localStorage.setItem("uid", res.result.uid);
        user.setIsLoggedIn(true);
      }
      else {
        setError(true);
        setErrorMessage(res.message);
      }
    }

    verifyEmail();
  }, [uid, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        {
          verifying ?
            (
              <Typograph className={classes.thanks} component="h3" gutterBottom variant="h3">
                Verifying...
              </Typograph>
            ) :
            error ?
              (
                <div>{errorMessage}</div>
              ) :
              (
                <>
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
                </>
              )
        }
      </Paper>
    </div>
  );
}

export default Verification;
