import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTheme } from "@mui/material";

function useTranslation(defaultLanguage = "pt-BR") {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Erro ao carregar as traduções:", error);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let translation: any = translations;

    for (const k of keys) {
      if (translation && typeof translation === "object" && k in translation) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return typeof translation === "string" ? translation : key;
  };

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return { t, language, changeLanguage };
}

interface LanguageSwitcherProps {
  changeLanguage: (newLanguage: string) => void;
  currentLanguage: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  changeLanguage,
  currentLanguage,
}) => {
  const theme = useTheme(); // Certifique-se de importar useTheme

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (lang: string) => {
    changeLanguage(lang);
    handleClose();
  };

  const languages = [
    { code: "pt-BR", name: "Português (Brasil)" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ];

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <TranslateIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // >>> Adicione esta prop PaperProps <<<
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Fundo preto com 70% de opacidade
            // Ou se quiser usar a cor de fundo padrão do tema e apenas adicionar opacidade:
            // backgroundColor: theme.palette.background.paper + 'B3', // 'B3' é 70% de opacidade em hex
            // background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.7), rgba(0, 0, 0, 0.7))', // Exemplo com gradiente e opacidade
            backdropFilter: "blur(5px)", // Efeito de desfoque de fundo (como o efeito "vidro")
            borderRadius: "8px", // Opcional: arredondar as bordas
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleMenuItemClick(lang.code)}
            selected={lang.code === currentLanguage}
            sx={{
              color: theme.palette.primary.main,
              "&:active": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
              "&:hover": {
                "&:not(.Mui-selected)": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              },
            }}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { useTranslation, LanguageSwitcher };
