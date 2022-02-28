import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Layout from "components/layout/layout";
import Loading from "components/loading";

import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "lib/fetcher";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

const ROLES = ["", "admin", "ra", "participant"];

const SelectParticipant = ({ id, defaultRole }) => {
  const [value, setValue] = useState(defaultRole);
  const { mutate } = useSWRConfig();

  const handleChange = async (e) => {
    const res = await fetch(`/api/user/${id}/role`, {
      method: "POST",
      body: e.target.value,
    });
    if (res.status == 200) {
      setValue(e.target.value);
      mutate("/api/users");
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          id={`${id}-select`}
          value={value}
          displayEmpty
          onChange={handleChange}
        >
          {ROLES.map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const columns = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    renderCell: (params) => (
      <SelectParticipant id={params.id} defaultRole={params.value} />
    ),
  },
];

function useUsers(id) {
  const { data, error } = useSWR(id ? `/api/users` : null, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

const ControlledTable = ({ data }) => {
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{ "& >:focus": { outline: "none" } }}
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;
  const { data, isLoading } = useUsers(session && session.user.id);

  return (
    <Layout activeNav="Users">
      {isUser && !isLoading ? (
        <ControlledTable
          data={data.data.map((item) => {
            return {
              id: item._id,
              name: `${item.firstName} ${item.lastName}`,
              role: item.role,
              email: item.email,
            };
          })}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
