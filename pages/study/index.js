import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";
import CardList from "components/card/cardList";
import Dialog from "components/dialog/dialog";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useSWR from "swr";
import { fetcher } from "lib/fetcher";

function useStudies(id) {
  const { data, error, mutate } = useSWR(
    id ? `/api/user/${id}/studies` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;
  const { data, isLoading, mutate } = useStudies(session && session.user.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <>
      {isUser && !isLoading ? (
        <>
          <Dialog
            buttonText={"+ New Study"}
            buttonSx={{ display: "block", ml: 2 }}
            title={"New Study"}
            content={
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Study name"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            }
            submit={() =>
              fetch(`/api/study/`, {
                method: "POST",
                body: JSON.stringify({
                  name: name,
                  description: description,
                  creator: session.user.id,
                }),
              })
                .then((response) => response.json())
                .then((data) => mutate())
            }
          />
          <CardList data={data.data} path="study" />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
