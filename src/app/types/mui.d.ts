// Incrementamos de Estilos ao Palette do Switcher

import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    box: {
      main: string;
      text: string;
    };
    logo: {
      shadow: string;
    };
    button: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    box?: {
      main?: string;
      text?: string;
    };
    logo?: {
      shadow?: string;
    };
    button?: {
      primary?: string;
      secondary?: string;
    };
  }
}

export {};
