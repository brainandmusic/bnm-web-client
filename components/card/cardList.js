import * as React from "react";
import Box from "@mui/material/Box";

import CardView from "./cardView";

export default function CardList({ data }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
      }}
    >
      {data.map((item) => (
        <CardView
          key={item._id}
          name={item.name}
          description={item.description}
          id={item._id}
        />
      ))}
    </Box>
  );
}
