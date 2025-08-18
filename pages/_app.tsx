import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#0a0a0a" : "#ffffff",
            paper: mode === "dark" ? "#1a1a1a" : "#ffffff",
          },
          primary: {
            main: mode === "dark" ? "#7c4dff" : "#1976d2",
            dark: mode === "dark" ? "#6c3fff" : "#1565c0",
            light: mode === "dark" ? "#9e7fff" : "#42a5f5",
          },
          text: {
            primary:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.87)"
                : "rgba(0, 0, 0, 0.87)",
            secondary:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(0, 0, 0, 0.6)",
          },
          divider:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.12)",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                transition: "all 0.3s ease",
                ...(mode === "dark" && {
                  "&.MuiChip-outlined": {
                    borderColor: "rgba(255, 255, 255, 0.23)",
                    color: "rgba(255, 255, 255, 0.87)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                  },
                  "&.MuiChip-filled": {
                    background:
                      mode === "dark"
                        ? "linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)"
                        : "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)",
                    color: mode === "dark" ? "#667eea" : "#764ba2",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor:
                      mode === "dark"
                        ? "rgba(102, 126, 234, 0.3)"
                        : "rgba(118, 75, 162, 0.3)",
                    "&:hover": {
                      background:
                        mode === "dark"
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.35) 0%, rgba(118, 75, 162, 0.35) 100%)"
                          : "linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)",
                    },
                  },
                }),
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: "all 0.3s ease",
                ...(mode === "dark" && {
                  backgroundImage: "none",
                  backgroundColor: "#1a1a1a",
                }),
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: "all 0.3s ease",
                ...(mode === "dark" && {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }),
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}
