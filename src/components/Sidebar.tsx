"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiKaggle } from "react-icons/si";

const Sidebar: React.FC = () => {
  const { t, i18n, ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Aguarda o i18n estar pronto
  useEffect(() => {
    if (ready) {
      setIsLoading(false);
    }
  }, [ready]);

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen sticky top-0">
        <img
          src="https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/perfil.png"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h1 className="text-xl font-bold text-center mt-4">Claudenir Nojosa</h1>
        <p className="text-center text-gray-500">Os dados nunca mentem.</p>

        <div className="mt-6 space-y-3">
          <a
            href="https://github.com/Claudenir-Nojosa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/claudenir-nojosa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://www.kaggle.com/claudenirnojosa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <SiKaggle size={40} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen sticky top-0">
      <img
        src="https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/perfil.png"
        alt="Profile"
        className="w-100 h-100 rounded-full mx-auto"
      />

      <h1 className="text-xl font-bold text-center mt-4">Claudenir Nojosa</h1>

      <p className="text-center text-gray-500">{t("sidebar.tagline")}</p>

      <div className="mt-6 space-y-3">
        {/* GitHub */}
        <a
          href="https://github.com/Claudenir-Nojosa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaGithub size={30} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/claudenir-nojosa/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={30} />
        </a>

        {/* Kaggle */}
        <a
          href="https://www.kaggle.com/claudenirnojosa"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <SiKaggle size={40} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
