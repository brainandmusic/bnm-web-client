import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import Layout from '../layout/Layout';
import UsersModalButton from '../buttons/UsersModalButton';
import UserTable from '../tables/UserTable';
import GroupService from '../../services/Group';
import StudyService from '../../services/Study';
import UserService from '../../services/User';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

function Group() {
  const { studyId, groupId } = useParams();
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState({});
  const [study, setStudy] = useState({});
  const [participants, setParticipants] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");

  const handleSnackClose = () => setSnackOpen(false);

  const handleDeleteGroupMember = async (uid) => {
    let res = await GroupService.deleteMemberFromGroup(groupId, uid);
    if (res.status === "OK") {
      setSnackSev("success");
      // remove group member from local display list
      setGroup(old => {
        old.members = old.members.filter(id => id !== uid);
        return old;
      })
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  // get user role from server
  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status === "OK") {
        setRole(res.result.role);
        // user has no permission for this page
        if (res.result.role === "participant") {
          setLoading(false);
        }
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

  // get group from server
  useEffect(() => {
    async function getGroup(gid) {
      let res = await GroupService.getGroup(gid);
      if (res.status === "OK") {
        setGroup(res.result);
      }
    }

    async function getStudy(sid) {
      let res = await StudyService.getStudy(sid);
      if (res.status === "OK") {
        setStudy(res.result);
        setParticipants(res.result.participants);
      }
    }

    if (role === "admin" || role === "ra") {
      setLoading(true);
      getGroup(groupId);
      getStudy(studyId);
      setLoading(false);
    }
  }, [role, groupId, studyId]);

  const handleAddGroupMembers = async (uids) => {
    let res = await GroupService.addMembersToGroup(groupId, uids);
    if (res.status === "OK") {
      setSnackSev("success");
      // add group members to local display list
      setGroup(old => {
        uids.forEach(uid => {
          if (!old.members.includes(uid)) {
            old.members = [...old.members, uid];
          }
        });
        return old;
      })
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  if (loading) {
    return (
      <Layout title="Loading ...">
        <div>Loading ...</div>
      </Layout>
    );
  }
  if (role === "participant" || !study || !study.members ||
    (localStorage.getItem("uid") !== study.creator &&
      !study.members.includes(localStorage.getItem("uid")))) {
    return (
      <Layout title="Access Denied">
        <div>You don't have access to this page</div>
      </Layout>
    );
  }
  return (
    <Layout
      title={`Group - ${group.name}`}
    >
      <Paper className={classes.root}>
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Group Name
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          {group.name}
        </Typography>
        <Divider className={classes.divider} />
        <Typography component="h1" variant="subtitle1" gutterBottom>
          Group Description
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          {group.description || "N/A"}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container direction="column">
          <Grid item xs={12} md="auto">
            <UsersModalButton
              buttonLabel="Group Member"
              modalTitle="Add Group Member"
              submitBtnLabel="Add"
              Ids={participants}
              onSubmit={handleAddGroupMembers}
            />
          </Grid>
          <Grid item container direction="column">
            <UserTable
              Ids={group.members}
              email={false}
              delModP1="Are you sure that you want to remove this group member?"
              handleDelete={handleDeleteGroupMember}
              snackOpen={snackOpen}
              snackSev={snackSev}
              snackMsg={snackMsg}
              handleSnackClose={handleSnackClose}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
}

export default Group;
