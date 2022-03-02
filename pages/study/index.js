import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";
import CardList from "components/card/cardList";
import Button from "@mui/material/Button";

import useSWR from "swr";
import { fetcher } from "lib/fetcher";

function useStudies(id) {
  const { data, error } = useSWR(
    id ? `/api/user/${id}/studies` : null,
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
  const { data, isLoading } = useStudies(session && session.user.id);
  console.log(data);

  return (
    <>
      {isUser && !isLoading ? (
        <>
          <Button variant="contained" sx={{ display: "block", ml: 2 }}>
            + Add Study
          </Button>
          <CardList data={data.data} path="study" />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
