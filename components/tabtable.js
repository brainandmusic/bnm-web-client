import { DataGrid } from "@mui/x-data-grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}
export default function Table({ data }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs"
          variant="fullWidth"
        >
          {data.map((table, i) => (
            <Tab label={table.header} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </Box>
      {data.map((table, i) => (
        <TabPanel value={value} index={i} key={i}>
          <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  {...table}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  sx={{ "& >:focus": { outline: "none" } }}
                />
              </div>
            </div>
          </div>
        </TabPanel>
      ))}
    </>
  );
}
