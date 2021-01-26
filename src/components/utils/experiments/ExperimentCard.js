import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
import UserService from '../../../services/User';

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

function ExperimentCard({ name, description, platform, _id }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    UserService.isAdmin().then(res => res.data).then(res => {
      if (res.status === "INVALID_REQUEST" && res.message === "JWT token is not valid.") {
        localStorage.removeItem("token");
        history.push("/");
      }
      else if (res.status === "OK") {
        setIsAdmin(res.result.isAdmin);
      }
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    window.open(`${process.env.PUBLIC_URL}/experiments/runner/${platform.replace(/\./g, "").toLowerCase()}/`, "", windowFeatures);
  }

  const handleConfigClick = () => {
    alert('go to config experiment page');
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={isAdmin ? handleConfigClick : handleRunClick}>
        <CardContent>
          {
            isAdmin ? (
              <Typography variant="subtitle2" color="textSecondary">
                {platform}
              </Typography>
            ) : null
          }
          <Typography variant="subtitle1" component="h2" gutterBottom >
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.description}>
            {description || ""}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {
          isAdmin ? null : (
            <IconButton aria-label="start experiment" onClick={handleRunClick}>
              <PlayArrowIcon />
            </IconButton>
          )
        }
        {
          isAdmin ? (
            <>
              <IconButton aria-label="config experiment" onClick={handleConfigClick}>
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
                <MenuItem onClick={handleMenuClose} experimentId={_id}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          ) : null
        }
      </CardActions>
    </Card >
  );
}

export default ExperimentCard;
