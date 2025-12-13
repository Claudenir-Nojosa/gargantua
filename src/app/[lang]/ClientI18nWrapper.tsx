// app/[lang]/ClientI18nWrapper.tsx
'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/client';
import { ReactNode, useEffect, useState } from 'react';

interface ClientI18nWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientI18nWrapper({ children, lang }: ClientI18nWrapperProps) {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      if (!i18n.isInitialized) {
        await i18n.init();
      }
      
      if (i18n.language !== lang) {
        await i18n.changeLanguage(lang);
      }
      
      setI18nReady(true);
    };

    initialize();
  }, [lang]);

  // Show loading state while i18n initializes
  if (!i18nReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}