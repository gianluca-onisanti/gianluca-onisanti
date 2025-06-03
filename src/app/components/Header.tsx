import { Box, useTheme } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useStyles } from "@styles/Styler";
export default function Header() {
  const theme = useTheme();
  const sx = useStyles();

  return (
    <Box
      sx={{
        marginLeft: "20px",
        justifyContent: "flex-end",
      }}
    >
      <ThemeToggle />
    </Box>
  );
}
