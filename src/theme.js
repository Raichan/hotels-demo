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
  shape: { borderRadius: 0 },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: "#f4f4f4",
        margin: "5px 0",
        padding: "10px",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 30,
      },
    },
    MuiMenuItem: {
      root: {
        height: "36px",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: "14px",
      },
    },
  },
  props: {
    MuiCard: {
      elevation: 0,
    },
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
