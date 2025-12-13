// app/[lang]/layout.tsx
import { ReactNode } from 'react';
import '../globals.css';
import { Inter } from 'next/font/google';
import ClientI18nWrapper from './ClientI18nWrapper';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>; // IMPORTANTE: params é uma Promise
}

// Generate static params for SSG
export async function generateStaticParams() {
  return [
    { lang: 'pt' },
    { lang: 'en' },
    // Add other languages
  ];
}

// IMPORTANTE: Adicione async aqui
export default async function RootLayout({ children, params }: RootLayoutProps) {
  // IMPORTANTE: Use await para extrair os parâmetros
  const { lang } = await params;
  const lng = lang || 'pt';

  return (
    <html lang={lng} className={inter.className}>
      <body>
        <ClientI18nWrapper lang={lng}>
          {children}
        </ClientI18nWrapper>
      </body>
    </html>
  );
}