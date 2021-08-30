import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor: "inherit"
    },
    marginTop: "20%"
  },
  title: {
    textAlign: "center",
    fontFamily: "'Nanum Brush Script', cursive"
  },
  button: {
    "&:hover": {
      color: "white"
    }
  }
}));

export default function Entry() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        component="h1"
        variant="h1"
        gutterBottom
      >
        Creative Minds Lab
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        </Box>
        <Box p={1}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Log in
          </Button>
        </Box>
      </Box>
    </div>
  );
}
