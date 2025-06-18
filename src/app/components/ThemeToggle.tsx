// src/app/components/ThemeToggle.tsx
"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "./ThemeContext";
import { Box } from "@mui/material";

const ThemeToggle = () => {
  const style = { dark: "sunflower", light: "sakura" };
  const { mode } = useTheme().theme.palette;
  const [dynamic, setDynamic] = useState({
    dark: "sakura",
    light: "sunflower",
  });

  const handleHover = () => {
    setDynamic((prev) => ({
      dark: prev.light,
      light: prev.dark,
    }));
  };

  const imageSrc = `/images/${style[mode]}.png`;
  const buttonBackgroundImage = `/images/bg_${dynamic[mode]}.jpg`;

  const buttonStyle = {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
    cursor: "pointer",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${buttonBackgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      filter: "blur(3px)",
      zIndex: -1,
      transition: "filter 0.3s ease-in-out",
    },
  };

  return (
    <IconButton
      onClick={useTheme().toggleTheme}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      sx={{
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Box sx={buttonStyle}>
        <img
          src={imageSrc}
          alt={`Alternar para "${mode}"`}
          style={{ width: 48, height: 48 }}
        />
      </Box>
    </IconButton>
  );
};

export default ThemeToggle;
