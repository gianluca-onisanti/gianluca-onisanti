import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";

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
  translator: (key: string) => string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  changeLanguage,
  currentLanguage,
  translator,
}) => {
  const theme = useTheme();

  const languages = [
    { code: "pt-BR", label: translator("language.portuguese") },
    { code: "en", label: translator("language.english") },
    { code: "es", label: translator("language.spanish") },
  ];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLanguage(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.text.primary,
        padding: "0px 20px",
        borderRadius: "0px 10px 0px 0px",
        backdropFilter: "blur(10px)",
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup row value={currentLanguage} onChange={handleLanguageChange}>
          {languages.map((lang) => (
            <FormControlLabel
              key={lang.code}
              value={lang.code}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                />
              }
              label={lang.label}
              sx={{
                margin: "3px 0px",
                "& .MuiFormControlLabel-label": {
                  color: "white",
                  fontSize: 12,
                  userSelect: "none",
                },
                "&:not(:last-of-type)": {
                  marginRight: theme.spacing(1),
                },
                display: "flex",
                alignItems: "center",
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
export { useTranslation, LanguageSwitcher };
