import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/providers/i18n-provider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "portfolio_ds",
  description: "portfolio_ds",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950`}
      >
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <Toaster />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
