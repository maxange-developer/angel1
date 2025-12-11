import { createContext, useContext, useState, ReactNode } from "react";

type Language = "it" | "en" | "es";

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  isLangMenuOpen: boolean;
  setIsLangMenuOpen: (open: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("it");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setCurrentLang,
        isLangMenuOpen,
        setIsLangMenuOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
