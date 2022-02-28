import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;

  return (
    <Layout activeNav="Setting">
      {isUser ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {session.user.name}
          </Typography>
          <Typography variant="body" component="p">
            {session.user.email}
          </Typography>
          <Typography variant="caption" gutterBottom>
            ID - {session.user.id}
          </Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />

          <Typography variant="h2" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ "& .MuiTextField-root": { m: 1 } }}
          >
            <TextField
              id="old-password"
              label="Old Password"
              variant="standard"
              type="password"
              sx={{ display: "block" }}
            />
            <TextField
              id="new-password"
              label="New Password"
              variant="standard"
              type="password"
            />
            <TextField
              id="new-password-2"
              label="Re-enter New Password"
              variant="standard"
              type="password"
            />
            <Button variant="contained" sx={{ display: "block", m: 1, mt: 2 }}>
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
