import { getProviders, getSession, signIn } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Branding from "components/layout/branding";

export default function SignIn({ providers }) {
  const emailEl = useRef(null);
  const passwordEl = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setEmail(emailEl.current.value);
    setPassword(passwordEl.current.value);
  });
  return (
    <Box sx={{ mt: 10 }}>
      <Branding />
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
      {/* This component is for email signIn, require extra styling to work with other providers */}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          required
          id="outlined-required"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          inputRef={emailEl}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          inputRef={passwordEl}
        />
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            signIn("credentials", {
              username: email,
              password: password,
              callbackUrl: `${process.env.NEXTAUTH_URL}/`,
            });
          }}
        >
          Sign In with Email
        </Button>
      </Box>
    </Box>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
