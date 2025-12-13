// app/[lang]/page.tsx - Página principal do blog
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Search,
  TrendingUp,
  BarChart3,
  Cpu,
  Database,
  Brain,
  Clock,
  User,
  ChevronRight,
  Sparkles,
  Zap,
  Home,
  BookOpen,
  Tag,
  Calendar,
  ArrowRight,
  Globe,
  Code,
  PieChart,
  Mail,
} from "lucide-react";
import Image from "next/image";

// Tipos para os posts do blog
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime?: number;
  date: string;
  author: string;
  featured?: boolean;
  tags?: string[];
  language?: string;
  content?: string;
  coverImage?: string; // ← ADICIONE
}

interface CategoryStats {
  name: string;
  count: number;
  description: string;
  icon: React.ReactNode;
}

// Função para calcular tempo de leitura (cliente)
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Funções de serviço cliente
async function fetchAllPosts(lang: string = "pt"): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/blog/posts?lang=${lang}`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function fetchFeaturedPosts(
  lang: string = "pt",
  limit: number = 5
): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `/api/blog/posts?lang=${lang}&featured=true&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch featured posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

async function fetchRecentPosts(
  lang: string = "pt",
  limit: number = 10
): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/blog/posts?lang=${lang}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch recent posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export default function BlogHomePage() {
  const params = useParams();
  const { t } = useTranslation();
  const currentLang = (params?.lang as string) || "pt";

  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Cores mais sutis e modernas
  const colors = {
    // Cores primárias
    primary: {
      light: "#2563eb", // Blue-600
      dark: "#3b82f6", // Blue-500
    },
    // Cores de destaque
    accent: {
      light: "#7c3aed", // Purple-600
      dark: "#8b5cf6", // Purple-500
    },
    // Cores para categorias
    category: {
      "Machine Learning": { light: "#dc2626", dark: "#ef4444" }, // Red
      "Data Analysis": { light: "#059669", dark: "#10b981" }, // Emerald
      "Deep Learning": { light: "#7c3aed", dark: "#8b5cf6" }, // Purple
      "Data Visualization": { light: "#ea580c", dark: "#f97316" }, // Orange
      NLP: { light: "#0891b2", dark: "#06b6d4" }, // Cyan
    },
    // Fundos
    background: {
      light: "#ffffff",
      dark: "#0f172a", // Slate-900
    },
    card: {
      light: "#ffffff",
      dark: "#1e293b", // Slate-800
    },
    // Textos
    text: {
      primary: { light: "#1e293b", dark: "#f1f5f9" }, // Slate-800 / Slate-100
      secondary: { light: "#64748b", dark: "#94a3b8" }, // Slate-500 / Slate-400
      muted: { light: "#94a3b8", dark: "#64748b" }, // Slate-400 / Slate-500
    },
    // Bordas
    border: {
      light: "#e2e8f0", // Slate-200
      dark: "#334155", // Slate-700
    },
  };

  useEffect(() => {
    carregarDadosBlog();
  }, [currentLang]);

  // Função para traduzir categorias
  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Machine Learning":
        t("blog.categories.machineLearning") || "Machine Learning",
      "Data Analysis": t("blog.categories.dataAnalysis") || "Data Analysis",
      "Deep Learning": t("blog.categories.deepLearning") || "Deep Learning",
      "Data Visualization":
        t("blog.categories.dataVisualization") || "Data Visualization",
      NLP: t("blog.categories.nlp") || "NLP",
    };
    return categoryMap[category] || category;
  };

  // Função para obter descrição traduzida da categoria
  const translateCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      "Machine Learning": t(
        "blog.categories.machineLearning.description",
        "Algoritmos e modelos preditivos"
      ),
      "Data Analysis": t(
        "blog.categories.dataAnalysis.description",
        "Análise e interpretação de dados"
      ),
      "Deep Learning": t(
        "blog.categories.deepLearning.description",
        "Redes neurais avançadas"
      ),
      "Data Visualization": t(
        "blog.categories.dataVisualization.description",
        "Gráficos e dashboards"
      ),
      NLP: t(
        "blog.categories.nlp.description",
        "Processamento de linguagem natural"
      ),
    };
    return descriptions[category] || category;
  };

  const carregarDadosBlog = async () => {
    try {
      setCarregando(true);

      // Carregar posts reais da API
      const posts = await fetchAllPosts(currentLang);

      if (posts.length === 0) {
        throw new Error("No posts found");
      }

      // Formatar posts com readTime calculado se necessário
      const formattedPosts = posts.map((post) => ({
        ...post,
        readTime: post.readTime || calculateReadTime(post.content || ""),
        date: post.date || new Date().toISOString().split("T")[0],
      }));

      setAllPosts(formattedPosts);

      // Encontrar post em destaque (featured)
      const featured =
        formattedPosts.find((post) => post.featured) || formattedPosts[0];
      setFeaturedPost(featured || null);

      // Posts recentes (excluindo o featured)
      const recent = formattedPosts.slice(0, 6); // ← Remove o filtro
      setRecentPosts(recent);

      // Calcular categorias dinamicamente
      const categoryCounts: Record<string, number> = {};
      formattedPosts.forEach((post) => {
        categoryCounts[post.category] =
          (categoryCounts[post.category] || 0) + 1;
      });

      const categoryStats: CategoryStats[] = Object.entries(categoryCounts).map(
        ([name, count]) => {
          // Escolher ícone baseado na categoria
          let icon = <Brain className="h-4 w-4" />;
          switch (name) {
            case "Machine Learning":
              icon = <Brain className="h-4 w-4" />;
              break;
            case "Data Analysis":
              icon = <BarChart3 className="h-4 w-4" />;
              break;
            case "Deep Learning":
              icon = <Cpu className="h-4 w-4" />;
              break;
            case "Data Visualization":
              icon = <PieChart className="h-4 w-4" />;
              break;
            case "NLP":
              icon = <Globe className="h-4 w-4" />;
              break;
            default:
              icon = <Code className="h-4 w-4" />;
          }

          return {
            name,
            count,
            description: translateCategoryDescription(name),
            icon,
          };
        }
      );

      setCategories(categoryStats);
      setCarregando(false);
    } catch (error) {
      console.error("Erro ao carregar dados do blog:", error);
      // Fallback para dados simulados em caso de erro
      setTimeout(() => {
        const fallbackPosts: BlogPost[] = [
          {
            slug: "introducao-machine-learning",
            title: t(
              "blog.posts.5.title",
              "Processamento de Linguagem Natural na Prática"
            ),
            description: t(
              "blog.posts.5.description",
              "Aplicações reais de NLP e como implementar modelos de texto para análise de sentimentos e classificação de documentos."
            ),
            category: "NLP",
            readTime: 14,
            date: "2024-01-20",
            author: "Claudenir Nojosa",
            featured: true,
          },
          {
            slug: "visualizacao-dados-tableau",
            title: t(
              "blog.posts.4.title",
              "Visualização de Dados com Tableau: Técnicas Avançadas"
            ),
            description: t(
              "blog.posts.4.description",
              "Crie dashboards interativos e visuais impactantes para análises de dados corporativos complexos."
            ),
            category: "Data Visualization",
            readTime: 10,
            date: "2024-01-15",
            author: "Claudenir Nojosa",
            featured: false,
          },
          {
            slug: "deep-learning-arquiteturas-modernas",
            title: t(
              "blog.posts.3.title",
              "Deep Learning: Arquiteturas Modernas"
            ),
            description: t(
              "blog.posts.3.description",
              "Explore arquiteturas avançadas de redes neurais e suas aplicações em visão computacional."
            ),
            category: "Deep Learning",
            readTime: 15,
            date: "2024-01-10",
            author: "Claudenir Nojosa",
            featured: false,
          },
        ];

        const fallbackFeatured = fallbackPosts[0];
        setFeaturedPost(fallbackFeatured);
        setRecentPosts(fallbackPosts.slice(1));

        const fallbackCategories: CategoryStats[] = [
          {
            name: "Machine Learning",
            count: 24,
            description: translateCategoryDescription("Machine Learning"),
            icon: <Brain className="h-4 w-4" />,
          },
          {
            name: "Data Analysis",
            count: 18,
            description: translateCategoryDescription("Data Analysis"),
            icon: <BarChart3 className="h-4 w-4" />,
          },
          {
            name: "Deep Learning",
            count: 12,
            description: translateCategoryDescription("Deep Learning"),
            icon: <Cpu className="h-4 w-4" />,
          },
          {
            name: "Data Visualization",
            count: 15,
            description: translateCategoryDescription("Data Visualization"),
            icon: <PieChart className="h-4 w-4" />,
          },
          {
            name: "NLP",
            count: 8,
            description: translateCategoryDescription("NLP"),
            icon: <Globe className="h-4 w-4" />,
          },
        ];
        setCategories(fallbackCategories);
        setAllPosts(fallbackPosts);
        setCarregando(false);
      }, 1000);
    }
  };

  const getCategoryColor = (
    category: string,
    variant: "light" | "dark" = "light"
  ) => {
    const categoryColors =
      colors.category[category as keyof typeof colors.category];
    return categoryColors ? categoryColors[variant] : colors.primary[variant];
  };

  const formatarData = (data: string) => {
    try {
      return new Date(data).toLocaleDateString(
        currentLang === "pt"
          ? "pt-BR"
          : currentLang === "de"
            ? "de-DE"
            : "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    } catch (error) {
      return data;
    }
  };

  const filteredPosts = searchTerm
    ? recentPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          false
      )
    : recentPosts;

  // Função para navegar para o post
  const navigateToPost = (slug: string) => {
    window.location.href = `/${currentLang}/blog/${slug}`;
  };

  // Função para visualizar todos os posts
  const navigateToAllPosts = () => {
    window.location.href = `/${currentLang}/blog`;
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero loading */}
          <div className="mb-16 space-y-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-10 w-80 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-[400px] w-full rounded-2xl" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Versão Dark Mysterious */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-orange-950 to-gray-950 dark:from-black dark:via-gray-950 dark:to-black">
        {/* Efeito de estrelas/partículas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400/50 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-500/40 rounded-full animate-pulse"></div>
        </div>

        {/* Gradiente de brilho */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-orange-800/20 to-orange-900/10"></div>

        {/* Padrão de grade sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            {/* Logo Gargantua */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                {/* Glow effect around logo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-orange-800/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div>
                  <Image
                    src="https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/logo-branca.png"
                    alt="Gargantua Logo"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-md"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Título com efeito de brilho */}
            <div className="relative">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 dark:from-orange-500 dark:via-orange-400 dark:to-orange-300 bg-clip-text text-transparent drop-shadow-md">
                  Gargantua
                </span>
                <span className="block text-base md:text-lg lg:text-xl font-light text-orange-300/70 mt-1">
                  Data Science Insights
                </span>
              </h1>

              {/* Efeito de brilho atrás do texto */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl"></div>
            </div>

            {/* Descrição */}
            <p className="text-sm md:text-base text-orange-200/80 mb-6 leading-relaxed relative z-10">
              {t("blog.hero.description")}
            </p>

            {/* Barra de pesquisa com glow */}
            <div className="max-w-md mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-700 group-hover:duration-200"></div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400/80 group-focus-within:text-orange-300 transition-colors" />
                  <Input
                    placeholder={t("blog.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-gray-900/60 border-orange-800/30 text-white placeholder:text-orange-300/60 focus:border-orange-500/50 focus:ring-orange-500/20 backdrop-blur-sm text-sm h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2">
            {/* Featured Post com imagem acima */}
            {featuredPost && (
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                  <div className="flex items-center gap-2 px-4">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {t("blog.featured")}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                <Card
                  className="overflow-hidden border-0 shadow-lg dark:shadow-xl dark:shadow-black/20 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigateToPost(featuredPost.slug)}
                >
                  {/* Imagem de capa no topo */}
                  {featuredPost.coverImage && (
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        // Adicione estas props para debug
                        onError={(e) => {
                          console.error("❌ ERRO Image component:", {
                            src: featuredPost.coverImage,
                            error: e,
                            currentTarget: e.currentTarget,
                          });
                        }}
                        onLoad={() => {
                          console.log(
                            "✅ Imagem carregada com sucesso:",
                            featuredPost.coverImage
                          );
                        }}
                      />
                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {/* Badge sobre a imagem */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className="font-medium px-3 py-1 backdrop-blur-sm border-0 text-white"
                          style={{
                            backgroundColor:
                              getCategoryColor(featuredPost.category, "light") +
                              "80",
                          }}
                        >
                          {translateCategory(featuredPost.category)}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-8 md:p-10">
                    {/* Informações (se não tiver imagem) */}
                    {!featuredPost.coverImage && (
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <Badge
                          className="font-medium px-3 py-1"
                          style={{
                            backgroundColor:
                              getCategoryColor(featuredPost.category, "light") +
                              "15",
                            color: getCategoryColor(
                              featuredPost.category,
                              "dark"
                            ),
                            borderColor:
                              getCategoryColor(featuredPost.category, "light") +
                              "30",
                          }}
                        >
                          {translateCategory(featuredPost.category)}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatarData(featuredPost.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredPost.readTime} min {t("blog.read")}
                          </span>
                        </div>
                      </div>
                    )}

                    <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </CardTitle>

                    <CardDescription className="text-lg mb-8 leading-relaxed">
                      {featuredPost.description}
                    </CardDescription>

                    {/* Informações (se tiver imagem) */}
                    {featuredPost.coverImage && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatarData(featuredPost.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime} min {t("blog.read")}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src="/autor.jpg"
                              alt={`Foto do autor`}
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{t("blog.writtenBy")}</p>
                          <p className="text-muted-foreground">
                            {featuredPost.author}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="gap-2 group"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToPost(featuredPost.slug);
                        }}
                      >
                        {t("blog.readFullArticle")}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Recent Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {t("blog.latestArticles")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("blog.latestDescription")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={navigateToAllPosts}
                >
                  {t("blog.viewAll")}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card
                      key={post.slug}
                      className="group hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300 border hover:border-primary/20 cursor-pointer"
                      onClick={() => navigateToPost(post.slug)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          {/* Imagem à esquerda - Tamanho menor */}
                          {post.coverImage && (
                            <div className="md:w-48 flex-shrink-0">
                              <div className="relative h-40 md:h-36 w-full rounded-lg overflow-hidden">
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-300"
                                  sizes="(max-width: 768px) 100vw, 192px"
                                />
                                {/* Overlay sutil */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                                {/* Badge sobre a imagem (opcional) */}
                                <div className="absolute top-2 left-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5 backdrop-blur-sm"
                                    style={{
                                      backgroundColor:
                                        getCategoryColor(
                                          post.category,
                                          "light"
                                        ) + "80",
                                      color: "white",
                                      border: "none",
                                    }}
                                  >
                                    {translateCategory(post.category)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Conteúdo à direita */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {/* Badge (apenas se não tiver imagem ou como fallback) */}
                              {!post.coverImage && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-medium"
                                  style={{
                                    borderColor:
                                      getCategoryColor(post.category, "light") +
                                      "40",
                                    color: getCategoryColor(
                                      post.category,
                                      "dark"
                                    ),
                                  }}
                                >
                                  {translateCategory(post.category)}
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime} min
                              </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {post.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src="/autor.jpg"
                                    alt={`Foto do autor`}
                                    width={50}
                                    height={50}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {post.author}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatarData(post.date)}
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="self-start md:self-center gap-1 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToPost(post.slug);
                            }}
                          >
                            {t("common.read")}
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">
                        {t("blog.noPostsFound") ||
                          "Nenhum post encontrado para sua busca."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  {t("blog.categories")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSearchTerm(category.name)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor:
                              getCategoryColor(category.name, "light") + "15",
                            color: getCategoryColor(category.name, "dark"),
                          }}
                        >
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {translateCategory(category.name)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-foreground"
                      >
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>{t("blog.quickStats")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t("blog.totalArticles")}
                    </span>
                    <span className="font-semibold">{allPosts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t("blog.categoriesCount")}
                    </span>
                    <span className="font-semibold">{categories.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Image
                    src={
                      "https://raw.githubusercontent.com/Claudenir-Nojosa/servidor_estaticos/refs/heads/main/logo-branca.png"
                    }
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Gargantua</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("main.blogSection")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("blog.hero.description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t("blog.quickLinks")}</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => (window.location.href = `/${currentLang}`)}
                    className="text-sm transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-3 w-3" />
                    {t("nav.home")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={navigateToAllPosts}
                    className="text-sm transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <BookOpen className="h-3 w-3" />
                    {t("blog.allArticles")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {t("blog.categories")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Top Categories */}
            <div>
              <h4 className="font-semibold mb-4">{t("blog.topCategories")}</h4>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Badge
                    key={category.name}
                    variant="outline"
                    className="cursor-pointer hover:scale-105 transition-transform"
                    style={{
                      borderColor:
                        getCategoryColor(category.name, "light") + "40",
                      color: getCategoryColor(category.name, "dark"),
                      backgroundColor:
                        getCategoryColor(category.name, "light") + "10",
                    }}
                  >
                    {translateCategory(category.name)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gargantua.{" "}
              {t("blog.allRightsReserved", "All rights reserved.")}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t("blog.builtWithPassion")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
