// lib/providers/next-theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    
    // **CRÍTICO:** Verifica se já existe um tema aplicado via script inline
    // antes de o next-themes interferir
    const html = document.documentElement;
    const hasManualDark = html.classList.contains("dark");
    const storageTheme = localStorage.getItem("theme");
    
    console.log("🔧 ThemeProvider init:", {
      hasManualDark,
      storageTheme,
      htmlClass: html.className
    });
    
    // Se o HTML já tem a classe dark, NÃO deixe o next-themes mudar
    if (hasManualDark && storageTheme !== "dark") {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Props customizados para controlar melhor
  const customProps = {
    ...props,
    enableSystem: false, // Desativa detecção automática
    storageKey: "theme", // Usa "theme" não "next-themes"
  };

  if (!isMounted) {
    // Renderiza sem o provider durante SSR
    return <>{children}</>;
  }

  return <NextThemesProvider {...customProps}>{children}</NextThemesProvider>;
}