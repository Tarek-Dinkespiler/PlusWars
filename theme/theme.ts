import { createTheme } from "@mui/material/styles";

const BLUE_DARK = "#1F2549"; // bleu foncé navbar / footer
const BLUE_LIGHT = "#56C5F2"; // bleu clair logo / liens
const RED_CTA = "#DC3161"; // rouge CTA

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: BLUE_LIGHT, // liens, éléments interactifs
    },
    secondary: {
      main: BLUE_DARK, // navbar / footer
    },
    error: {
      main: RED_CTA, // CTA "Réserver"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#1f2937",
    },
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h6: {
      fontWeight: 700,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: BLUE_DARK,
          color: "#ffffff",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: BLUE_LIGHT,
          textDecorationColor: BLUE_LIGHT,
        },
      },
    },
  },
});

export default theme;
