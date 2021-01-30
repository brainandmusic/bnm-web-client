import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    minWidth: 275,
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: 500
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

export default function DelModal({ open, handleClose, handleDelete, title, subtitle, description }) {
  const classes = useStyles();

  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="deletion confirmation"
      aria-describedby="click delete button to confirm the operation"
      className={classes.modal}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size="small" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}