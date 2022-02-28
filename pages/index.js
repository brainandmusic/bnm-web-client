import { useSession } from "next-auth/react";
import Layout from "components/layout/layout";
import Loading from "components/loading";

export default function Page() {
  return (
    <Layout>
      <Loading />
    </Layout>
  );
}
