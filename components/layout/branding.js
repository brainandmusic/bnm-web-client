import Logo from "/public/usc-shield-name-black.png";
import Head from "next/head";
import Image from "next/Image";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Branding = () => {
  return (
    <>
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
    </>
  );
};

export default Branding;
