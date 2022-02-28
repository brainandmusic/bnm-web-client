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
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/User";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typograph from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: "100vw",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: "relative",
    marginTop: theme.spacing(2),
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
    maxWidth: "100%",
    overflow: "hidden",
    padding: theme.spacing(1),
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%",
    },
  },
  thanks: {
    color: green[500],
  },
}));

function Welcome() {
  const { uid } = useParams();
  const classes = useStyles();
  const [sending, setSending] = useState(false);

  const handleResendEmail = async () => {
    setSending(true);
    await UserService.sendVerificationEmail(uid);
    setSending(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <CheckCircleOutlineIcon className={classes.checkCircle} />
        <Typograph
          className={classes.thanks}
          component="h3"
          gutterBottom
          variant="h3"
        >
          THANKS!
        </Typograph>
        <Typograph gutterBottom>
          Thank you for signing up! Please <Link to="login">Login</Link> here.
        </Typograph>
      </Paper>
    </div>
  );
}

export default Welcome;
