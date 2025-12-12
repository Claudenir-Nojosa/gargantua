"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import Portal from "./Portal";

export default function LanguageSwitcherGlobeFlags() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const languages = [
    {
      code: "en",
      flag: "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/44af5a3c1c3aee29b1da9468d3b874ce47d1eff1/usa.svg",
    },
    {
      code: "pt",
      flag: "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/brasil.png",
    },
    {
      code: "de",
      flag: "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/alemanha.png",
    },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (!isOpen) {
      const rect = buttonRef.current!.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 48, // alinhado com o botão
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botão */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-xl
                   bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm
                   border border-gray-300/40 dark:border-gray-700/40
                   hover:bg-white/60 dark:hover:bg-gray-900/60
                   transition-all duration-200 hover:scale-[1.04] active:scale-95"
        aria-label="Change language"
      >
        <Globe size={18} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Menu no portal */}
      {isOpen && (
        <Portal>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="fixed z-[9999]
                       bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl
                       border border-gray-300/40 dark:border-gray-700/40
                       shadow-xl rounded-2xl px-3 py-3
                       animate-fade-in-up"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            <div className="flex flex-col gap-2">
              {languages.map((lang) => {
                const active = lang.code === i18n.language;

                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center justify-center w-12 h-8 rounded-lg transition-all
                                hover:bg-gray-100/60 dark:hover:bg-gray-700/40
                                active:scale-95
                                ${active ? "bg-blue-100/60 dark:bg-blue-900/40 ring-1 ring-blue-500/30" : ""}`}
                  >
                    <img
                      src={lang.flag}
                      alt=""
                      className="w-8 h-6 object-cover rounded shadow-sm"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
