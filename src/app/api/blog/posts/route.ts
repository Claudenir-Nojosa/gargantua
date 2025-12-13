// src/app/api/blog/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/blog/posts");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "pt";
    const limit = parseInt(searchParams.get("limit") || "10");
    const slug = searchParams.get("slug");

    console.log(`🔍 Buscando posts para lang: ${lang}`);

    const langDirectory = path.join(POSTS_DIRECTORY, lang);
    
    if (!fs.existsSync(langDirectory)) {
      console.error(`❌ Diretório não existe: ${langDirectory}`);
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(langDirectory);
    
    // Buscar post específico por slug
    if (slug) {
      const possibleExtensions = ['.mdx', '.md'];
      for (const ext of possibleExtensions) {
        const fullPath = path.join(langDirectory, `${slug}${ext}`);
        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const matterResult = matter(fileContents);
          
          console.log(`📦 Frontmatter completo:`, matterResult.data);
          console.log(`🖼️ coverImage existe?`, 'coverImage' in matterResult.data);
          console.log(`🖼️ Valor do coverImage:`, matterResult.data.coverImage);
          
          const post = {
            slug,
            title: matterResult.data.title || '',
            description: matterResult.data.description || '',
            category: matterResult.data.category || '',
            date: matterResult.data.date || new Date().toISOString().split('T')[0],
            author: matterResult.data.author || '',
            readTime: matterResult.data.readTime || 0,
            featured: matterResult.data.featured || false,
            tags: matterResult.data.tags || [],
            language: matterResult.data.language || lang,
            coverImage: matterResult.data.coverImage || null, // ← INCLUA AQUI
            content: matterResult.content,
          };
          
          console.log(`✅ Post retornado:`, Object.keys(post));
          return NextResponse.json(post);
        }
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Buscar todos os posts
    const mdxFiles = fileNames.filter(
      (fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md")
    );

    if (mdxFiles.length === 0) {
      return NextResponse.json([]);
    }

    const allPosts = mdxFiles
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.(mdx|md)$/, "");
          const fullPath = path.join(langDirectory, fileName);
          
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const matterResult = matter(fileContents);
          
          // DEBUG: Verificar coverImage no frontmatter
          console.log(`📄 ${slug} - coverImage:`, matterResult.data.coverImage || 'NÃO ENCONTRADO');

          // Construir post com TODAS as propriedades, incluindo coverImage
          const post = {
            slug,
            title: matterResult.data.title || "Sem título",
            description: matterResult.data.description || "Sem descrição",
            category: matterResult.data.category || "Sem categoria",
            date: matterResult.data.date || new Date().toISOString().split("T")[0],
            author: matterResult.data.author || "Autor desconhecido",
            readTime: matterResult.data.readTime || 5,
            featured: matterResult.data.featured || false,
            tags: matterResult.data.tags || [],
            language: matterResult.data.language || lang,
            coverImage: matterResult.data.coverImage || null, // ← INCLUA AQUI
            content: matterResult.content,
          };

          return post;
        } catch (error) {
          console.error(`❌ Erro ao processar ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`🎯 Total de posts processados: ${allPosts.length}`);
    
    // Log para verificar coverImage nos posts
    allPosts.forEach((post, index) => {
      console.log(`📊 Post ${index + 1}:`, {
        title: post.title,
        hasCoverImage: !!post.coverImage,
        coverImage: post.coverImage
      });
    });

    const limitedPosts = allPosts.slice(0, limit);
    return NextResponse.json(limitedPosts);
    
  } catch (error) {
    console.error("❌ Erro crítico ao carregar posts:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}