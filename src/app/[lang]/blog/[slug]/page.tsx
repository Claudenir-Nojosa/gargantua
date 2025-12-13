// app/[lang]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/github.css";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  Home,
  ChevronRight,
  Globe,
  Twitter,
  Linkedin,
  Github,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Importe seus componentes customizados
import { BlogPost } from "../../../../../types/types";

// Função auxiliar para traduzir categorias
const translateCategory = (category: string, lang: string) => {
  const categoryMap: Record<string, Record<string, string>> = {
    "Machine Learning": {
      pt: "Machine Learning",
      en: "Machine Learning",
      de: "Maschinelles Lernen",
    },
    "Data Analysis": {
      pt: "Análise de Dados",
      en: "Data Analysis",
      de: "Datenanalyse",
    },
    "Deep Learning": {
      pt: "Deep Learning",
      en: "Deep Learning",
      de: "Deep Learning",
    },
    "Data Visualization": {
      pt: "Visualização de Dados",
      en: "Data Visualization",
      de: "Datenvisualisierung",
    },
    NLP: {
      pt: "NLP",
      en: "NLP",
      de: "NLP",
    },
  };

  return categoryMap[category]?.[lang] || category;
};

// Componentes customizados para MDX - ATUALIZADOS
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-6 text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-bold mt-6 mb-2 text-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 leading-relaxed text-foreground/90" {...props} />
  ),
  code: (props: any) => {
    // Check if this is inline code or block code
    const isInline = !props.className;

    if (isInline) {
      return (
        <code
          className="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        />
      );
    }

    return <code {...props} />;
  },
  pre: (props: any) => {
    const isOutput =
      props.children?.props?.className?.includes("language-text");
    const isInput =
      props.children?.props?.className?.includes("language-python");

    return (
      <div className="my-6">
        {isInput && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-t-lg">
            <div className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400"></div>
            <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
              Input
            </span>
          </div>
        )}
        {isOutput && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800/30 rounded-t-lg">
            <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"></div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Output
            </span>
          </div>
        )}
        <div className="overflow-x-auto rounded-b-lg border border-gray-200 dark:border-gray-800/50">
          <pre
            className={`
            ${isInput || isOutput ? "rounded-t-none" : "rounded-lg"}
            p-4 text-sm font-mono
            bg-white dark:bg-gray-900/40
            text-gray-900 dark:text-gray-100
            min-w-min
          `}
            {...props}
          />
        </div>
      </div>
    );
  },
  ul: (props: any) => (
    <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  img: (props: any) => (
    <div className="my-8">
      <img
        className="rounded-lg mx-auto max-w-full border border-border"
        alt={props.alt || ""}
        {...props}
      />
    </div>
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6 py-2 bg-muted/50 text-foreground/80"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8 border border-border rounded-lg scrollbar-thin">
      <table className="min-w-full divide-y divide-border text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-muted" {...props} />,
  tbody: (props: any) => (
    <tbody className="divide-y divide-border" {...props} />
  ),
  th: (props: any) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground border-b border-border"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="px-4 py-3 text-foreground/90 border-b border-border"
      {...props}
    />
  ),
  hr: (props: any) => <hr className="my-8 border-border" {...props} />,
  strong: (props: any) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

// Função para obter cores de categoria
const getCategoryColor = (
  category: string,
  type: "light" | "dark" = "light"
) => {
  const colors: Record<string, string> = {
    "Machine Learning": type === "light" ? "#3b82f6" : "#60a5fa",
    "Data Analysis": type === "light" ? "#10b981" : "#34d399",
    "Deep Learning": type === "light" ? "#8b5cf6" : "#a78bfa",
    "Data Visualization": type === "light" ? "#f59e0b" : "#fbbf24",
    NLP: type === "light" ? "#ec4899" : "#f472b6",
  };
  return colors[category] || (type === "light" ? "#6b7280" : "#9ca3af");
};

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;

  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  // Usar traduções diretamente sem o hook useTranslation
  // (já que estamos em server component)
  const translations = {
    pt: {
      backToHome: "Voltar ao início",
      backToBlog: "Voltar ao blog",
      minRead: "min",
      author: "Autor",
      tags: "Tags",
      share: "Compartilhar",
      save: "Salvar",
      readTime: "min de leitura",
      publishedOn: "Publicado em",
      moreAbout: "Mais sobre",
      allArticles: "Todos os Artigos",
      home: "Início",
      blogDescription:
        "Explore tutoriais, insights e projetos sobre Machine Learning, análise de dados e inteligência artificial.",
      quickLinks: "Links Rápidos",
      allRightsReserved: "Todos os direitos reservados.",
      builtWithPassion: "Construído com paixão por tecnologia.",
      socialMedia: "Redes Sociais",
      topCategories: "Principais Categorias",
    },
    en: {
      backToHome: "Back to home",
      backToBlog: "Back to blog",
      minRead: "min",
      author: "Author",
      tags: "Tags",
      share: "Share",
      save: "Save",
      readTime: "min read",
      publishedOn: "Published on",
      moreAbout: "More about",
      allArticles: "All Articles",
      home: "Home",
      blogDescription:
        "Explore tutorials, insights and projects about Machine Learning, data analysis and artificial intelligence.",
      quickLinks: "Quick Links",
      allRightsReserved: "All rights reserved.",
      builtWithPassion: "Built with passion for technology.",
      socialMedia: "Social Media",
      topCategories: "Top Categories",
    },
    de: {
      backToHome: "Zurück zur Startseite",
      backToBlog: "Zurück zum Blog",
      minRead: "Min",
      author: "Autor",
      tags: "Tags",
      share: "Teilen",
      save: "Speichern",
      readTime: "Min Lesezeit",
      publishedOn: "Veröffentlicht am",
      moreAbout: "Mehr über",
      allArticles: "Alle Artikel",
      home: "Startseite",
      blogDescription:
        "Entdecken Sie Tutorials, Einblicke und Projekte zu maschinellem Lernen, dadosanalyse und künstlicher Intelligenz.",
      quickLinks: "Schnellzugriff",
      allRightsReserved: "Alle Rechte vorbehalten.",
      builtWithPassion: "Mit Leidenschaft für Technologie gebaut.",
      socialMedia: "Soziale Medien",
      topCategories: "Top-Kategorien",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.pt;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      lang === "pt" ? "pt-BR" : lang === "de" ? "de-DE" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // Categorias comuns para o footer
  const commonCategories = [
    { name: "Machine Learning", count: 12 },
    { name: "Data Analysis", count: 8 },
    { name: "Deep Learning", count: 5 },
    { name: "Data Visualization", count: 7 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section do artigo - MODIFICADO: Menor e mais clean */}
      <div className="relative border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link
              href={`/${lang}`}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              {t.backToHome}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">
              {translateCategory(post.category, lang)}
            </span>
          </div>

          {/* Cabeçalho do artigo - Simplificado */}
          <header className="mb-8">
            {/* Categoria e data */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Badge variant="secondary" className="font-medium px-3 py-1">
                {translateCategory(post.category, lang)}
              </Badge>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} {t.minRead}
                </span>
              </div>
            </div>
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-foreground">
              {post.title}
            </h1>
            {/* Descrição */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {post.description}
            </p>
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src="/autor.jpg"
                    alt={`Foto de ${post.author}`}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {post.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.author}</p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Imagem de capa (movida para dentro do conteúdo) */}
        {post.coverImage && (
          <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-8 border border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        )}

        {/* Conteúdo MDX */}
        <div className="mb-16">
          <article
            className="prose prose-lg dark:prose-invert max-w-none
      prose-headings:text-foreground
      prose-p:text-foreground/90
      prose-strong:text-foreground
      prose-li:text-foreground/90
      prose-blockquote:text-foreground/80
      prose-code:text-foreground
      prose-pre:!bg-gray-50
      prose-pre:!text-gray-900
      prose-pre:!border prose-pre:!border-gray-200
      dark:prose-pre:!bg-gray-900/80
      dark:prose-pre:!text-gray-200
      dark:prose-pre:!border-gray-700/50
      prose-table:border-border
      prose-th:text-foreground
      prose-td:text-foreground/90
      prose-a:text-blue-500
      dark:prose-a:text-blue-400
      hover:prose-a:text-blue-600
      dark:hover:prose-a:text-blue-300
    "
          >
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [
                      rehypeHighlight,
                      {
                        detect: true,
                        ignoreMissing: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </article>
        </div>

        {/* Tags no final do artigo */}
        {post.tags && post.tags.length > 0 && (
          <Card className="p-6 mb-8 bg-card border-border">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                {t.tags}:
              </span>
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </main>

      {/* Footer com duas colunas */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Coluna da ESQUERDA - Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 dark:from-orange-800 dark:to-orange-900 flex items-center justify-center">
                  <Image
                    src="https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/logo-branca.png"
                    width={40}
                    height={40}
                    alt="Gargantua Logo"
                    className="filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Gargantua
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Data Science Insights
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.blogDescription}
              </p>
            </div>

            {/* Coluna da DIREITA - Quick Links */}
            <div className="md:text-right space-y-8">
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-left md:text-right text-foreground">
                  {t.quickLinks}
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={`/${lang}`}
                      className="text-sm transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground md:justify-end"
                    >
                      <span>{t.home}</span>
                      <Home className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${lang}/blog`}
                      className="text-sm transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground md:justify-end"
                    >
                      <span>{t.allArticles}</span>
                      <BookOpen className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${lang}/blog?category=${post.category}`}
                      className="text-sm transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground md:justify-end"
                    >
                      <span>
                        {t.moreAbout} {translateCategory(post.category, lang)}
                      </span>
                      <Tag className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gargantua. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

async function getPost(slug: string, lang: string): Promise<BlogPost | null> {
  try {
    const possibleExtensions = [".mdx", ".md"];
    const postsDir = path.join(process.cwd(), "src/content/blog/posts", lang);

    for (const ext of possibleExtensions) {
      const filePath = path.join(postsDir, `${slug}${ext}`);

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // Garantir que os campos obrigatórios existam
        return {
          slug,
          title: data.title || "",
          description: data.description || "",
          category: data.category || "Uncategorized",
          tags: Array.isArray(data.tags) ? data.tags : [],
          readTime: data.readTime || 5,
          date: data.date || new Date().toISOString().split("T")[0],
          author: data.author || "Claudenir Nojosa",
          featured: Boolean(data.featured),
          language: data.language || lang,
          coverImage: data.coverImage,
          content,
        } as BlogPost;
      }
    }

    return null;
  } catch (error) {
    console.error(`Erro ao ler post ${slug}:`, error);
    return null;
  }
}

// Gerar slugs estáticos
export async function generateStaticParams() {
  const languages = ["pt", "en", "de"];
  const posts: Array<{ lang: string; slug: string }> = [];

  for (const lang of languages) {
    const langDir = path.join(process.cwd(), "src/content/blog/posts", lang);

    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir);

      files.forEach((file) => {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          posts.push({
            lang,
            slug: file.replace(/\.(mdx|md)$/, ""),
          });
        }
      });
    }
  }

  return posts;
}
