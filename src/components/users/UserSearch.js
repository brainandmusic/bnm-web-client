import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import UsersModalButton from '../buttons/UsersModalButton';
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
  },
  optWrapper: {
    textAlign: "center",
  }
}))

function UserSearch() {
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [users, setUsers] = useState([]);
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
    async function getUsers() {
      let res = await UserService.getUsers();
      if (res.status === "OK") {
        setUsers(res.result);
      }
    }

    if (role === "admin") {
      getUsers();
    }
  }, [role]);

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
    // let res = await GroupService.deleteMemberFromGroup(groupId, delMemberId);
    
    // if (res.status === "OK") {
    //   // delete from local display list
    //   setMembers(oldMems => {
    //     return oldMems.filter(oldMem => oldMem._id !== delMemberId);
    //   });

    //   setGroup(old => {
    //     old.members = old.members.filter(m => m._id !== delMemberId);
    //     return old;
    //   });

    //   setSnackSev("info");
    // }
    // else {
    //   setSnackSev("error");
    // }
    // setSnackMsg(res.message);
    setSnackOpen(true);
  }

  // const handleAddMembersToGroup = async (newMembers) => {
  //   const memberIds = newMembers.map(mem => mem._id);

  //   let res = await GroupService.addMembersToGroup(groupId,memberIds);
  //   if (res.status === "OK") {
  //     setMembers(old => {
  //       newMembers.forEach(mem => {
  //         // deduplicate
  //         const idx = old.findIndex(user => user._id === mem._id);
  //         if (idx < 0) {
  //           old.push(mem);
  //         }
  //       });
  //       return old;
  //     });

  //     setGroup(old => {
  //       newMembers.forEach(mem => {
  //         // deduplicate
  //         const idx = old.members.findIndex(user => user._id === mem._id);
  //         if (idx < 0) {
  //           old.members.push(mem);
  //         }
  //       });
  //       return old;
  //     });

  //     setSnackSev("info");
  //   }
  //   else {
  //     setSnackSev("error");
  //   }
  //   setSnackMsg(res.message);
  //   setSnackOpen(true);
  // }

  return (
    <Layout
      title="Users"
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
              <div>search box goes here</div>
            </Grid>
            <Grid item container direction="column" onClick={handleMemberClick}>
              {
                users.map((user, index) => (
                  <Grid item key={`user_card_id_${user._id}`}>
                    <Card className={classes.card}>
                      <Grid container alignItems="center" justify="space-between">
                        <Hidden mdDown>
                          <Grid item lg={3}>
                            <Typography>
                              <Link href={`/users/${user._id}`} color="inherit" underline="none">
                              {user._id}
                              </Link>
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item lg={3}>
                          <Typography>
                            <Link href={`/users/${user._id}`} color="inherit" underline="none">
                            {`${user.firstName} ${user.lastName}`}
                            </Link>
                          </Typography>
                        </Grid>
                        <Hidden mdDown>
                          <Grid item lg={3}>
                            <Typography>
                              <Link href={`mailto: ${user.email}`} color="inherit" underline="none">
                              {user.email}
                              </Link>
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Hidden mdDown>
                          <Grid item lg={2}>
                            <Typography>
                              {user.role}
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item lg={1} className={classes.optWrapper}>
                          <IconButton groupid={user._id}>
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

export default UserSearch;
