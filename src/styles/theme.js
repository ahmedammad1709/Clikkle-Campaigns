import { createTheme } from "@mui/material";
import React, {
  useMemo,
  useContext,
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getCookie, setCookie } from "../utilities/cookies";
import { amber } from "@mui/material/colors";

const ThemeContext = createContext({ toggleTheme: () => {} });

const ThemeContextProvider = (props) => {
  const preferTheme = systemPreferTheme();
  const [mode, setMode] = useState("dark");

  function toggleTheme() {
    setMode((prevMode) => {
      const theme = prevMode === "light" ? "dark" : "light";
      setCookie("P13N", theme);
      return theme;
    });
  }


    function systemPreferTheme() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
        else return 'dark';
    }

    useLayoutEffect(() => {

        const theme = getCookie('P13N');

        console.log('theme' , theme);
        if (theme) setMode(theme || preferTheme);
    }, [mode, preferTheme]);


  const light = useMemo(
    () => ({
      background: {
        paper: "#FFFFFF",
        default: "#FFFFFF",
      },
      divider: "#e7e3e3",
      custom: {
        search: {
          main: "#edf2fc",
          focus: "white",
        },
        border: "#e7e3e3",
        hoverColor: "#45B5E8",
        common: "white",
        color: "rgba(0, 0, 0, 0.87)",
        appsHover: "rgb(232, 240, 254)",
        menu: "#FFFFFF",
        cardHover: "#E1E5EA",
        trashCaption: "#E3E3E3",
        selectedCard: "#c2e7ff",
        selectedMove: "#c2e7ff",
        selectedPanel: "#f2f6fc",
        response: "#2f2e2e",
        selectedHover: "#B3D7EF",
        shareHover: "rgb(140 140 140 / 15%)",
        uploadButton: "#FFF",
        uploadButtonHover: "#EDF2FA",
      },
    }),
    []
  );

  const dark = useMemo(
    () => ({
      background: {
        paper: "#141414",
        default: "#141414",
      },
      text: {
        secondary: "#818991",
      },
      divider: "#424242",
      custom: {
        search: {
          main: "#1A1A1A",
          focus: "#2F2F2F",
        },
        border: "#616161",
        hoverColor: "#fff",
        common: "black",
        appsHover: "rgb(39, 46, 58)",
        menu: "#141414",
        cardHover: "#2F2F2F",
        trashCaption: "#2f2e2e",
        selectedCard: "#2f2e2e",
        selectedPanel: "#2f2e2e",
        selectedMove: "#44b5e899",
        response: "white",
        selectedHover: "rgba(255, 255, 255, 0.08)",
        shareHover: "rgba(255, 255, 255, 0.08)",
        uploadButton: "#2F2F2F",
        uploadButtonHover: "#141414",
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // main: '#2F2F2F',
            main: "#3B84D9",
          },
          secondary: {
            main: amber[600],
          },
          text: {
            primary: "#2C4069",
            secondary: "#6E798D",
          },

          ...(mode === "light" ? light : dark),
        },
        breakpoints: {
          keys: ["xs", "sm", "md", "xm", "lg", "xl", "xxl"],
          values: {
            xs: 0,
            sm: 576,
            md: 768,
            xm: 1024,
            lg: 1280,
            xl: 1516,
            xxl: 1756,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => ({
              body: {
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "transparent",
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: theme.palette.divider,
                  // backgroundColor: 'red',
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                    backgroundColor: "#747775",
                  },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                    backgroundColor: "#747775",
                  },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                    backgroundColor: "#747775",
                  },
              },
            }),
          },

          MuiDivider: {
            styleOverrides: {
              light: {
                borderColor: "#424242",
                width: "100%",
              },
            },
          },
          MuiListItemButton: {
            variants: [
              {
                props: { variant: "sidebarButton" },
                style: ({ theme }) => ({
                  padding: "2px 12px",
                  cursor: "pointer",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-selected": {
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "8px",
                    ".MuiListItemIcon-root": {
                      color: "white",
                    },
                    ".MuiListItemText-root": {
                      color: "white",
                    },
                    ".MuiSvgIcon-root": {
                      color: "white",
                    },
                  },
                }),
              },
              {
                props: { variant: "sidebarDropDown" },
                style: ({ theme }) => ({
                  padding: "2px 0px 2px 12px",
                  cursor: "pointer",
                  color: theme.palette.text.secondary,

                  "&:hover": {
                    backgroundColor: "transparent",
                  },

                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    ".MuiListItemIcon-root": {
                      color: theme.palette.primary.main,
                    },
                    ".MuiListItemText-root": {
                      color: theme.palette.primary.main,
                    },
                    ".MuiSvgIcon-root": {
                      color: theme.palette.primary.main,
                    },
                  },
                }),
              },
            ],
          },
          MuiButton: {
            variants: [
              {
                props: { variant: "contained" },
                style: ({ theme }) => ({ color: theme.palette.common.white }),
              },
            ],
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                marginBottom: "16px",
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              root: {
                // '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                //     minWidth: '180px',
                // },
                ".MuiMenu-list": {
                  padding: "5px",
                },
                ".MuiButtonBase-root.MuiMenuItem-root": {
                  fontSize: "14px",
                },
              },
            },
          },

          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: "#F6F9FF",
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              root: {
                backgroundColor: "rgba(255, 255, 255, 0.7);",
              },
            },
          },
          action: {
            active: "#fff",
          },

          MuiFormControlLabel: {
            styleOverrides: {
              root: {
                ".MuiButtonBase-root.MuiRadio-root.Mui-checked": {
                  color: amber[600],
                },
              },
            },
          },
          MuiListItem: {
            variants: [
              {
                props: { variant: "NavList" },
                style: {
                  color: "#859AC0",
                  "& .MuiListItemIcon-root": {
                    color: "#859AC0",
                  },
                  "&:hover": {
                    color: "white",
                    backgroundImage:
                      "linear-gradient(90deg, rgb(51,77,124),rgb(23,45,90))",
                    ".MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                },
              },
              {
                props: { variant: "NavListLight" },
                style: {
                  padding: "8px 28px 8px 32px",
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: 0,
                    marginRight: "16px",
                    "& svg": {
                      color: "textPrimary",
                      fontSize: "1.5rem",
                    },
                  },
                  "&:hover": {
                    background: "rgba(25, 118, 210, 0.12)",
                  },
                },
              },
            ],
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                backgroundColor: "#E3EEFD",
                outline: "1px solid rgba(0, 0, 0, 0.1)",
              },
            },
          },

          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "capitalize",
              },
            },
          },
        },
      }),
    [mode, dark, light]
  );
  useLayoutEffect(() => {
    console.log("useLayout");

    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get("theme");

    if (urlTheme === "dark" || urlTheme === "light") {
      setMode(urlTheme);
      setCookie("P13N", urlTheme);
    } else {
      const theme = getCookie("P13N");
      if (theme === "dark" || theme === "light") {
        setMode(theme);
      } else {
        setMode(preferTheme);
      }
    }
  }, [preferTheme]);
  // Apply dark mode class to HTML element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

const useTheme = () => {
  const toggleTheme = useContext(ThemeContext).toggleTheme;
  const mode = useContext(ThemeContext).mode;
  return { toggleTheme, mode };
};

export { useTheme };
