import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#b3cde3",
    },
    secondary: {
      main: "#decbe4",
    },
    error: {
      main: "#fbb4ae",
    },
    warning: {
      main: "#fed96a",
    },
    success: {
      main: "#b3e2cd",
    },
  },
});

export default theme;
