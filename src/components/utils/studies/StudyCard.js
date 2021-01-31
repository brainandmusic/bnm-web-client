import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from "@material-ui/icons/MoreVert";
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

function StudyCard({ _id, name, description, status }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfig = () => {
    history.push(`/studies/study/${_id}`);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleConfig}>
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            {status}
          </Typography>
          <Typography variant="subtitle1" component="h2" gutterBottom >
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.description}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
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
          <MenuItem onClick={handleMenuClose} studyid={_id}>
            Delete
          </MenuItem>
        </Menu>
      </CardActions>
    </Card >
  );
}

export default StudyCard;
