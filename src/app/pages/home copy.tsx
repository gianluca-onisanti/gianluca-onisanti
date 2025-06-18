"use client";

import {
  useTheme,
  Grid2,
  Typography,
  Box,
  Button, // Import Button for menu items
} from "@mui/material";
// import { useStyles } from "@styles/Styler"; // Not used, can be removed
import { useState } from "react"; // Re-import useState for menu selection

export default function HomePage() {
  const theme = useTheme();
  const { mode } = theme.palette;

  const [activeMenuItem, setActiveMenuItem] = useState("Início");
  const tabs = [
    "Início",
    "Projetos",
    "Minha Trajetória",
    "Expertises",
    "Contato",
  ];

  function getFontSize(number: number, mode: "dark" | "light") {
    if (mode === "dark") {
      return number;
    }
    return number * 0.9111;
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case "Início":
        return (
          <Typography color="white">Bem-vindo à página inicial!</Typography>
        );
      case "Projetos":
        return (
          <Typography color="white">Aqui estão meus projetos...</Typography>
        );
      case "Minha Trajetória":
        return <Typography color="white">Minha jornada até aqui...</Typography>;
      case "Expertises":
        return (
          <Typography color="white">
            Minhas habilidades e conhecimentos...
          </Typography>
        );
      case "Contato":
        return <Typography color="white">Entre em contato comigo!</Typography>;
      default:
        return (
          <Typography color="white">Selecione uma opção no menu.</Typography>
        );
    }
  };
  // --- End of helper function ---

  return (
    <Grid2 container spacing={{ xs: 1, md: 6 }} alignItems={"flex-start"}>
      {/* Grid for Name and Title */}
      <Grid2 size={{ xs: 12, md: 12, lg: 12 }}>
        <Box
          textAlign={{
            xs: "center",
            md: "start",
          }}
          sx={{ mb: 4 }} // Added some margin-bottom for spacing
        >
          <Typography
            fontSize={getFontSize(36, mode)}
            sx={{
              color: "white",
              fontFamily: theme.palette.mode,
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
              position: "relative",
              display: "inline-block",
              lineHeight: 1,
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "2px",
                borderRadius: "10px",
                boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
                backgroundColor: "#ffffff",
              },
            }}
          >
            Gianluca Onisanti
          </Typography>
          <Typography
            fontSize={getFontSize(16, mode)}
            sx={{
              mt: "2px",
              ml: "4px",
              color: "white",
              fontFamily: theme.palette.mode,
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Desenvolvedor Full Stack
          </Typography>
        </Box>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {tabs.map((item: any) => (
            <Button
              key={item}
              onClick={() => setActiveMenuItem(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
                transition: "all 0.3s ease-in-out",
                color:
                  activeMenuItem === item
                    ? theme.palette.primary.main // Keep primary color for active text
                    : "white",
                backgroundColor:
                  activeMenuItem === item
                    ? "rgba(255, 255, 255, 0.05)" // A lighter background for active, or transparent
                    : "transparent",
                fontSize: getFontSize(15, mode),
                fontFamily: theme.palette.mode,
                textTransform: "none",
                minWidth: "150px",
                justifyContent: "flex-start",
                borderRadius: "8px",
                paddingLeft: activeMenuItem === item ? "18px" : "16px",
                position: "relative",
                ...(activeMenuItem === item && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "100%",
                    width: "4px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "0 4px 4px 0",
                  },
                }),
                // --- Fim das adições/modificações ---
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <Box
          sx={{
            p: 2,
            borderLeft: { md: "1px solid rgba(255, 255, 255, 0.2)" },
            pl: { md: 4 },
            textAlign: { xs: "center", md: "end" },
          }}
        >
          {renderContent()}
        </Box>
      </Grid2>
    </Grid2>
  );
}
