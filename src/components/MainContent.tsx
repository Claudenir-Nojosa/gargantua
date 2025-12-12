"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface WorkExperience {
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface Project {
  title: string;
  description: string;
  repository?: string;
  presentation?: string;
}

interface Study {
  title: string;
  links: { text: string; url: string }[];
  description?: string;
}

const MainContent: React.FC = () => {
  const { t, i18n, ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      setIsLoading(false);
    }
  }, [ready]);

  // Se ainda está carregando, mostra conteúdo em português como fallback
  if (isLoading) {
    return (
      <div className="p-8 overflow-y-auto flex-1">
        <h2 className="text-2xl font-bold mb-6">Portfólio de Data Science</h2>

        <section className="mb-8">
          <h3 className="font-bold text-lg mb-2">Sobre Mim</h3>
          <p className="italic mt-1 text-gray-700 dark:text-gray-300">
            "Sou um cientista de dados movido pela curiosidade, sempre buscando
            respostas através dos dados."
          </p>
        </section>

        <section className="mb-8">
          <h3 className="font-bold text-lg mb-2">Experiência Profissional</h3>
          <ul className="space-y-4 mt-2">
            <li className="text-gray-700 dark:text-gray-300">
              <strong>Data Analyst (Freelancer)</strong>, Jan 2025 - Atual
              <p className="mt-1 ml-4">
                Análise de dados para otimização de processos empresariais.
                Desenvolvimento de dashboards e relatórios analíticos.
                Implementação de soluções de BI para tomada de decisão.
              </p>
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong>Software Engineer (Freelancer)</strong>, Jul 2023 - Atual
              <p className="mt-1 ml-4">
                Desenvolvimento de aplicações web e APIs. Implementação de
                soluções de automação e scripts para processamento de dados.
                Colaboração em projetos de código aberto.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
            Formação Acadêmica
          </h3>
          <ul className="space-y-4">
            <li className="text-gray-700 dark:text-gray-300">
              <div className="font-medium text-gray-900 dark:text-white">
                Ciência de Dados (Bacharelado)
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                UFMS - Universidade Federal de Mato Grosso do Sul
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Jan 2025 - Jul 2028 (Estimativa)
                </span>
              </div>
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <div className="font-medium text-gray-900 dark:text-white">
                Ciências Contábeis (Bacharelado)
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                UNIFOR - Universidade de Fortaleza
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  2018 - 2022
                </span>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="font-bold text-lg mb-2">Conteúdos</h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-blue-600 dark:text-blue-400">
            <li>
              <a
                href="#projects"
                className="hover:text-blue-800 dark:hover:text-blue-300"
              >
                Projetos
              </a>
            </li>
            <li>
              <a
                href="#studies"
                className="hover:text-blue-800 dark:hover:text-blue-300"
              >
                Estudos
              </a>
            </li>
            <li>
              <a
                href="https://seublog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 dark:hover:text-blue-300"
              >
                Blog
              </a>
            </li>
          </ul>
        </section>

        <section id="projects" className="mb-8">
          <h3 className="font-bold text-lg mb-2">Projetos</h3>
          <ul className="space-y-6 mt-2">
            <li className="text-gray-700 dark:text-gray-300">
              <div className="font-medium mb-1">
                Previsão de Churn (Rotatividade) de Clientes
              </div>
              <p className="mb-2">
                Sistema de machine learning para prever a probabilidade de
                clientes abandonarem um serviço. Utilização de algoritmos como
                Random Forest, XGBoost e redes neurais para classificação.
                Desenvolvimento de dashboard interativo para acompanhamento de
                métricas de retenção e identificação de fatores-chave de churn.
              </p>
              <div className="flex space-x-4 text-blue-600 dark:text-blue-400 text-sm">
                <a
                  href="#"
                  className="hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Repositório
                </a>
                <a
                  href="#"
                  className="hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Apresentação
                </a>
              </div>
            </li>
            {/* ... outros projetos em português ... */}
          </ul>
        </section>

        {/* ... resto do conteúdo em português ... */}
      </div>
    );
  }

  // Configurações dinâmicas baseadas no idioma
  const currentText =
    i18n.language === "en"
      ? "Current"
      : i18n.language === "pt"
        ? "Atual"
        : "Aktuell";

  const workExperience: WorkExperience[] = [
    {
      company: t("main.dataAnalyst"),
      period: `Jan 2025 - ${currentText}`,
      description: t("main.dataAnalystDescription"),
    },
    {
      company: t("main.softwareEngineer"),
      period: `Jul 2023 - ${currentText}`,
      description: t("main.softwareEngineerDescription"),
    },
  ];

  const education: Education[] = [
    {
      degree: t("main.dataScienceDegree"),
      institution: t("main.ufms"),
      period: `Jan 2025 - Jul 2028 ${
        i18n.language === "en"
          ? "(Estimated)"
          : i18n.language === "pt"
            ? "(Estimativa)"
            : "(Geschätzt)"
      }`,
    },
    {
      degree: t("main.accountingDegree"),
      institution: t("main.unifor"),
      period: "2018 - 2022",
    },
  ];

  const projects: Project[] = [
    {
      title: t("main.churnPrediction"),
      description: t("main.churnDescription"),
      repository: t("main.repository"),
      presentation: t("main.presentation"),
    },
    {
      title: t("main.recommendationSystem"),
      description: t("main.recommendationDescription"),
      repository: t("main.repository"),
      presentation: t("main.presentation"),
    },
    {
      title: t("main.fraudDetection"),
      description: t("main.fraudDescription"),
      repository: t("main.repository"),
      presentation: t("main.presentation"),
    },
    {
      title: t("main.realEstatePrediction"),
      description: t("main.realEstateDescription"),
      repository: t("main.repository"),
      presentation: t("main.presentation"),
    },
  ];

  // Links dos estudos (mantidos em português por enquanto)
  const studies: Study[] = [
    {
      title: t("main.bayesianStats"),
      links: [
        { text: "Introdução à Inferência Bayesiana", url: "#" },
        {
          text: "MCMC: Métodos de Monte Carlo via Cadeias de Markov",
          url: "#",
        },
        { text: "Distribuições Conjugadas e Priors", url: "#" },
        { text: "Modelos Hierárquicos Bayesianos", url: "#" },
      ],
      description: t("main.bayesianDescription"),
    },
    {
      title: t("main.machineLearning"),
      links: [
        { text: "Redes Neurais Profundas", url: "#" },
        { text: "Aprendizado por Reforço", url: "#" },
        { text: "Processamento de Linguagem Natural", url: "#" },
        { text: "Visão Computacional", url: "#" },
      ],
      description: t("main.mlDescription"),
    },
    {
      title: t("main.dataAnalysis"),
      links: [
        { text: "Pandas para Manipulação de Dados", url: "#" },
        { text: "Visualização com Matplotlib e Seaborn", url: "#" },
        { text: "Análise Estatística com SciPy", url: "#" },
        { text: "Dashboards com Streamlit", url: "#" },
      ],
      description: t("main.pythonDescription"),
    },
  ];

  return (
    <div className="p-8 overflow-y-auto flex-1">
      <h2 className="text-2xl font-bold mb-6">
        {isLoading ? "Portfólio de Data Science" : t("main.portfolioTitle")}
      </h2>

      <section className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.aboutMe")}</h3>
        <p className="italic mt-1 text-gray-700 dark:text-gray-300">
          {t("main.aboutQuote")}
        </p>
      </section>

      <section className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.workExperience")}</h3>
        <ul className="space-y-4 mt-2">
          {workExperience.map((job, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <strong>{job.company}</strong>, {job.period}
              <p className="mt-1 ml-4">{job.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
          {t("main.education")}
        </h3>
        <ul className="space-y-4">
          {education.map((edu, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <div className="font-medium text-gray-900 dark:text-white">
                {edu.degree}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {edu.institution}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {edu.period}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.contents")}</h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <a
              href="#projects"
              className="hover:text-blue-800 dark:hover:text-blue-300"
            >
              {t("main.projects")}
            </a>
          </li>
          <li>
            <a
              href="#studies"
              className="hover:text-blue-800 dark:hover:text-blue-300"
            >
              {t("main.studies")}
            </a>
          </li>
          <li>
            <a
              href="https://seublog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 dark:hover:text-blue-300"
            >
              {t("main.blog")}
            </a>
          </li>
        </ul>
      </section>

      <section id="projects" className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.projectsSection")}</h3>
        <ul className="space-y-6 mt-2">
          {projects.map((project, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <div className="font-medium mb-1">{project.title}</div>
              <p className="mb-2">{project.description}</p>
              <div className="flex space-x-4 text-blue-600 dark:text-blue-400 text-sm">
                {project.repository && (
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {project.repository}
                  </a>
                )}
                {project.presentation && (
                  <a
                    href="#"
                    className="hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {project.presentation}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="studies" className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.studiesSection")}</h3>
        <ul className="space-y-4 mt-2">
          {studies.map((study, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <div className="font-medium mb-1">{study.title}</div>
              <ul className="list-disc list-inside ml-4 space-y-1 text-blue-600 dark:text-blue-400">
                {study.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              {study.description && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {study.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="font-bold text-lg mb-2">{t("main.blogSection")}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("main.blogDescription")}
        </p>
        <a
          href="https://seublog.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          {t("main.accessBlog")}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </section>
    </div>
  );
};

export default MainContent;
