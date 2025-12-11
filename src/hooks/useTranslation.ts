import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/translations/translations.json";

type TranslationKey = keyof typeof translations;

export function useTranslation() {
  const { currentLang } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value[currentLang] || value["it"] || key;
  };

  return { t, currentLang };
}
