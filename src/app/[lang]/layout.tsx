// app/[lang]/layout.tsx
import { ReactNode } from "react";
import "../globals.css";
import { Inter } from "next/font/google";
import ClientI18nWrapper from "./ClientI18nWrapper";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
      </head>
      <body>
        <ClientI18nWrapper lang={lang}>{children}</ClientI18nWrapper>
      </body>
    </html>
  );
}
