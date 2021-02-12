import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import psychopyLogo from '../../images/psychopy-logo.png';
import jspsychLogo from '../../images/jspsych-logo.png';
import labjsLogo from '../../images/labjs-logo.png';

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(0, 5),
    boxShadow: theme.shadows[5],
    // remove the blue border when modal is first opened
    "&:focus": {
      outline: "none",
    },
  },
  cancel: {
    marginLeft: "auto"
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  platforms: {
    marginTop: theme.spacing(1),
  },
  platform: {
    justifyContent: "flex-start",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    }
  }
}));

const platforms = [
  {
    src: labjsLogo,
    alt: "Lab.js Logo",
    name: "Lab.js",
    url: "/experiments/builder/platform/labjs",
  },
  {
    src: psychopyLogo,
    alt: "PsychoPy Logo",
    name: "PsychoPy",
    url: "/experiments/builder/platform/psychopy",
  },
  {
    src: jspsychLogo,
    alt: "jsPsych Logo",
    name: "jsPsych",
    url: "/experiments/builder/platform/jspsych",
  },
]

function Platform({ src, alt, name, url }) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      startIcon={<Avatar src={src} alt={alt} />}
      fullWidth
      href={url}
      className={classes.platform}
    >
      {name}
    </Button>
  );
}

function NewButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleOpen}
      >
        New experiment
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.paper} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                Select a platform
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.platforms}>
                {
                  platforms.map((platform, index) => {
                    return (
                      <Grid item xs={12} md={6} key={`experiments_button_platform_selector_${index}_${platform.name}`}>
                        <Platform
                          src={platform.src}
                          alt={platform.alt}
                          name={platform.name}
                          url={platform.url}
                        />
                      </Grid>
                    );
                  })
                }
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClose} className={classes.cancel}>Cancel</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default NewButton;
