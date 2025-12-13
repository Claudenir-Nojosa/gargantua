"use client";

import React, { useEffect, useState } from 'react';
import './EmbeddedNotebook.css'; // Criaremos este CSS depois

interface EmbeddedNotebookProps {
  htmlPath: string;
  title?: string;
  className?: string;
}

const EmbeddedNotebook: React.FC<EmbeddedNotebookProps> = ({ 
  htmlPath, 
  title,
  className = '' 
}) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHtml = async () => {
      try {
        setIsLoading(true);
        
        // Carrega o arquivo HTML
        const response = await fetch(htmlPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load notebook: ${response.status}`);
        }
        
        let html = await response.text();
        
        // Otimizações no HTML
        html = optimizeNotebookHtml(html);
        
        setHtmlContent(html);
        setError(null);
      } catch (err) {
        console.error('Error loading notebook:', err);
        setError(err instanceof Error ? err.message : 'Failed to load notebook');
      } finally {
        setIsLoading(false);
      }
    };

    loadHtml();
  }, [htmlPath]);

  // Função para otimizar o HTML do notebook
  const optimizeNotebookHtml = (html: string): string => {
    // 1. Remove scripts desnecessários (segurança)
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // 2. Remove estilos inline problemáticos
    html = html.replace(/style="[^"]*"/g, (match) => {
      // Mantém apenas estilos seguros
      if (match.includes('color') || match.includes('background') || match.includes('padding')) {
        return match;
      }
      return '';
    });
    
    // 3. Adiciona classes para nosso CSS customizar
    html = html.replace(/<table/g, '<table class="notebook-table"');
    html = html.replace(/<pre/g, '<pre class="notebook-code"');
    html = html.replace(/<code/g, '<code class="notebook-inline-code"');
    
    return html;
  };

  if (isLoading) {
    return (
      <div className={`notebook-loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Carregando notebook...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`notebook-error ${className}`}>
        <h3>Erro ao carregar notebook</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={`embedded-notebook ${className}`}>
      {title && <h2 className="notebook-title">{title}</h2>}
      
      <div className="notebook-container">
        {/* Sandbox para segurança */}
        <iframe
          title={title || "Jupyter Notebook"}
          srcDoc={htmlContent}
          className="notebook-iframe"
          sandbox="allow-same-origin"
          loading="lazy"
        />
        
        {/* Fallback para navegadores sem iframe sandbox */}
        <div 
          className="notebook-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ display: 'none' }} // Escondido por padrão
        />
      </div>
      
      <div className="notebook-actions">
        <a 
          href={htmlPath} 
          download
          className="download-button"
        >
          📥 Download HTML
        </a>
        <button 
          className="fullscreen-button"
          onClick={() => {
            const iframe = document.querySelector('.notebook-iframe') as HTMLIFrameElement;
            iframe?.requestFullscreen?.();
          }}
        >
          🔍 Tela cheia
        </button>
      </div>
    </div>
  );
};

export default EmbeddedNotebook;