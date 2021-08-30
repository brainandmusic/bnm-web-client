import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../../contexts/AuthContext";
import { cleanLocalStorage } from "../../configs/Helpers";
import UserService from "../../services/User";

import Layout from "../layout/Layout";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: "100%"
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}));

function cap(str) {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
}

function UserProfile() {
  const classes = useStyles();
  const { userId } = useParams();
  const user = useUser();
  const [role, setRole] = useState("participant");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRole() {
      let res = await UserService.getRole(localStorage.getItem("uid"));
      if (res.status === "OK") {
        setRole(res.result.role);
      } else if (res.status === "LOGIN_REQUIRED") {
        cleanLocalStorage();
        user.setIsLoggedIn(false);
      }
    }

    if (user.isLoggedIn) {
      getRole();
    }
  }, [user]);

  useEffect(() => {
    async function getUser() {
      let res = await UserService.getUser(userId);
      if (res.status === "OK") {
        setData(res.result);
        console.log(data);
      }
      setLoading(false);
    }

    if (role === "admin") {
      getUser();
    }
  }, [role, userId]);

  if (loading) {
    return (
      <Layout title="Loading ...">
        <div>Loading ...</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${cap(data.role)} Information - ${data.firstName} ${
        data.lastName
      }`}
    >
      <Paper className={classes.root}>
        <Box display="flex" p={1}>
          <Box flexGrow={1} p={1}>
            <Typography component="h1" variant="h2">
              {data.firstName} {data.lastName}
            </Typography>
            <Link href={`mailto:${data.email}`} display="block">
              {data.email}
            </Link>
            <Typography variant="caption">ID - {userId}</Typography>
          </Box>
          <Box p={1} alignSelf="flex-end">
            <Typography variant="h6" p={1}>
              {data.roles.map(role => cap(role)).join(", ")}
            </Typography>
          </Box>
        </Box>
        <Divider className={classes.divider} />
      </Paper>
    </Layout>
  );
}

export default UserProfile;
