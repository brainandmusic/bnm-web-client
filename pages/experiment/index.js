import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";
import CardList from "components/card/cardList";
import Button from "@mui/material/Button";

import useSWR from "swr";
import { fetcher } from "lib/fetcher";

function useExperiments(id) {
  const { data, error } = useSWR(
    id ? `/api/user/${id}/experiments` : null,
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
  const loading = status === "loading";
  const isUser = !!session?.user;
  const { data, isLoading } = useExperiments(session && session.user.id);
  console.log(data);

  return (
    <Layout activeNav="Experiments">
      {isUser && !isLoading ? (
        <>
          <Button variant="contained" sx={{ display: "block", ml: 2 }}>
            + Add Experiment
          </Button>
          <CardList data={data.data} path="experiment" />
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
