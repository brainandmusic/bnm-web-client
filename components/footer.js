import Link from "next/link";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Typography align="center" mt={5} component="p" variant="caption">
        Copyright &copy; Creative Minds Lab 2020-{new Date().getFullYear()}
      </Typography>
    </footer>
  );
}
