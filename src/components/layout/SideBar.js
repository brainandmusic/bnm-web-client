import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useUser } from "../../contexts/AuthContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import CategoryIcon from "@material-ui/icons/Category";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import UserService from "../../services/User";
import { cleanLocalStorage } from "../../configs/Helpers";

const drawerWidth = 240;
const drawerWidthCollapsed = 60;
const menuArr = [
  {
    icon: <CategoryIcon />,
    text: "Studies",
    href: "/studies",
    permissions: ["admin"]
  },
  {
    icon: <AssignmentIcon />,
    text: "Experiments",
    href: "/experiments",
    permissions: ["participant", "ra", "admin"]
  },
  {
    icon: <PeopleIcon />,
    text: "Users",
    href: "/users",
    permissions: ["admin"]
  },
  {
    icon: <SettingsIcon />,
    text: "Settings",
    href: "/settings",
    permissions: ["participant", "ra", "admin"]
  }
];

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0
  },
  drawerExpand: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerCollapse: {
    width: drawerWidthCollapsed,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth
    }
  },
  hide: {
    display: "none",
    // show menu text when device is mobile
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  justifyContentSpaceBetween: {
    justifyContent: "space-between"
  },
  listItem: {
    minHeight: 48
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  toggleButton: {
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  zIndexAuto: {
    zIndex: "auto"
  }
}));

function SideBar({ variant, open, handleClose }) {
  const classes = useStyles();
  const user = useUser();
  const { path } = useRouteMatch();
  const [expand, setExpand] = useState(
    localStorage.getItem("sidebar_expand")
      ? JSON.parse(localStorage.getItem("sidebar_expand"))
      : true
  );
  const [role, setRole] = useState("participant");
  const [menu, setMenu] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function getUserName(uid) {
      const res = await UserService.getUser(uid);
      if (res.status === "LOGIN_REQUIRED") {
        cleanLocalStorage();
        user.setIsLoggedIn(false);
      } else if (res.status === "OK") {
        setFirstName(res.result.firstName);
        setLastName(res.result.lastName);
      }
    }

    const uid = localStorage.getItem("uid");

    if (!uid) {
      // uid should exist if user is loggedin
      cleanLocalStorage();
      user.setIsLoggedIn(false);
    } else {
      getUserName(uid);
    }
  }, [user]);

  // get user's role
  useEffect(() => {
    async function getRole(uid) {
      let res = await UserService.getRole(uid);

      if (res.status === "LOGIN_REQUIRED") {
        cleanLocalStorage();
        user.setIsLoggedIn(false);
      }

      if (res.status === "OK") {
        setRole(res.result.role);
      }
    }

    const uid = localStorage.getItem("uid");

    if (!uid) {
      cleanLocalStorage();
      user.setIsLoggedIn(false);
    }

    getRole(uid);
  }, [user]);

  // load side bar menu according to user's role
  useEffect(() => {
    const newMenu = menuArr.filter(menu => menu.permissions.includes(role));
    setMenu(newMenu);
  }, [role]);

  const handleToggle = () =>
    setExpand(old => {
      localStorage.setItem("sidebar_expand", !old);
      return !old;
    });

  const handleLogout = async () => {
    handleClose();
    await UserService.signout();
    cleanLocalStorage();
    user.setIsLoggedIn(false);
  };

  return (
    <Drawer
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerExpand]: expand,
        [classes.drawerCollapse]: !expand
      })}
      classes={{
        paper: clsx({
          [classes.drawerExpand]: expand,
          [classes.drawerCollapse]: !expand,
          [classes.zIndexAuto]: variant === "persistent"
        })
      }}
      onClose={handleClose}
      open={open === undefined ? true : open}
      variant={variant || "temporary"}
    >
      <div className={classes.toolbar}>
        <List className={classes.sectionMobile}>
          <ListItem className={classes.justifyContentSpaceBetween}>
            <Avatar
              src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${firstName}+${lastName}`}
            />
            <Button size="small" variant="outlined" onClick={handleLogout}>
              Exit
            </Button>
          </ListItem>
        </List>
      </div>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <Link
            underline="none"
            color="inherit"
            href={item.href}
            key={`sidebar_link_${index}_${item.text}`}
          >
            <ListItem
              button
              selected={path.toLowerCase().startsWith(item.href)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem className={classes.toggleButton}>
          <IconButton
            aria-label="toggle sidebar"
            color="inherit"
            onClick={handleToggle}
          >
            {expand ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideBar;
