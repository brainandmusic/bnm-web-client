import { NextLinkComposed } from "src/Link";
import Image from "next/Image";
import { useRouter } from "next/router";

import { signIn, signOut, useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import favicon from "public/favicon_white.ico";

const parseRoute = (pathname) =>
  pathname.indexOf("/", 1) == -1
    ? pathname
    : pathname.substring(0, pathname.indexOf("/", 1));

export default function Header({ pages = [] }) {
  // for touch screen users
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { pathname } = useRouter();
  const [activeNav, setActiveNav] = useState(parseRoute(pathname));

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const styles = {
    mobile: { xs: "flex", md: "none" },
    desktop: { xs: "none", md: "flex" },
  };

  useEffect(() => {
    setActiveNav(parseRoute(pathname));
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 2, display: styles.desktop }}>
            <Image
              src={favicon}
              alt="Creative Minds Lab"
              width={50}
              height={50}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: styles.desktop }}>
            <TabContext value={activeNav}>
              <TabList
                aria-label="nav tabs"
                textColor="inherit"
                TabIndicatorProps={{
                  style: {
                    background: "white",
                  },
                }}
              >
                {pages.map((page) => (
                  <Tab
                    to={page.route}
                    key={page.route}
                    component={NextLinkComposed}
                    label={page.name}
                    value={page.route}
                  />
                ))}
              </TabList>
            </TabContext>
          </Box>

          {/* for mobile */}
          <Box sx={{ display: styles.mobile }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: styles.mobile,
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.route}
                  to={page.route}
                  component={NextLinkComposed}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: styles.mobile }}
          >
            CML
          </Typography>

          {/* end for mobile */}
          <Button
            color="inherit"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
