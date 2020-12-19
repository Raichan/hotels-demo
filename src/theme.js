import { green, indigo } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: indigo,
  },
  typography: {
    fontFamily: "Helvetica",
  },
  shape: {},
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#f4f4f4",
        margin: "5px 0",
        padding: "10px",
      },
    },
    MuiCardContent: {
      root: {
        padding: "0 0 0 10px",
        "&:last-child": {
          paddingBottom: 0,
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 30,
      },
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary",
    },
    MuiInputLabel: {
      shrink: true,
    },
  },
});

export default theme;
