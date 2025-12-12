"use client";

import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcherSimple from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/40 dark:bg-gray-950/30 border-b border-white/20 dark:border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-14">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition">
              <LanguageSwitcherSimple />
            </div>
            <div className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
