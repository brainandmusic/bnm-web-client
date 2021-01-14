import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TuneIcon from '@material-ui/icons/Tune';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  title: {
    fontSize: 14,
  },
  description: {
    marginBottom: 12,
  },
  expend: {
    marginLeft: "auto",
  }
});

function ExperimentCard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRunClick = () => {
    // TODO:
    // 1) prepare the data runner window needs to run the experiment
    // 2) create a modal to show the user progress/status of the running experiment in another window
    // 3) when user completes the experiment, upload response to database
    const windowFeatures = "menubar=no,location=no,toolbar=no,resizable=yes";
    window.open(`${process.env.PUBLIC_URL}/experiments/runner/labjs/`, "", windowFeatures);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Platform
          </Typography>
          <Typography variant="subtitle1" component="h2" gutterBottom >
            Experiment Title
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.description}>
            Experiment description
        </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="start experiment" onClick={handleRunClick}>
          <PlayArrowIcon />
        </IconButton>
        <IconButton aria-label="config experiment">
          <TuneIcon />
        </IconButton>
        <IconButton
          aria-label="more options"
          aria-controls="expend-menu"
          aria-haspopup="true"
          className={classes.expend}
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="expend-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem >
            Delete
          </MenuItem>
        </Menu>
      </CardActions>
    </Card >
  );
}

export default ExperimentCard;
