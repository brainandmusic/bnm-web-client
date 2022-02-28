import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";
import CardList from "components/card/cardList";

import useSWR from "swr";
import { fetcher } from "lib/fetcher";

function useStudies(id) {
  const { data, error } = useSWR(
    id ? `/api/user?uid=${id}&q=studies` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Page() {
  const { data: session, status } = useSession();
  const [activeNav, setActiveNav] = useState("Settings");
  const loading = status === "loading";
  const isUser = !!session?.user;
  const { data, isLoading } = useStudies(session && session.user.id);

  if (isUser) {
    return <Layout>{data && <CardList data={data.data} />}</Layout>;
  }
  return <Loading />;
}
