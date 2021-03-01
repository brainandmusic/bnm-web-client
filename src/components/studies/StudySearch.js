import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import Layout from '../layout/Layout';
import UserService from '../../services/User';
import StudyService from '../../services/Study';
import StudyCard from './StudyCard';
import NewStudyButton from '../buttons/NewStudyButton';
import DeleteModal from '../modals/DeleteModal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  toolbox: {
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
  filter: {
    margin: theme.spacing(1),
  },
  button: {
    width: "100%",
    [theme.breakpoints.up('md')]: {
      width: "auto",
    },
  },
  formcontrol: {
    width: "100%",
  },
  studies: {
    marginTop: theme.spacing(2)
  },
  study: {
    margin: theme.spacing(1),
  }
}))

function StudySearch() {
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState("true");
  const [studies, setStudies] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSev, setSnackSev] = useState("info");
  const [delStudyId, setDelStudyId] = useState("");
  const [delStudyModalOpen, setDelStudyModalOpen] = useState(false);

  // get user role from server
  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status === "OK") {
        setRole(res.result.role);
      }
      else if (res.status === "LOGIN_REQUIRED") {
        cleanLocalStorage();
        user.setIsLoggedIn(false);
      }
    }

    if (user.isLoggedIn) {
      getRole();
    }
  }, [user]);

  // get studies from server
  useEffect(() => {
    async function getStudies() {
      let res = await StudyService.getStudies();
      if (res.status === "OK") {
        setStudies(res.result);
      }
      setLoading(false);
    }
    if (role === "admin" || role === "ra") {
      getStudies();
    }
    else {
      // user has no permission for this page
      setLoading(false);
    }
  }, [role]);

  const handleSnackClose = () => setSnackOpen(false);

  const handleStudyCreated = (res) => {
    if (res.status === "OK") {
      setStudies(old => [...old, res.result]);
      setSnackSev("success");
    }
    else {
      setSnackSev("danger");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleCardClick = (e) => {
    if (e.target.innerText === "Delete") {
      setDelStudyId(e.target.attributes.studyid.value);
      handleDelStudyModalOpen();
    }
  }

  const handleDelStudyModalOpen = () => setDelStudyModalOpen(true);
  const handleDelStudyModalClose = () => setDelStudyModalOpen(false);

  const handleDeleteStudy = async () => {
    // close modal if open
    handleDelStudyModalClose();
    let res = await StudyService.deleteStudy(delStudyId);
    if (res.status === "OK") {
      setStudies(old => old.filter(study => study._id !== delStudyId));
      setSnackSev("success");
    }
    else {
      setSnackSev("danger");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  return (
    <Layout
      title="Groups"
      snackbarOpen={snackOpen}
      handleSnackbarClose={handleSnackClose}
      snackbarMsg={snackMsg}
      snackbarSeverity={snackSev}>
      {
        loading && <div>Loading ...</div>
      }
      {
        !loading && (role === "participant") ? <div>You don't have access to this page.</div> :
          (
            <Grid container direction="column" className={classes.root}>
              <Grid item container className={classes.toolbox}>
                {/* <Grid item xs={12} md={2} lg={1} className={classes.filter}>
                  <FormControl className={classes.formcontrol}>
                    <InputLabel id="study-status-select-label">Status</InputLabel>
                    <Select
                      labelId="study-status-select-label"
                      id="study-status-select"
                      defaultValue="public"
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} md="auto" className={classes.filter}>
                  <NewStudyButton handleCreated={handleStudyCreated} />
                </Grid>
              </Grid>
              <Grid item container className={classes.studies} onClick={handleCardClick}>
                {
                  studies.map((study, index) => (
                    <Grid item xs={12} md={6} lg={2} key={index} className={classes.study}>
                      <StudyCard study={study} />
                    </Grid>
                  ))
                }
              </Grid>
              <DeleteModal
                p1="Are you sure you want to delete this study?"
                p2="This is an irrevocable operation."
                open={delStudyModalOpen}
                handleClose={handleDelStudyModalClose}
                handleDelete={handleDeleteStudy}
              />
            </Grid>
          )
      }
    </Layout >
  );
}

export default StudySearch;
