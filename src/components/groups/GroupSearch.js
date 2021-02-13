import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import DeleteModal from '../modals/DeleteModal';
import Layout from '../layout/Layout';
import NewGroupButton from './NewGroupButton';
import UserService from '../../services/User';
import GroupService from '../../services/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  filter: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  }
}))

function GroupSearch() {
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [groups, setGroups] = useState([]);
  const [delGroupId, setDelGroupId] = useState("");
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSev, setSnackSev] = useState("info");

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

  useEffect(() => {
    async function getGroups() {
      let res = await GroupService.getGroups();
      if (res.status === "OK") {
        setGroups(res.result);
      }
    }
    if (role === "admin") {
      getGroups();
    }
  }, [role]);

  const handleSnackClose = () => setSnackOpen(false);

  const handleGroupClick = (e) => {
    const tagName = e.target.tagName.toUpperCase();
    if (tagName === "PATH" || tagName === "SVG") {
      const button = e.target.closest("button");
      setDelGroupId(button.attributes.groupid.value);
      setDelModalOpen(true);
    }
  }

  const handleDelModalClose = () => setDelModalOpen(false);

  const handleDelModalConfirm = async () => {
    // close modal
    handleDelModalClose();
    // delete from server
    let res = await GroupService.deleteGroup(delGroupId);
    
    if (res.status === "OK") {
      // delete from local display list
      setGroups(oldGroups => {
        return oldGroups.filter(oldGroups => oldGroups._id !== delGroupId);
      })
      setSnackSev("info");
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleCreateGroup = async (name) => {
    const groupInfo = {
      name,
      creator: localStorage.getItem("uid")
    }
    // save new group info to database
    let res = await GroupService.createGroup(groupInfo);

    if (res.status === "OK") {
      // delete from local display list
      setGroups(oldGroups => {
        return [...oldGroups, res.result];
      })
      setSnackSev("info");
    }
    else {
      setSnackSev("error");
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
        role === "participant" ? (
          <div>Sorry you don't have permission to access this page.</div>
        ) : (
          <Grid container direction="column" className={classes.root}>
            <Grid item md="auto" className={classes.filter}>
              <NewGroupButton handleCreate={handleCreateGroup} />
            </Grid>
            <Grid item container direction="column" onClick={handleGroupClick}>
              {
                groups.map((group, index) => (
                  <Grid item key={`group_card_id_${index}`}>
                    <Card className={classes.card}>
                      <Grid container alignItems="center" justify="space-between">
                        <Hidden mdDown>
                          <Grid item>
                            <Typography>
                              {group._id}
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item>
                            <Typography>
                              {group.name}
                            </Typography>
                          </Grid>
                        <Grid item>
                          <IconButton groupid={group._id}>
                            <DeleteIcon color="secondary"/>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <DeleteModal open={delModalOpen} handleClose={handleDelModalClose} handleDelete={handleDelModalConfirm}/>
          </Grid>
        )
      }
      
    </Layout>
  );
}

export default GroupSearch;