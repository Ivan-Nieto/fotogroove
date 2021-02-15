import { createMuiTheme } from "@material-ui/core/styles";

export const customTheme = createMuiTheme({
  palette: {
    grey: {
      "100": "#25282b",
      "200": "#353739",
      "400": "#888888",
    },
    common: {
      black: "#161616",
      white: "#E8E8E8",
    },
    primary: {
      light: "#EAEAEA",
      main: "#E8E8E8",
      dark: "#CDCDCD",
    },
    secondary: {
      light: "#0066ff",
      main: "#E8E8E8",
      dark: "#E8E8E8",
      contrastText: "#fff",
    },
    error: {
      light: "#FCD0D0",
      main: "#f24545",
      dark: "#f24545",
    },
    success: {
      light: "#DDF9F5",
      main: "#4CBFAC",
      dark: "#0C6761",
    },
    warning: {
      light: "#FFF1E2",
      main: "#FE8A13",
      dark: "#6B410C",
    },
    info: {
      light: "#DDF7FF",
      main: "#2BC4F3",
      dark: "#0C3F67",
    },
    contrastThreshold: 3,
  },
  typography: {
    fontFamily: "Open Sans",
  },
  overrides: {
    // Style sheet name
    MuiButton: {
      text: {
        color: "#E8E8E8",
      },
    },
    MuiTypography: {
      h1: {
        color: "#E8E8E8",
      },
      h2: {
        color: "#E8E8E8",
      },
      h3: {
        color: "#E8E8E8",
      },
      h4: {
        color: "#E8E8E8",
        fontWeight: 600,
      },
      h5: {
        color: "#E8E8E8",
      },
      h6: {
        color: "#E8E8E8",
      },
      body1: {
        color: "#E8E8E8",
      },
      body2: {
        color: "#E8E8E8",
      },
      caption: {
        color: "#fff",
      },
      button: {
        color: "#00ff00",
      },
    },
    MuiInputAdornment: {
      root: {},
    },
    MuiFormLabel: {
      root: {
        WebkitTextFillColor: "#E8E8E8",
      },
    },
    MuiInputBase: {
      root: {
        // border: "0.5px solid #fff",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#25282b",
      },
    },
  },
});

export default customTheme;
