import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";

import Layout from "components/layout/layout";
import Loading from "components/loading";
import Table from "components/tabtable";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function useStudy(id) {
  const { data, error, mutate } = useSWR(
    id ? `/api/study/${id}` : null,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}

const PRESETS = {
  name: { field: "name", headerName: "Name", flex: 1 },
  email: { field: "email", headerName: "Email", flex: 1 },
  id: { field: "id", headerName: "ID", flex: 2 },
  role: { field: "role", headerName: "Role", flex: 1 },
  description: { field: "description", headerName: "Description", flex: 1 },
  actions: {
    field: "actions",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );
    },
  },
  date: {
    field: "date",
    headerName: "Date Created",
    type: "date",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
  },
};

const Study = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useStudy(id);
  console.log(data);

  if (data) {
    const { name, _id, description } = data;
    // parse data into mui readable format
    const tables = [
      {
        header: "Team members",
        columns: [
          PRESETS.name,
          PRESETS.role,
          PRESETS.email,
          PRESETS.id,
          {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
              return (
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    fetch(`/api/study/${_id}/members/${params.row.id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => mutate())
                  }
                >
                  <DeleteIcon />
                </IconButton>
              );
            },
          },
        ],
        rows: data.members.map((item) => {
          return {
            name: `${item.firstName} ${item.lastName}`,
            role: item.role,
            id: item._id,
            email: item.email,
          };
        }),
      },
      {
        header: "Participants",
        columns: [
          PRESETS.name,
          PRESETS.id,
          {
            field: "actions",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
              return (
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    fetch(`/api/study/${_id}/participants/${params.row.id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => mutate())
                  }
                >
                  <DeleteIcon />
                </IconButton>
              );
            },
          },
        ],
        rows: data.participants.map((item) => {
          return {
            name: `${item.firstName} ${item.lastName}`,
            id: item._id,
          };
        }),
      },
      {
        header: "Groups",
        columns: [
          PRESETS.name,
          PRESETS.description,
          PRESETS.date,
          PRESETS.id,
          PRESETS.actions,
        ],
        rows: data.groups.map((item) => {
          return {
            name: item.name,
            id: item._id,
            description: item.description,
            date: item.creationDate,
          };
        }),
      },
      {
        header: "Arm",
        columns: [PRESETS.name, PRESETS.id, PRESETS.actions],
        rows: data.arms.map((item) => {
          return {
            name: item.name,
            id: item._id,
          };
        }),
      },
    ];

    return (
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
        <Typography variant="caption" gutterBottom>
          ID - {_id}
        </Typography>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
        <Table data={tables} />
      </>
    );
  }
  return <Loading />;
};

export default Study;
