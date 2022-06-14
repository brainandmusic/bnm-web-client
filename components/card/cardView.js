import * as React from "react";
import { useSWRConfig } from "swr";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import Link from "src/Link";

const MAX_LENGTH = 100;

export default function CardView({ name, description, id, path }) {
  const { mutate } = useSWRConfig();
  const [display, setDisplay] = React.useState("block");
  return (
    <Card sx={{ width: 250, m: 2, display: display }}>
      <CardActionArea
        component={Link}
        href={`/${path}/${encodeURIComponent(id)}`}
      >
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, MAX_LENGTH)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <IconButton
          aria-label="delete"
          onClick={() =>
            fetch(`/api/${path}/${id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                mutate(`/api/user/`);
                setDisplay("none");
              })
          }
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
