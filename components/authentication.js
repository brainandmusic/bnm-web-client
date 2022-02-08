import Logo from "/public/usc-shield-name-black.png";
import Head from "next/head";
import Image from "next/Image";
import { signIn, signOut } from "next-auth/react";

import { Typography, Box, Button } from "@mui/material";
import Link from "/src/link";

const Auth = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=optional"
          rel="stylesheet"
        />
      </Head>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Nanum Brush Script, cursive" }}
      >
        Creative Minds Lab
      </Typography>
      <Typography variant="h3" align="center" gutterBottom>
        @ <Image src={Logo} alt="USC" />
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            href={`/api/auth/signup`}
          >
            Sign up
          </Button>
        </Box>
        <Box p={1}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={`/api/auth/signin`}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Auth;
