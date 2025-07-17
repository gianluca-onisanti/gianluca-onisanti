import { useTheme } from "@mui/material";

export function useSwitcher(mode: "light" | "dark") {
  const theme = {
    light: {
      palette: {
        mode: "light", // TEMA CLARO
        box: {
          main: "#541f1f",
          text: "#ffe7de",
        },
        primary: {
          main: "#ffcc00",
          dark: "#6f4805",
        },
        secondary: {
          main: "#a8f2ff",
        },
        text: {
          primary: "#00000075",
          secondary: "#757575",
        },
        button: {
          primary: "#ffcc00",
          secondary: "#00000075",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark", // TEMA ESCURO
        box: {
          main: "#ffe7de",
          text: "#541f1f",
        },
        primary: {
          main: "#e57f78",
          dark: "#704041",
        },
        secondary: {
          main: "#ff92c4",
        },
        text: {
          primary: "#ffffff25",
          secondary: "#bdbdbd",
        },
        button: {
          primary: "#ffe7de",
          secondary: "#541f1f",
        },
      },
    },
  };

  return theme[mode];
}

export function useStyles() {
  const theme = useTheme();
  const { mode } = theme.palette;

  return {
    header: {
      title: {
        color: "white",
        fontFamily: mode,
        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
        position: "relative",
        display: "inline-block",
        lineHeight: 1,
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: mode === "light" ? -4 : 0,
          height: "2px",
          borderRadius: "10px",
          boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
          backgroundColor: "#ffffff",
        },
      },
      sub: {
        mt: "2px",
        ml: "4px",
        color: "white",
        fontFamily: mode,
        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
      },
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "325px",
      borderRadius: "25px",
      padding: "0 10px",
      margin: "10px auto",
      backgroundColor: theme.palette.box.main,
      color: theme.palette.box.text,
    },
    button: {
      primary: {
        fontFamily: "main",
        width: 250,
        boxShadow: "4px 4px #00000050",
        border: 4,
        borderRadius: "25px",
        borderColor: theme.palette.button.primary,
        color: theme.palette.button.primary,
        backgroundColor: theme.palette.text.primary,
        justifyContent: "space-around",
        transition: "all 0.25s ease-in-out",
        textShadow: `
        -1px -1px 0px rgba(0, 0, 0, 0.5),
        1px -1px 0px rgba(0, 0, 0, 0.5),
        -1px 1px 0px rgba(0, 0, 0, 0.5),
        1px 1px 0px rgba(0, 0, 0, 0.5), 
        0px 0px 8px rgba(0, 0, 0, 0.7) 
      `,
        "&:hover": {
          textShadow: "unset",
          color: theme.palette.button.secondary,
          backgroundColor: theme.palette.button.primary,
          borderColor: theme.palette.button.secondary,
          transform: "scale(1.1)",
        },
      },
    },
    box: {
      content: {
        p: 2,
        borderLeft: { md: "1px solid #ffffff33" },
        pl: { md: 4 },
        textAlign: { xs: "center", md: "end" },
        height: "100%",
      },
      body: {
        padding: "20px 30px",
        borderRadius: "2.5px",
        backgroundColor: theme.palette.text.primary,
      },
    },
    text: {
      textShadow: `
        -1px -1px 0px rgba(0, 0, 0, 0.5),
        1px -1px 0px rgba(0, 0, 0, 0.5),
        -1px 1px 0px rgba(0, 0, 0, 0.5),
        1px 1px 0px rgba(0, 0, 0, 0.5), 
        0px 0px 8px rgba(0, 0, 0, 0.7) 
      `,
      fontFamily: "main",
      color: "white",
    },
  };
}
