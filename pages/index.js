import Layout from "components/layout";
import { useSession } from "next-auth/react";
import Auth from "components/authentication";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(status);

  return <Layout>{status === "unauthenticated" && <Auth />}</Layout>;
}
