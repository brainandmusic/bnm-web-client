import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto"
    },
    "&:hover": {
      color: "white"
    }
  }
}));

function NewButton() {
  const classes = useStyles();

  return (
    <>
      <Button
        component={Link}
        to={"/experiments/builder/platform/labjs"}
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AddIcon />}
        className={classes.button}
      >
        New experiment
      </Button>
    </>
  );
}

export default NewButton;
