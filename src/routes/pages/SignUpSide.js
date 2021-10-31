import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserService from "services/User";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        {"USC Brain & Music Lab"}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  buttonProgress: {
    position: "absolute",
    top: "calc(50% - 10px)",
    left: "calc(50% - 12px)"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/8e0EHPUx3Mo)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    height: "100vh"
  },
  signUpButtonWrapper: {
    position: "relative"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  tools: {
    justifyContent: "space-between"
  }
}));

function SignUpSide() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validFirstName = name => name && name.length > 0;
  const validLastName = name => name && name.length > 0;
  const validEmail = email => {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      email
    );
  };
  const validPassword = password => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/.test(
      password
    );
  };
  const validConfirmPassword = cpwd => cpwd === password;

  const handleFirstNameChange = e => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);
    if (validFirstName(newFirstName)) {
      setErrorFirstName(false);
    }
  };

  const handleLastNameChange = e => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    if (validLastName(newLastName)) {
      setErrorLastName(false);
    }
  };

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (validEmail(newEmail)) {
      setErrorEmail(false);
    }
  };

  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (validPassword(newPassword)) {
      setErrorPassword(false);
    }
  };

  const handleConfirmPasswordChange = e => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (validConfirmPassword(newConfirmPassword)) {
      setErrorConfirmPassword(false);
    }
  };

  const handleSignUp = async e => {
    e.preventDefault();
    let validForm = true;
    if (!validFirstName(firstName)) {
      validForm = false;
      setErrorFirstName(true);
    }
    if (!validLastName(lastName)) {
      validForm = false;
      setErrorLastName(true);
    }
    if (!validEmail(email)) {
      validForm = false;
      setErrorEmail(true);
    }
    if (!validPassword(password)) {
      validForm = false;
      setErrorPassword(true);
    }
    if (!validConfirmPassword(confirmPassword)) {
      validForm = false;
      setErrorConfirmPassword(true);
    }
    if (validForm) {
      setSigningUp(true);
      try {
        let res = await UserService.signup({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password
        });
        setSigningUp(false);

        if (res.status === "OK") {
          history.push(`/accounts/${res.result._id}/welcome/`);
        } else {
          // registration fails, show snackbar
          setSnackbarMessage(res.message);
          handleOpenSnackbar();
        }
      } catch (e) {
        setSnackbarMessage(JSON.stringify(e));
        handleOpenSnackbar();
      }
    }
  };

  const handleOpenSnackbar = () => setOpenSnackbar(true);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  autoFocus
                  error={errorFirstName}
                  fullWidth
                  helperText={errorFirstName && "First name is empty"}
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  onChange={handleFirstNameChange}
                  required
                  value={firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="lname"
                  error={errorLastName}
                  fullWidth
                  helperText={errorLastName && "Last name is empty"}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleLastNameChange}
                  required
                  value={lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  error={errorEmail}
                  fullWidth
                  helperText={errorEmail && "Please enter a valid email"}
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleEmailChange}
                  required
                  value={email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  error={errorPassword}
                  fullWidth
                  helperText={
                    errorPassword &&
                    "Password should be 8-25 characters long and contain at least one digit, one uppercase letter, one lowercase letter and a special character like .!@#$%^&*()_+-="
                  }
                  id="password"
                  label="Password"
                  name="password"
                  onChange={handlePasswordChange}
                  required
                  type="password"
                  value={password}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  error={errorConfirmPassword}
                  fullWidth
                  helperText={
                    errorConfirmPassword &&
                    "Confirm password is different from password"
                  }
                  id="confirm-password"
                  label="Confirm Password"
                  name="confirm-password"
                  onChange={handleConfirmPasswordChange}
                  required
                  type="password"
                  value={confirmPassword}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                By signing up you agree to the Term of User and Privacy Policy.
              </Grid>
            </Grid>
            <div className={classes.signUpButtonWrapper}>
              <Button
                className={classes.submit}
                color="primary"
                disabled={signingUp}
                fullWidth
                onClick={handleSignUp}
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
              {signingUp && (
                <CircularProgress
                  className={classes.buttonProgress}
                  color="secondary"
                  size={24}
                />
              )}
            </div>
            <Grid container justify="flex-end">
              <Grid item>
                {"Already have an account? "}
                <Link href="/login" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <Copyright />
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignUpSide;
