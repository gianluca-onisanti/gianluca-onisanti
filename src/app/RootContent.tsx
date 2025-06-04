// src/app/RootContent.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import { useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

interface RootContentProps {
  children: ReactNode;
}

export default function RootContent({ children }: RootContentProps) {
  const theme = useTheme();
  const [url, setUrl] = useState("");

  const style = {
    transition: "all 0.3s ease-in-out",
    backgroundImage: `url(/images/bg_${url}.jpg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  };

  const substyle = {
    width: "95%",
    height: "90%",
    margin: "auto",
    backgroundColor: "",
    padding: 3,
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    boxShadow: "0 0 0px calc(0.4vw + 0.4vh) #00000075",
  };

  useEffect(() => {
    const { mode } = theme.palette;
    const bg = {
      light: "sunflower",
      dark: "sakura",
    };
    setUrl(bg[mode]);
  }, [theme.palette.mode]);

  return (
    <Box sx={style as any}>
      <CssBaseline />
      <Header />
      <Box sx={substyle}>{children}</Box>
    </Box>
  );
}
