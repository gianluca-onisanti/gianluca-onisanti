// src/app/layout.tsx (O *VERDADEIRO* layout raiz)
import { AppThemeProvider } from "./components/ThemeContext";
import "./styles/globals.css";
import { ReactNode } from "react";
import RootContent from "./RootContent"; // Importe o novo componente

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          <RootContent>{children}</RootContent>
        </AppThemeProvider>
      </body>
    </html>
  );
}
