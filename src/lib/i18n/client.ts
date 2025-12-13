// lib/i18n/client.ts
'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos completos de tradução
const resources = {
  pt: {
    translation: {
      // Categorias
      "blog.categories.machineLearning": "Machine Learning",
      "blog.categories.dataAnalysis": "Análise de Dados",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Visualização de Dados",
      "blog.categories.nlp": "NLP",
      "blog.categories": "Categorias",
      
      // Hero Section
      "blog.hero.tagline": "Bem-vindo ao blog de Data Science",
      "blog.hero.description": "Explore tutoriais, insights e projetos sobre Machine Learning, análise de dados e inteligência artificial.",
      
      // Search
      "blog.search": "Buscar artigos...",
      
      // Featured Post
      "blog.featured": "Destaque",
      "blog.read": "de leitura",
      "blog.writtenBy": "Escrito por",
      "blog.readFullArticle": "Ler artigo completo",
      
      // Recent Posts
      "blog.latestArticles": "Artigos Recentes",
      "blog.latestDescription": "Os posts mais recentes do blog",
      "common.read": "Ler",
      "blog.viewAll": "Ver todos",
      "blog.noPostsFound": "Nenhum post encontrado para sua busca.",
      
      // Sidebar
      "blog.quickStats": "Estatísticas Rápidas",
      "blog.totalArticles": "Total de Artigos",
      "blog.categoriesCount": "Categorias",
      "blog.authors": "Autores",
      "blog.newsletter": "Newsletter",
      "blog.newsletterDescription": "Receba os últimos artigos por email.",
      "blog.yourEmail": "Seu email",
      "blog.subscribe": "Inscrever-se",
      "blog.topCategories": "Principais Categorias",
      
      // Blog Post Page
      "blog.post.backToHome": "Voltar ao início",
      "blog.post.backToBlog": "Voltar ao blog",
      "blog.post.minRead": "min",
      "blog.post.author": "Autor",
      "blog.post.tags": "Tags",
      "blog.post.share": "Compartilhar",
      "blog.post.save": "Salvar",
      "blog.post.readTime": "min de leitura",
      "blog.post.publishedOn": "Publicado em",
      "blog.post.moreAbout": "Mais sobre",
      "blog.post.relatedArticles": "Artigos Relacionados",
      "blog.post.allArticles": "Todos os Artigos",
      
      // Footer
      "blog.quickLinks": "Links Rápidos",
      "nav.home": "Início",
      "blog.allArticles": "Todos os Artigos",
      "main.blogSection": "Blog de Data Science",
      "blog.allRightsReserved": "Todos os direitos reservados.",
      "blog.builtWithPassion": "Construído com paixão por tecnologia.",
      "blog.socialMedia": "Redes Sociais",
      "blog.exploreMore": "Explore Mais",
      "blog.aboutUs": "Sobre Nós",
      "blog.contact": "Contato",
      
      // Common
      "common.category": "Categoria",
      "common.date": "Data",
      "common.readTime": "Tempo de Leitura",
    }
  },
  en: {
    translation: {
      // Categories
      "blog.categories.machineLearning": "Machine Learning",
      "blog.categories.dataAnalysis": "Data Analysis",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Data Visualization",
      "blog.categories.nlp": "NLP",
      "blog.categories": "Categories",
      
      // Hero Section
      "blog.hero.tagline": "Welcome to the Data Science blog",
      "blog.hero.description": "Explore tutorials, insights and projects about Machine Learning, data analysis and artificial intelligence.",
      
      // Search
      "blog.search": "Search articles...",
      
      // Featured Post
      "blog.featured": "Featured",
      "blog.read": "read",
      "blog.writtenBy": "Written by",
      "blog.readFullArticle": "Read full article",
      
      // Recent Posts
      "blog.latestArticles": "Latest Articles",
      "blog.latestDescription": "The most recent blog posts",
      "common.read": "Read",
      "blog.viewAll": "View all",
      "blog.noPostsFound": "No posts found for your search.",
      
      // Blog Post Page
      "blog.post.backToHome": "Back to home",
      "blog.post.backToBlog": "Back to blog",
      "blog.post.minRead": "min",
      "blog.post.author": "Author",
      "blog.post.tags": "Tags",
      "blog.post.share": "Share",
      "blog.post.save": "Save",
      "blog.post.readTime": "min read",
      "blog.post.publishedOn": "Published on",
      "blog.post.moreAbout": "More about",
      "blog.post.relatedArticles": "Related Articles",
      "blog.post.allArticles": "All Articles",
      
      // Sidebar
      "blog.quickStats": "Quick Stats",
      "blog.totalArticles": "Total Articles",
      "blog.categoriesCount": "Categories",
      "blog.authors": "Authors",
      "blog.newsletter": "Newsletter",
      "blog.newsletterDescription": "Receive the latest articles by email.",
      "blog.yourEmail": "Your email",
      "blog.subscribe": "Subscribe",
      "blog.topCategories": "Top Categories",
      
      // Footer
      "blog.quickLinks": "Quick Links",
      "nav.home": "Home",
      "blog.allArticles": "All Articles",
      "main.blogSection": "Data Science Blog",
      "blog.allRightsReserved": "All rights reserved.",
      "blog.builtWithPassion": "Built with passion for technology.",
      "blog.socialMedia": "Social Media",
      "blog.exploreMore": "Explore More",
      "blog.aboutUs": "About Us",
      "blog.contact": "Contact",
      
      // Common
      "common.category": "Category",
      "common.date": "Date",
      "common.readTime": "Read Time",
    }
  },
  de: {
    translation: {
      // Categories
      "blog.categories.machineLearning": "Maschinelles Lernen",
      "blog.categories.dataAnalysis": "Datenanalyse",
      "blog.categories.deepLearning": "Deep Learning",
      "blog.categories.dataVisualization": "Datenvisualisierung",
      "blog.categories.nlp": "NLP",
      "blog.categories": "Kategorien",
      
      // Hero Section
      "blog.hero.tagline": "Willkommen im Data-Science-Blog",
      "blog.hero.description": "Entdecken Sie Tutorials, Einblicke und Projekte zu maschinellem Lernen, Datenanalyse und künstlicher Intelligenz.",
      
      // Search
      "blog.search": "Artikel suchen...",
      
      // Featured Post
      "blog.featured": "Empfohlen",
      "blog.read": "Lesedauer",
      "blog.writtenBy": "Geschrieben von",
      "blog.readFullArticle": "Ganzen Artikel lesen",
      
      // Recent Posts
      "blog.latestArticles": "Neueste Artikel",
      "blog.latestDescription": "Die neuesten Blog-Beiträge",
      "common.read": "Lesen",
      "blog.viewAll": "Alle anzeigen",
      "blog.noPostsFound": "Keine Beiträge für Ihre Suche gefunden.",
      
      // Blog Post Page
      "blog.post.backToHome": "Zurück zur Startseite",
      "blog.post.backToBlog": "Zurück zum Blog",
      "blog.post.minRead": "Min",
      "blog.post.author": "Autor",
      "blog.post.tags": "Tags",
      "blog.post.share": "Teilen",
      "blog.post.save": "Speichern",
      "blog.post.readTime": "Min Lesezeit",
      "blog.post.publishedOn": "Veröffentlicht am",
      "blog.post.moreAbout": "Mehr über",
      "blog.post.relatedArticles": "Verwandte Artikel",
      "blog.post.allArticles": "Alle Artikel",
      
      // Sidebar
      "blog.quickStats": "Schnelle Statistiken",
      "blog.totalArticles": "Gesamtartikel",
      "blog.categoriesCount": "Kategorien",
      "blog.authors": "Autoren",
      "blog.newsletter": "Newsletter",
      "blog.newsletterDescription": "Erhalten Sie die neuesten Artikel per E-Mail.",
      "blog.yourEmail": "Ihre E-Mail",
      "blog.subscribe": "Abonnieren",
      "blog.topCategories": "Top-Kategorien",
      
      // Footer
      "blog.quickLinks": "Schnellzugriff",
      "nav.home": "Startseite",
      "blog.allArticles": "Alle Artikel",
      "main.blogSection": "Data Science Blog",
      "blog.allRightsReserved": "Alle Rechte vorbehalten.",
      "blog.builtWithPassion": "Mit Leidenschaft für Technologie gebaut.",
      "blog.socialMedia": "Soziale Medien",
      "blog.exploreMore": "Mehr entdecken",
      "blog.aboutUs": "Über uns",
      "blog.contact": "Kontakt",
      
      // Common
      "common.category": "Kategorie",
      "common.date": "Datum",
      "common.readTime": "Lesezeit",
    }
  }
};

// Inicializa i18next UMA VEZ
const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['path', 'cookie', 'navigator'],
      caches: ['cookie']
    }
  });

export default i18n;