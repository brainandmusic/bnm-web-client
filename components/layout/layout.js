import Header from "./header";
import Footer from "./footer";

import Container from "@mui/material/Container";

import { useSession } from "next-auth/react";

export default function Layout({ activeNav = "", children }) {
  const { data: session, status } = useSession();
  const roleConfig = {
    admin: ["Studies", "Experiments", "Users", "Setting"],
    ra: ["Studies", "Experiments", "Setting"],
    participants: ["Dashboard", "Setting"],
    default: [],
  };

  return (
    <>
      <Header
        pages={session && roleConfig[session.user.role]}
        activeNav={activeNav}
      />
      <Container maxWidth="xl" component="main" sx={{ mt: 2 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
