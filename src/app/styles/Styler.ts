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
          main: "#541f1f",
          alt: "#5f000e",
        },
        secondary: {
          main: "#fcefef",
        },
        background: {
          default: "#ffe7de",
          paper: "#ffffff",
        },
        text: {
          primary: "#212121",
          secondary: "#757575",
        },
        logo: {
          shadow: "#541f1f",
        },
        button: {
          primary: "#541f1f",
          secondary: "#e57f78",
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
          alt: "#ff92c4",
        },
        secondary: {
          main: "#704041",
        },
        background: {
          default: "#541f1f",
          paper: "#424242",
        },
        text: {
          primary: "#ffffff",
          secondary: "#bdbdbd",
        },
        logo: {
          shadow: "#541f1f",
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

  return {
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
        fontFamily: "font",
        width: 250,
        boxShadow: "4px 4px #00000050",
        border: 4,
        borderRadius: "10px",
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.button.primary,
        justifyContent: "space-around",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.button.secondary,
          borderColor: theme.palette.primary.main,
          transform: "scale(1.1)",
        },
      },
    },
  };
}
