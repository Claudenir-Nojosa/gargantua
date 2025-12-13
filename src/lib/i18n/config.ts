// Configuração do i18n para Next.js 15 (App Router)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Recursos de tradução
const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      // Main Content - Portfolio
      "main.portfolioTitle": "Data Science Portfolio",
      "main.name": "Claudenir Nojosa",
      "main.role": "Data Scientist & Analyst",

      // Sidebar
      "sidebar.title": "Data Scientist",
      "sidebar.tagline": '"Data never lies."',
      "sidebar.connect": "Connect with me",

      // About Me
      "main.aboutMe": "About Me",
      "main.aboutQuote":
        "I am a curiosity-driven data scientist, always asking questions.",

      // Work Experience
      "main.workExperience": "Work Experience",
      "main.dataAnalyst": "Data Analyst (Freelancer)",
      "main.softwareEngineer": "Software Engineer (Freelancer)",
      "main.dataAnalystDescription":
        "Data analysis for business process optimization. Development of dashboards and analytical reports. Implementation of BI solutions for decision making.",
      "main.softwareEngineerDescription":
        "Development of web applications and APIs. Implementation of automation solutions and scripts for data processing. Collaboration in open source projects.",

      // Education
      "main.education": "Education",
      "main.dataScienceDegree": "Data Science (Bachelor's)",
      "main.accountingDegree": "Accounting Sciences (Bachelor's)",
      "main.ufms": "UFMS - Federal University of Mato Grosso do Sul",
      "main.unifor": "UNIFOR - University of Fortaleza",
      "main.estimated": "(Estimated)",

      // Contents
      "main.contents": "Contents",
      "main.projects": "Projects",
      "main.studies": "Studies",
      "main.blog": "Blog",

      // Projects
      "main.projectsSection": "Projects",
      "main.churnPrediction": "Customer Churn Prediction",
      "main.churnDescription":
        "Machine learning system to predict customer abandonment probability. Use of algorithms like Random Forest, XGBoost and neural networks for classification. Development of interactive dashboard for retention metrics monitoring and identification of key churn factors.",
      "main.recommendationSystem": "E-commerce Recommendation System",
      "main.recommendationDescription":
        "Implementation of recommendation system based on collaborative filtering and content analysis. Use of techniques like SVD and deep learning for personalization. Integration with product API and 35% conversion increase in A/B tests.",
      "main.fraudDetection": "Transaction Fraud Detection",
      "main.fraudDescription":
        "Anomaly detection model to identify fraudulent transactions in real time. Application of unsupervised learning algorithms like Isolation Forest and Autoencoders. System processes over 10,000 transactions per minute with 99.2% accuracy.",
      "main.realEstatePrediction": "Real Estate Price Prediction",
      "main.realEstateDescription":
        "Regression model to predict property values based on characteristics like location, size, amenities and market trends. Use of Gradient Boosting and ensemble methods. Interactive dashboard for realtors with appreciation simulations and market analysis.",
      "main.repository": "Repository",
      "main.presentation": "Presentation",

      // Studies
      "main.studiesSection": "Studies",
      "main.bayesianStats": "Bayesian Statistics",
      "main.bayesianDescription":
        "In-depth studies in Bayesian statistics, including practical implementations and applications.",
      "main.machineLearning": "Advanced Machine Learning",
      "main.mlDescription":
        "Exploration of advanced machine learning and deep learning techniques.",
      "main.dataAnalysis": "Data Analysis with Python",
      "main.pythonDescription":
        "Tutorials and practical data analysis projects using Python.",

      // BLOG TRANSLATIONS
      "blog.hero.tagline": "Data Science Blog",
      "blog.hero.description":
        "Check out my articles and tutorials about Data Science, Machine Learning and Data Analysis.",
      "blog.featured": "Featured Article",
      "blog.read": "read",
      "blog.writtenBy": "Written by",
      "blog.readFullArticle": "Read Full Article",
      "blog.latestArticles": "Latest Articles",
      "blog.latestDescription": "Explore our most recent data science insights",
      "blog.viewAll": "View All",
      "blog.categories": "Categories",
      "blog.quickStats": "Quick Stats",
      "blog.totalArticles": "Total Articles",
      "blog.monthlyReaders": "Monthly Readers",
      "blog.categoriesCount": "Categories",
      "blog.newsletter": "Stay Updated",
      "blog.newsletterDescription":
        "Get the latest data science articles delivered to your inbox",
      "blog.newsletterPlaceholder": "Your email address",
      "blog.subscribe": "Subscribe",
      "blog.search": "Search articles...",
      "blog.quickLinks": "Quick Links",
      "blog.allArticles": "All Articles",
      "blog.topCategories": "Top Categories",
      "blog.builtWithPassion":
        "Built with passion for the data science community",

      // Blog Post Categories (translated versions for filter/search)
      "blog.categories.machineLearning": "Machine Learning",
      "blog.categories.dataAnalysis": "Data Analysis",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Data Visualization",
      "blog.categories.nlp": "Natural Language Processing",

      // Blog Post Descriptions (these would come from your CMS/API)
      "blog.posts.1.title":
        "Introduction to Machine Learning: Fundamental Concepts",
      "blog.posts.1.description":
        "Learn the basic concepts of Machine Learning and how to start your journey in the field.",
      "blog.posts.2.title": "Exploratory Data Analysis with Python",
      "blog.posts.2.description":
        "Advanced techniques to explore and visualize data before predictive modeling.",
      "blog.posts.3.title": "Deep Learning: Modern Architectures",
      "blog.posts.3.description":
        "Explore advanced neural network architectures and their applications in computer vision.",
      "blog.posts.4.title":
        "Data Visualization with Tableau: Advanced Techniques",
      "blog.posts.4.description":
        "Create interactive dashboards and impactful visuals for complex corporate data analysis.",
      "blog.posts.5.title": "Natural Language Processing in Practice",
      "blog.posts.5.description":
        "Real NLP applications and how to implement text models for sentiment analysis and document classification.",

      // Language names
      "language.english": "English",
      "language.portuguese": "Portuguese",
      "language.german": "German",

      // Common
      "common.search": "Search articles...",
      "common.read": "read",
    },
  },
  pt: {
    translation: {
      // Navbar
      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.projects": "Projetos",
      "nav.contact": "Contato",

      // Títulos principais
      "main.portfolioTitle": "Portfólio de Data Science",
      "main.name": "Claudenir Nojosa",
      "main.role": "Data Scientist & Analista",

      // Sidebar
      "sidebar.title": "Cientista de Dados",
      "sidebar.tagline": '"Os dados nunca mentem."',
      "sidebar.connect": "Conecte-se",

      // Main Content - Sobre Mim
      "main.aboutMe": "Sobre Mim",
      "main.aboutQuote":
        "Sou um cientista de dados movido pela curiosidade, sempre buscando respostas através dos dados.",

      // Main Content - Experiência Profissional
      "main.workExperience": "Experiência Profissional",
      "main.dataAnalyst": "Data Analyst (Freelancer)",
      "main.softwareEngineer": "Software Engineer (Freelancer)",
      "main.dataAnalystDescription":
        "Análise de dados para otimização de processos empresariais. Desenvolvimento de dashboards e relatórios analíticos. Implementação de soluções de BI para tomada de decisão.",
      "main.softwareEngineerDescription":
        "Desenvolvimento de aplicações web e APIs. Implementação de soluções de automação e scripts para processamento de dados. Colaboração em projetos de código aberto.",

      // Main Content - Formação Acadêmica
      "main.education": "Formação Acadêmica",
      "main.dataScienceDegree": "Ciência de Dados (Bacharelado)",
      "main.accountingDegree": "Ciências Contábeis (Bacharelado)",
      "main.ufms": "UFMS - Universidade Federal de Mato Grosso do Sul",
      "main.unifor": "UNIFOR - Universidade de Fortaleza",
      "main.estimated": "(Estimativa)",

      // Main Content - Conteúdos
      "main.contents": "Conteúdos",
      "main.projects": "Projetos",
      "main.studies": "Estudos",
      "main.blog": "Blog",

      // Main Content - Projetos
      "main.projectsSection": "Projetos",
      "main.churnPrediction": "Previsão de Churn (Rotatividade) de Clientes",
      "main.churnDescription":
        "Sistema de machine learning para prever a probabilidade de clientes abandonarem um serviço. Utilização de algoritmos como Random Forest, XGBoost e redes neurais para classificação. Desenvolvimento de dashboard interativo para acompanhamento de métricas de retenção e identificação de fatores-chave de churn.",
      "main.recommendationSystem": "Sistema de Recomendação para E-commerce",
      "main.recommendationDescription":
        "Implementação de sistema de recomendação baseado em filtragem colaborativa e análise de conteúdo. Utilização de técnicas como SVD (Singular Value Decomposition) e deep learning para personalização. Integração com API de produtos e aumento de conversão em 35% em testes A/B.",
      "main.fraudDetection": "Detecção de Fraude em Transações",
      "main.fraudDescription":
        "Modelo de detecção de anomalias para identificar transações fraudulentas em tempo real. Aplicação de algoritmos de aprendizado não supervisionado como Isolation Forest e Autoencoders. Sistema processa mais de 10.000 transações por minuto com 99.2% de precisão.",
      "main.realEstatePrediction":
        "Previsão de Preços de Imóveis (Setor Imobiliário)",
      "main.realEstateDescription":
        "Modelo de regressão para prever valores de imóveis baseado em características como localização, tamanho, amenities e tendências de mercado. Utilização de Gradient Boosting e ensemble methods. Dashboard interativo para corretores com simulações de valorização e análise de mercado.",
      "main.repository": "Repositório",
      "main.presentation": "Apresentação",

      // Main Content - Estudos
      "main.studiesSection": "Estudos",
      "main.bayesianStats": "Estatística Bayesiana",
      "main.bayesianDescription":
        "Estudos aprofundados em estatística Bayesiana, incluindo implementações práticas e aplicações.",
      "main.machineLearning": "Machine Learning Avançado",
      "main.mlDescription":
        "Exploração de técnicas avançadas de machine learning e deep learning.",
      "main.dataAnalysis": "Análise de Dados com Python",
      "main.pythonDescription":
        "Tutoriais e projetos práticos de análise de dados utilizando Python.",

      // BLOG TRANSLATIONS
      "blog.hero.tagline": "Blog de Data Science",
      "blog.hero.description":
        "Confira meus artigos e tutoriais sobre Data Science, Machine Learning e Análise de Dados.",
      "blog.featured": "Artigo em Destaque",
      "blog.read": "ler",
      "blog.writtenBy": "Escrito por",
      "blog.readFullArticle": "Ler Artigo Completo",
      "blog.latestArticles": "Artigos Recentes",
      "blog.latestDescription":
        "Explore nossas mais recentes publicações sobre ciência de dados",
      "blog.viewAll": "Ver Todos",
      "blog.categories": "Categorias",
      "blog.quickStats": "Estatísticas Rápidas",
      "blog.totalArticles": "Total de Artigos",
      "blog.monthlyReaders": "Leitores Mensais",
      "blog.categoriesCount": "Categorias",
      "blog.newsletter": "Fique Atualizado",
      "blog.newsletterDescription":
        "Receba os últimos artigos sobre ciência de dados diretamente no seu email",
      "blog.newsletterPlaceholder": "Seu endereço de email",
      "blog.subscribe": "Inscrever-se",
      "blog.search": "Buscar artigos...",
      "blog.quickLinks": "Links Rápidos",
      "blog.allArticles": "Todos os Artigos",
      "blog.topCategories": "Categorias Populares",
      "blog.builtWithPassion":
        "Desenvolvido com paixão para a comunidade de ciência de dados",

      // Blog Post Categories (translated versions for filter/search)
      "blog.categories.machineLearning": "Machine Learning",
      "blog.categories.dataAnalysis": "Análise de Dados",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Visualização de Dados",
      "blog.categories.nlp": "Processamento de Linguagem Natural",

      // Blog Post Descriptions
      "blog.posts.1.title":
        "Introdução ao Machine Learning: Conceitos Fundamentais",
      "blog.posts.1.description":
        "Aprenda os conceitos básicos de Machine Learning e como começar sua jornada na área.",
      "blog.posts.2.title": "Análise Exploratória de Dados com Python",
      "blog.posts.2.description":
        "Técnicas avançadas para explorar e visualizar dados antes da modelagem preditiva.",
      "blog.posts.3.title": "Deep Learning: Arquiteturas Modernas",
      "blog.posts.3.description":
        "Explore arquiteturas avançadas de redes neurais e suas aplicações em visão computacional.",
      "blog.posts.4.title":
        "Visualização de Dados com Tableau: Técnicas Avançadas",
      "blog.posts.4.description":
        "Crie dashboards interativos e visuais impactantes para análises de dados corporativos complexos.",
      "blog.posts.5.title": "Processamento de Linguagem Natural na Prática",
      "blog.posts.5.description":
        "Aplicações reais de NLP e como implementar modelos de texto para análise de sentimentos e classificação de documentos.",

      // Language names
      "language.english": "Inglês",
      "language.portuguese": "Português",
      "language.german": "Alemão",

      // Common
      "common.search": "Buscar artigos...",
      "common.read": "ler",
    },
  },
  de: {
    translation: {
      // Navbar
      "nav.home": "Startseite",
      "nav.about": "Über mich",
      "nav.projects": "Projekte",
      "nav.contact": "Kontakt",

      // Sidebar
      "sidebar.title": "Data Scientist",
      "sidebar.tagline": '"Daten lügen nie."',
      "sidebar.connect": "Verbinde dich mit mir",

      // Títulos principais
      "main.portfolioTitle": "Data Science Portfolio",
      "main.name": "Claudenir Nojosa",
      "main.role": "Data Scientist & Analyst",

      // Main Content - Sobre Mim
      "main.aboutMe": "Über mich",
      "main.aboutQuote":
        "Ich bin ein neugieriger Data Scientist, der immer Fragen stellt.",

      // Main Content - Experiência Profissional
      "main.workExperience": "Berufserfahrung",
      "main.dataAnalyst": "Data Analyst (Freelancer)",
      "main.softwareEngineer": "Software Engineer (Freelancer)",
      "main.dataAnalystDescription":
        "Datenanalyse zur Optimierung von Geschäftsprozessen. Entwicklung von Dashboards und analytischen Berichten. Implementierung von BI-Lösungen für Entscheidungsfindung.",
      "main.softwareEngineerDescription":
        "Entwicklung von Webanwendungen und APIs. Implementierung von Automatisierungslösungen und Skripten zur Datenverarbeitung. Zusammenarbeit in Open-Source-Projekten.",

      // Main Content - Formação Acadêmica
      "main.education": "Ausbildung",
      "main.dataScienceDegree": "Data Science (Bachelor)",
      "main.accountingDegree": "Wirtschaftsprüfung (Bachelor)",
      "main.ufms": "UFMS - Bundesuniversität von Mato Grosso do Sul",
      "main.unifor": "UNIFOR - Universität von Fortaleza",
      "main.estimated": "(Geschätzt)",

      // Main Content - Conteúdos
      "main.contents": "Inhalte",
      "main.projects": "Projekte",
      "main.studies": "Studien",
      "main.blog": "Blog",

      // Main Content - Projetos
      "main.projectsSection": "Projekte",
      "main.churnPrediction": "Kundenabwanderungsvorhersage",
      "main.churnDescription":
        "Maschinelles Lernsystem zur Vorhersage der Kundenabwanderungswahrscheinlichkeit. Verwendung von Algorithmen wie Random Forest, XGBoost und neuronalen Netzwerken zur Klassifizierung. Entwicklung eines interaktiven Dashboards zur Überwachung von Bindungsmetriken und Identifizierung von Schlüsselfaktoren für Kundenabwanderung.",
      "main.recommendationSystem": "E-Commerce-Empfehlungssystem",
      "main.recommendationDescription":
        "Implementierung eines Empfehlungssystems basierend auf kollaborativer Filterung und Inhaltsanalyse. Verwendung von Techniken wie SVD und Deep Learning zur Personalisierung. Integration mit Produkt-API und 35%ige Steigerung der Konversion in A/B-Tests.",
      "main.fraudDetection": "Betrugserkennung bei Transaktionen",
      "main.fraudDescription":
        "Anomalie-Erkennungsmodell zur Identifizierung betrügerischer Transaktionen in Echtzeit. Anwendung von unüberwachten Lernalgorithmen wie Isolation Forest und Autoencodern. System verarbeitet über 10.000 Transaktionen pro Minute mit 99,2% Genauigkeit.",
      "main.realEstatePrediction": "Immobilienpreisvorhersage",
      "main.realEstateDescription":
        "Regressionsmodell zur Vorhersage von Immobilienwerten basierend auf Merkmalen wie Lage, Größe, Annehmlichkeiten und Markttrends. Verwendung von Gradient Boosting und Ensemble-Methoden. Interaktives Dashboard für Makler mit Wertsteigerungssimulationen und Marktanalysen.",
      "main.repository": "Repository",
      "main.presentation": "Präsentation",

      // Main Content - Estudos
      "main.studiesSection": "Studien",
      "main.bayesianStats": "Bayessche Statistik",
      "main.bayesianDescription":
        "Vertiefte Studien in Bayesscher Statistik, einschließlich praktischer Implementierungen und Anwendungen.",
      "main.machineLearning": "Fortgeschrittenes Maschinelles Lernen",
      "main.mlDescription":
        "Erkundung fortgeschrittener Techniken des maschinellen Lernens und Deep Learning.",
      "main.dataAnalysis": "Datenanalyse mit Python",
      "main.pythonDescription":
        "Tutorials und praktische Datenanalyseprojekte mit Python.",

      // BLOG TRANSLATIONS
      "blog.hero.tagline": "Data Science Blog",
      "blog.hero.description":
        "Lesen Sie meine Artikel und Tutorials über Data Science, Machine Learning und Datenanalyse.",
      "blog.featured": "Hervorgehobener Artikel",
      "blog.read": "lesen",
      "blog.writtenBy": "Geschrieben von",
      "blog.readFullArticle": "Ganzen Artikel lesen",
      "blog.latestArticles": "Neueste Artikel",
      "blog.latestDescription":
        "Entdecken Sie unsere neuesten Data-Science-Erkenntnisse",
      "blog.viewAll": "Alle anzeigen",
      "blog.categories": "Kategorien",
      "blog.quickStats": "Schnellstatistiken",
      "blog.totalArticles": "Gesamtartikel",
      "blog.monthlyReaders": "Monatliche Leser",
      "blog.categoriesCount": "Kategorien",
      "blog.newsletter": "Bleiben Sie informiert",
      "blog.newsletterDescription":
        "Erhalten Sie die neuesten Data-Science-Artikel direkt in Ihrem Posteingang",
      "blog.newsletterPlaceholder": "Ihre E-Mail-Adresse",
      "blog.subscribe": "Abonnieren",
      "blog.search": "Artikel suchen...",
      "blog.quickLinks": "Schnelllinks",
      "blog.allArticles": "Alle Artikel",
      "blog.topCategories": "Top-Kategorien",
      "blog.builtWithPassion":
        "Mit Leidenschaft für die Data-Science-Community entwickelt",

      // Blog Post Categories (translated versions for filter/search)
      "blog.categories.machineLearning": "Maschinelles Lernen",
      "blog.categories.dataAnalysis": "Datenanalyse",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Datenvisualisierung",
      "blog.categories.nlp": "Natürliche Sprachverarbeitung",

      // Blog Post Descriptions
      "blog.posts.1.title":
        "Einführung in Machine Learning: Grundlegende Konzepte",
      "blog.posts.1.description":
        "Lernen Sie die grundlegenden Konzepte des Machine Learnings und wie Sie Ihre Reise in diesem Bereich beginnen können.",
      "blog.posts.2.title": "Explorative Datenanalyse mit Python",
      "blog.posts.2.description":
        "Fortgeschrittene Techniken zur Erkundung und Visualisierung von Daten vor der prädiktiven Modellierung.",
      "blog.posts.3.title": "Deep Learning: Moderne Architekturen",
      "blog.posts.3.description":
        "Erkunden Sie fortgeschrittene neuronale Netzwerkarchitekturen und ihre Anwendungen in der Computer Vision.",
      "blog.posts.4.title":
        "Datenvisualisierung mit Tableau: Fortgeschrittene Techniken",
      "blog.posts.4.description":
        "Erstellen Sie interaktive Dashboards und eindrucksvolle Visualisierungen für komplexe Unternehmensdatenanalysen.",
      "blog.posts.5.title": "Natürliche Sprachverarbeitung in der Praxis",
      "blog.posts.5.description":
        "Praktische NLP-Anwendungen und wie Sie Textmodelle für Sentiment-Analyse und Dokumentenklassifizierung implementieren können.",

      // Language names
      "language.english": "Englisch",
      "language.portuguese": "Portugiesisch",
      "language.german": "Deutsch",

      // Common
      "common.search": "Artikel suchen...",
      "common.read": "lesen",
    },
  },
};

// Exporte os recursos para uso no servidor
export { resources };

// Função para inicializar i18n no cliente
let isInitialized = false;

export function initI18n() {
  // Se já inicializou, retorna a instância existente
  if (isInitialized) {
    return i18n;
  }

  // Inicializa i18n
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "pt",
      supportedLngs: ["en", "pt", "de"],
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  isInitialized = true;
  return i18n;
}

// Exporte a instância do i18n
export default i18n;
