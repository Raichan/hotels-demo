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
    MuiMenu: {
      list: {
        border: "1px solid #5bb326",
      },
    },
    MuiSelect: {
      icon: {
        color: green[500],
      },
      select: {
        "&:focus": {
          backgroundColor: "#e6fcd3",
        },
      },
    },
    MuiInput: {
      underline: {
        "&:hover": {
          "&:not(.Mui-disabled)": {
            "&:before": {
              borderBottom: "2px solid " + green[500],
            },
          },
        },
      },
    },
    MuiCheckbox: {
      root: {
        color: green[500],
      },
    },
    MuiListItem: {
      root: {
        height: "36px",
        "&$selected": {
          backgroundColor: "#d7f8bc",
          "&:hover": {
            backgroundColor: "#d7f8bc",
          },
          "&:active": {
            backgroundColor: "#5bb326",
            color: "#d7f8bc",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "#e6fcd3",
        },
        "&:active": {
          backgroundColor: "#5bb326",
          color: "#d7f8bc",
        },
      },
    },
    MuiInputBase: {
      input: {
        fontSize: "14px",
      },
    },
  },
  props: {
    MuiPaper: {
      elevation: 8,
    },
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
