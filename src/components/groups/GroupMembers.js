import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
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

function GroupMembers() {
  const classes = useStyles();
  const user = useUser();
  const { groupId } = useParams();
  const [role, setRole] = useState("participant");
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [delMemberId, setDelMemberId] = useState("");
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
    async function getGroup(gid) {
      let res = await GroupService.getGroup(gid);
      if (res.status === "OK") {
        setGroup(res.result);
      }
    }
    if (role === "admin") {
      getGroup(groupId);
    }
  }, [role, groupId]);

  useEffect(()=> {
    if (group && group.members) {
      setMembers([]); // clear current members array
      Promise.all(group.members.map(async (member) => {
        let res = await UserService.getUser(member);
        if (res.status === "OK") {
          setMembers(oldMem => [...oldMem, res.result])
        }
      }))
    }
  }, [group, group.members]);

  const handleSnackClose = () => setSnackOpen(false);

  const handleMemberClick = (e) => {
    const tagName = e.target.tagName.toUpperCase();
    if (tagName === "PATH" || tagName === "SVG") {
      const button = e.target.closest("button");
      setDelMemberId(button.attributes.groupid.value);
      setDelModalOpen(true);
    }
  }

  const handleDelModalClose = () => setDelModalOpen(false);

  const handleDelModalConfirm = async () => {
    // close modal
    handleDelModalClose();
    // remove member from group
    let res = await GroupService.deleteMemberFromGroup(groupId, delMemberId);
    
    if (res.status === "OK") {
      // delete from local display list
      setMembers(oldMems => {
        return oldMems.filter(oldMem => oldMem._id !== delMemberId);
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
    // const groupInfo = {
    //   name,
    //   creator: localStorage.getItem("uid")
    // }
    // // save new group info to database
    // // TODO: add new member
    // let res = await GroupService.createGroup(groupInfo);

    // if (res.status === "OK") {
    //   // delete from local display list
    //   setGroups(oldGroups => {
    //     return [...oldGroups, res.result];
    //   })
    //   setSnackSev("info");
    // }
    // else {
    //   setSnackSev("error");
    // }
    // setSnackMsg(res.message);
    setSnackOpen(true);
  }

  return (
    <Layout
      title={group.name}
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
            <Grid item container direction="column" onClick={handleMemberClick}>
              {
                members.map((member, index) => (
                  <Grid item key={`group_member_card_id_${index}`}>
                    <Card className={classes.card}>
                      <Grid container alignItems="center" justify="space-between">
                        <Hidden mdDown>
                          <Grid item>
                            <Typography>
                              <Link href={`/users/${member._id}`} color="inherit" underline="none">
                              {member._id}
                              </Link>
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <Typography>
                            <Link href={`/users/${member._id}`} color="inherit" underline="none">
                            {`${member.firstName} ${member.lastName}`}
                            </Link>
                          </Typography>
                        </Grid>
                        <Hidden mdDown>
                          <Grid item>
                            <Typography>
                              <Link href={`/user/${member._id}`} color="inherit" underline="none">
                              {member.email}
                              </Link>
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <IconButton groupid={member._id}>
                            <DeleteIcon color="secondary"/>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <DeleteModal
              open={delModalOpen}
              handleClose={handleDelModalClose}
              handleDelete={handleDelModalConfirm}
              p1="Are you sure that you want to remove this user from group?"
            />
          </Grid>
        )
      }
      
    </Layout>
  );
}

export default GroupMembers;
