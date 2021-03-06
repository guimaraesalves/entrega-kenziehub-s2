import Routes from "./routes/router";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "#403CAA",
    },
    secondary: {
      main: "#403CAA",
    },
    grey: {
      0: "#F5F5F5",
      50: "#999999",
      100: "#333333",
    },
  },
  typography: {
    fontFamily: "inter",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: "32px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "28px",
    },
    h3: {
      fontWeight: 700,
      fontSize: "22px",
    },
    h4: {
      fontWeight: 700,
      fontSize: "18px",
    },
    body1: {
      fontSize: "14px",
    },
    caption: {
      fontSize: "12px",
    },
    button: {
      fontSize: "20px",
      textTransform: "capitalize",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
};

