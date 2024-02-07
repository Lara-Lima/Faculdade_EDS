import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme(
  {
    palette: {
      primary: {
        light: "#9FA8DA",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#FFD149",
        main: "#e9ba14",
        dark: "#F57C00",
        contrastText: "#000",
      },
      success: {
        light: "#A5D6A7",
        main: "#4CAF50",
        dark: "#388E3C",
        contrastText: "#fff",
      },
      info: {
        light: "#81D4FA",
        main: "#29B6F6",
        dark: "#1976D2",
        contrastText: "#fff",
      },
      warning: {
        light: "#FFD149",
        main: "#FF5722",
        dark: "#E64A19",
        contrastText: "#fff",
      },
      mode: "light",
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
      subtitle1: {
        fontSize: 12,
        padding: 0,
      },
      h6: {
        fontSize: 14,
        padding: 0,
      },
      h2: {
        fontSize: 26,
        fontWeight: 500,
        padding: 0,
      },
      h3: {
        fontSize: 22,
        fontWeight: 500,
        padding: 0,
      },
      h4: {
        fontSize: 20,
        padding: 0,
      },
      h5: {
        fontSize: 16,
        padding: 0,
      },
      caption: {
        fontWeight: 300,
        fontSize: 16,
        fontStyle: "italic",
      },
      button: {},
    },

    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "info" && {
              backgroundColor: "#60a5fa",
            }),
          }),
        },
      },
    },
  },
  ptBR
);

export default theme;
