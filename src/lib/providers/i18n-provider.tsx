'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'i18next';
import { initI18n } from '../i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [instance, setInstance] = useState<i18n | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializa i18n apenas no cliente
    const initializeI18n = async () => {
      try {
        const i18nInstance = initI18n();
        
        // Aguarda a inicialização
        await i18nInstance.init();
        
        setInstance(i18nInstance);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeI18n();
  }, []);

  // Enquanto carrega, renderize sem i18n
  if (isLoading || !instance) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  );
}