"use client";

import {
  useTheme,
  Grid2,
  Typography,
  Box,
  Button,
  Grow,
  Collapse,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useStyles } from "@styles/Styler";
import { LanguageSwitcher, useTranslation } from "../components/useTranslation";

export default function HomePage() {
  const theme = useTheme();
  const sx = useStyles();
  const { mode } = theme.palette;

  const { t, language, changeLanguage } = useTranslation("pt-BR");

  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [showLeftPanel, setShowLeftPanel] = useState(true); // Novo estado para controlar a animação do painel esquerdo

  const menuItems = [
    { key: "home", defaultText: "Início" },
    { key: "projects", defaultText: "Projetos" },
    { key: "journey", defaultText: "Minha Trajetória" },
    { key: "expertise", defaultText: "Expertises" },
    { key: "contact", defaultText: "Contato" },
  ];

  useEffect(() => {
    setShowLeftPanel(false);
    const timer = setTimeout(() => {
      setShowLeftPanel(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [language]);

  function buttonStyle(itemKey: string) {
    return {
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      },
      transition: "all 0.3s ease-in-out",
      color: activeMenuItem === itemKey ? theme.palette.primary.main : "white",
      backgroundColor:
        activeMenuItem === itemKey
          ? "rgba(255, 255, 255, 0.05)"
          : "transparent",
      fontSize: getFontSize(14, mode),
      fontFamily: theme.palette.mode,
      textTransform: "none",
      minWidth: "150px",
      justifyContent: "flex-start",
      borderRadius: "8px",
      paddingLeft: activeMenuItem === itemKey ? "18px" : "16px",
      position: "relative",
      ...(activeMenuItem === itemKey && {
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
    };
  }

  function getFontSize(number: number, mode: string) {
    if (mode === "dark") {
      return number;
    }
    return number * 0.9111;
  }

  const renderContent = (menuItemKey: string) => {
    switch (menuItemKey) {
      case "home":
        return (
          <Box sx={sx.box.body}>
            <Typography sx={sx.text}>{t("content.home")}</Typography>
          </Box>
        );
      case "projects":
        return <Typography sx={sx.text}>{t("content.projects")}</Typography>;
      case "journey":
        return <Typography sx={sx.text}>{t("content.journey")}</Typography>;
      case "expertise":
        return <Typography sx={sx.text}>{t("content.expertise")}</Typography>;
      case "contact":
        return <Typography sx={sx.text}>{t("content.contact")}</Typography>;
      default:
        return <Typography sx={sx.text}>{t("content.select")}</Typography>;
    }
  };

  const memoizedCurrentContent = useMemo(() => {
    return renderContent(activeMenuItem);
  }, [activeMenuItem, language, t]);

  return (
    <Grid2 container spacing={{ xs: 1, md: 6 }} alignItems={"flex-start"}>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <Collapse in={showLeftPanel} timeout={300}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: { xs: "center", md: "flex-start" },
              height: "100%",
              pr: { md: 2 },
            }}
          >
            <Box
              textAlign={{
                xs: "center",
                md: "start",
              }}
              sx={{ mb: 4 }}
            >
              <Typography fontSize={getFontSize(36, mode)} sx={sx.header.title}>
                {t("header.title")}
              </Typography>
              <Typography fontSize={getFontSize(16, mode)} sx={sx.header.sub}>
                {t("header.subtitle")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.key}
                  onClick={() => setActiveMenuItem(item.key)}
                  sx={buttonStyle(item.key)}
                >
                  {t(`nav.${item.key}`)}
                </Button>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <Box sx={sx.box.content}>
          <Grow in={true} timeout={300} key={`${activeMenuItem}-${language}`}>
            <div>{memoizedCurrentContent}</div>
          </Grow>
        </Box>
      </Grid2>
      <Box sx={{ display: "flex", position: "absolute", bottom: 0, left: 0 }}>
        <LanguageSwitcher
          translator={t}
          changeLanguage={changeLanguage}
          currentLanguage={language}
        />
      </Box>
    </Grid2>
  );
}
