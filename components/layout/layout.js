import Header from "./header";
import Footer from "./footer";

import Container from "@mui/material/Container";

import { useSession } from "next-auth/react";

import { roleConfig } from "lib/roleConfig";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  return (
    <>
      {session && <Header pages={roleConfig[session.user.role]} />}
      <Container maxWidth="xl" component="main" sx={{ mt: 3 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
