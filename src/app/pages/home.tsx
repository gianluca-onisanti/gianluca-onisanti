"use client";

import { Container, useTheme, Grid2, Typography, Box } from "@mui/material";
import { useStyles } from "@styles/Styler";
import { useState } from "react";

export default function HomePage() {
  const [hover, setHover] = useState(false);

  const theme = useTheme();
  const { mode } = theme.palette;

  const sx = useStyles();

  const handleHover = (e: any) => {
    setHover(!hover);
  };

  const headerSize = {
    xs: mode === "dark" ? "42px" : "30px",
    md: mode === "dark" ? "85px" : "61px",
  };

  return (
    <Grid2 mt={4} container spacing={{ xs: 1, md: 6 }} alignItems={"center"}>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <Box sx={{ height: "200px" }} textAlign={{ xs: "center", md: "start" }}>
          <Typography
            fontSize={headerSize}
            sx={{
              color: "white",
              fontFamily: theme.palette.mode,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              lineHeight: 0,
            }}
          >
            Gianluca Onisanti
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}
