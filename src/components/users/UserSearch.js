import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { useUser } from '../../contexts/AuthContext';
import { cleanLocalStorage } from '../../configs/Helpers';
import Layout from '../layout/Layout';
import UserService from '../../services/User';

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
    flexGrow: 0,
    flexShrink: 1,
  }
}))

function UserSearch() {
  const classes = useStyles();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [rows, setRows] = useState([]); // data used in display
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
        setRows(res.result);
      }
    }

    if (role === "admin") {
      getUsers();
    }
  }, [role]);

  const handleSnackClose = () => setSnackOpen(false);

  const handleMenuClick = async (e) => {
    let selectedUser;
    let newRole;
    const tagName = e.target.tagName.toUpperCase();
    if (tagName === "PATH" || tagName === "SVG") {
      const button = e.target.closest("button");
      selectedUser = button.attributes.groupid.value;
      newRole = button.attributes.rolename.value;
    }
    else if (tagName === "BUTTON") {
      selectedUser = e.target.attributes.groupid.value;
      newRole = e.target.attributes.rolename.value;
    }

    let res = await UserService.setRole(selectedUser, newRole);
    if (res.status === "OK") {
      // update local list
      setUsers(old => {
        old.forEach(user => {
          if (user._id === selectedUser) {
            user.role = newRole;
          }
        });
        return old;
      });
      setRows(old => {
        old.forEach(user => {
          if (user._id === selectedUser) {
            user.role = newRole;
          }
        });
        return old;
      });
    }
    else {
      setSnackSev("error");
    }
    setSnackMsg(res.message);
    setSnackOpen(true);
  }

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    var re = new RegExp(keyword, "i");
    setRows(users.filter(user => user._id.match(re) ||
      (user.firstName + " " + user.lastName).match(re) ||
      user.email.match(re)
    ))
  }, [keyword, users]);

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
              <TextField
                id="outlined-secondary"
                variant="outlined"
                color="primary"
                placeholder="Search for user ID, name, email ..."
                value={keyword}
                autoFocus
                fullWidth
                onChange={handleKeywordChange}
              />
            </Grid>
            <Grid item container direction="column" onClick={handleMenuClick}>
              {
                rows.map((user, index) => (
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
                          <Grid item lg={2}>
                            <Typography>
                              <Link href={`mailto: ${user.email}`} color="inherit" underline="none">
                              {user.email}
                              </Link>
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Hidden mdDown>
                          <Grid item lg={1}>
                            <Typography>
                              {user.role}
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item className={classes.optWrapper}>
                          {
                            role === "admin" && (user.role === "ra" || user.role === "admin") ? (
                              <Tooltip title="Set as participant" aria-label="set as participant">
                                <IconButton groupid={user._id} rolename="participant">
                                  <VerticalAlignBottomIcon />
                                </IconButton>
                              </Tooltip>
                            ): null
                          }
                          {
                            role === "admin" && (user.role === "participant" || user.role === "admin") ? (
                              <Tooltip title="Set as RA" aria-label="set as ra">
                                <IconButton groupid={user._id} rolename="ra">
                                  {
                                    user.role === "admin" ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
                                  }
                                </IconButton>
                              </Tooltip>
                            ): null
                          }
                          {
                            role === "admin" && (user.role === "participant" || user.role === "ra") ? (
                              <Tooltip title="Set as admin" aria-label="set as admin">
                                <IconButton groupid={user._id} rolename="admin">
                                  <VerticalAlignTopIcon/>
                                </IconButton>
                              </Tooltip>
                            ): null
                          }
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        )
      }
      
    </Layout>
  );
}

export default UserSearch;
