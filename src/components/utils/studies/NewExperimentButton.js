import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExperimentService from '../../../services/Experiment';

const columns = [
  { field: 'id', headerName: 'ID', width: 230 },
  { field: 'name', headerName: 'Experiment name', width: 200 },
];

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& .MuiFormControl-root": {
      marginTop: theme.spacing(2),
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(0, 1),
    boxShadow: theme.shadows[5],
    width: "100%",
    // remove the blue border when modal is first opened
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
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
  },
  usertable: {
    height: 400,
    width: "100%",
    marginTop: theme.spacing(1),
  }
}));

function NewExperimentButton({ onAddExperiments }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [experiments, setExperiments] = useState([]);
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [expIds, setExpIds] = useState([]);

  useEffect(() => {
    ExperimentService.getExperimentCards({}, { _id: 1, name: 1 }).then(res => res.data).then(res => {
      if (res.status === "OK") {
        res.result = res.result.map(u => {
          u.id = u._id; // data grid requires id field
          return u;
        });
        setExperiments(res.result);
        setRows(res.result);
      }
    })
  }, []);

  useEffect(() => {
    var re = new RegExp(keyword, "i");
    setRows(experiments.filter(experiments => experiments._id.match(re) ||
      experiments.name.match(re)
    ))
  }, [keyword, experiments]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // close window
    setOpen(false);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSelectExpChange = (param) => {
    setExpIds(param.rowIds);
  }

  const handleAddExperiments = () => {
    const newExps = experiments.filter(experiment => expIds.includes(experiment._id));
    newExps.map(member => {
      delete member.id; // only keep _id field
      return member;
    })
    onAddExperiments(newExps);
    handleClose();
  }

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
        Experiment
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
                Add Experiment
              </Typography>
              <Divider />
              <Grid container spacing={1} className={classes.platforms}>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-secondary"
                    variant="outlined"
                    color="primary"
                    placeholder="Search for experiment ID, name ..."
                    value={keyword}
                    onChange={handleKeywordChange}
                    autoFocus
                  />
                  <div className={classes.usertable}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionChange={handleSelectExpChange} />
                  </div>
                </form>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={handleClose} className={classes.cancel}>Cancel</Button>
              <Button size="small" color="primary" onClick={handleAddExperiments}>Add</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default NewExperimentButton;
