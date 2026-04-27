---
name: seo-pagespeed-optimizer
description: >
  Analisa e otimiza automaticamente o código de um projeto web para atingir nota A no Google PageSpeed Insights,
  especialmente em mobile. Aplica conversão de imagens para WebP/AVIF, extração de CSS crítico, lazy loading,
  dados estruturados, meta tags de SEO, compressão, cache headers e todas as boas práticas do Core Web Vitals.
  Use quando o usuário pedir otimização de SEO, PageSpeed, performance, imagens WebP, CSS crítico, Web Vitals,
  nota A no Lighthouse, ou qualquer melhoria de velocidade e rankeamento no Google.
---

# SEO + PageSpeed Optimizer

Você é um especialista em performance web e SEO técnico. Seu objetivo é analisar o código do projeto e aplicar todas as otimizações necessárias para que as páginas atinjam **nota A (90+) no Google PageSpeed Insights**, especialmente em dispositivos móveis.

Siga este processo rigoroso, passo a passo, **sem pular etapas**.

---

## FASE 1 — RECONHECIMENTO DO PROJETO

Antes de qualquer mudança, entenda o projeto:

```bash
# Identificar o tipo de projeto
ls -la
cat package.json 2>/dev/null || echo "Sem package.json"
```

Identifique:
- **Stack**: Next.js, Nuxt, Astro, HTML estático, WordPress, Laravel, etc.
- **Bundler**: Vite, Webpack, esbuild, Parcel
- **Servidor**: Node, Nginx, Apache, Vercel, Netlify, Cloudflare
- **Pasta de imagens**: `/public`, `/assets`, `/static`, `/images`, `/src/assets`
- **Arquivos de configuração existentes**: `next.config.js`, `vite.config.ts`, `astro.config.mjs`, `.htaccess`, `nginx.conf`

Apresente um **resumo do projeto** antes de continuar.

---

## FASE 2 — AUDITORIA COMPLETA

Execute a auditoria em todas as categorias abaixo. Para cada item, registre: ✅ OK | ⚠️ Atenção | ❌ Crítico.

### 2.1 Imagens

```bash
# Encontrar todas as imagens no projeto
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.svg" -o -iname "*.webp" -o -iname "*.avif" \) \
  ! -path "*/node_modules/*" ! -path "*/.git/*" | sort

# Tamanho de cada imagem
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) \
  ! -path "*/node_modules/*" | xargs ls -lh 2>/dev/null
```

Verifique:
- [ ] Imagens em formato legado (JPG, PNG, GIF) → devem virar WebP/AVIF
- [ ] Imagens sem `loading="lazy"` (exceto above-the-fold)
- [ ] Imagens sem atributo `alt`
- [ ] Imagens sem `width` e `height` explícitos (causa Layout Shift = CLS ruim)
- [ ] Ausência de `srcset` / `sizes` para responsividade
- [ ] Imagens maiores que necessário (ex: foto 4000px numa coluna de 400px)

### 2.2 CSS

```bash
# Listar arquivos CSS e seus tamanhos
find . -name "*.css" ! -path "*/node_modules/*" | xargs ls -lh 2>/dev/null

# Verificar se há CSS inline crítico no HTML
grep -r "style>" --include="*.html" --include="*.jsx" --include="*.tsx" --include="*.vue" -l 2>/dev/null | head -5

# Procurar imports de fontes externas (Google Fonts, etc.)
grep -r "fonts.googleapis\|fonts.gstatic\|typekit\|use.fontawesome" --include="*.html" --include="*.css" --include="*.js" --include="*.ts" -l 2>/dev/null
```

Verifique:
- [ ] CSS crítico não está inlinado no `<head>`
- [ ] Arquivos CSS não estão minificados
- [ ] Google Fonts carregado sem `display=swap`
- [ ] CSS carregado de forma render-blocking (sem `media` queries ou `preload`)
- [ ] Ausência de `font-display: swap` nos `@font-face`
- [ ] CSS de terceiros desnecessário

### 2.3 JavaScript

```bash
# Listar bundles JS
find . -name "*.js" -path "*/dist/*" -o -name "*.js" -path "*/_next/*" 2>/dev/null | xargs ls -lh 2>/dev/null | sort -rh | head -20

# Scripts sem defer/async no HTML
grep -r "<script" --include="*.html" --include="*.php" . 2>/dev/null | grep -v "async\|defer\|type=\"module\"\|node_modules" | head -10
```

Verifique:
- [ ] Scripts sem `defer` ou `async`
- [ ] JS desnecessário carregado no `<head>`
- [ ] Bundles muito grandes (>250KB não comprimido)
- [ ] Ausência de code splitting

### 2.4 HTML e SEO

```bash
# Verificar meta tags nas páginas principais
find . -name "*.html" -o -name "index.html" ! -path "*/node_modules/*" | head -5 | xargs grep -l "<!DOCTYPE" 2>/dev/null | while read f; do
  echo "=== $f ==="
  grep -E "<title|<meta name=\"description|<meta name=\"robots|<link rel=\"canonical|<meta property=\"og|<meta name=\"twitter|<meta name=\"viewport|<link rel=\"icon|application/ld\+json" "$f" 2>/dev/null
  echo ""
done
```

Verifique:
- [ ] `<title>` presente e entre 50-60 caracteres
- [ ] `<meta name="description">` entre 120-155 caracteres
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<link rel="canonical">` em cada página
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- [ ] Favicon em múltiplos tamanhos (16x16, 32x32, 180x180 apple-touch-icon)
- [ ] `<html lang="pt-BR">` (ou idioma correto)
- [ ] Schema.org JSON-LD para o tipo de página
- [ ] Hierarquia de headings correta (um único H1, H2, H3 em ordem)
- [ ] Sitemap.xml acessível em `/sitemap.xml`
- [ ] Robots.txt em `/robots.txt`

### 2.5 Performance Servidor

```bash
# Verificar headers de cache/compressão (se servidor local disponível)
curl -I http://localhost:3000 2>/dev/null || curl -I http://localhost:8080 2>/dev/null || echo "Servidor não rodando localmente"

# Verificar configuração Nginx/Apache
find . -name "nginx.conf" -o -name ".htaccess" -o -name "vercel.json" -o -name "netlify.toml" -o -name "_headers" 2>/dev/null
```

Verifique:
- [ ] Compressão Gzip ou Brotli ativa
- [ ] `Cache-Control` com `max-age` longo para assets com hash
- [ ] Headers de segurança (X-Content-Type-Options, X-Frame-Options)
- [ ] HTTPS forçado

---

## FASE 3 — RELATÓRIO DE AUDITORIA

Antes de qualquer modificação, apresente um relatório assim:

```
╔══════════════════════════════════════════════════════════════╗
║           RELATÓRIO DE AUDITORIA SEO + PAGESPEED             ║
╠══════════════════════════════════════════════════════════════╣
║  Stack detectada: [STACK]                                    ║
║  Dispositivo foco: Mobile                                    ║
╠══════════════════════════════════════════════════════════════╣
║  CATEGORIA         ITENS  CRÍTICOS  ATENÇÃO   OK             ║
║  Imagens            [N]     [N]       [N]     [N]            ║
║  CSS/Fontes         [N]     [N]       [N]     [N]            ║
║  JavaScript         [N]     [N]       [N]     [N]            ║
║  HTML/SEO           [N]     [N]       [N]     [N]            ║
║  Servidor/Cache     [N]     [N]       [N]     [N]            ║
╠══════════════════════════════════════════════════════════════╣
║  ESTIMATIVA DE IMPACTO NO SCORE                              ║
║  Performance:  [score estimado antes → depois]               ║
║  SEO:          [score estimado antes → depois]               ║
║  Acessibilidade: [score estimado antes → depois]             ║
╚══════════════════════════════════════════════════════════════╝

PROBLEMAS CRÍTICOS (corrigir primeiro):
  ❌ [descrição do problema + arquivo + linha]
  ...

ATENÇÃO:
  ⚠️  [descrição]
  ...

PRONTOS:
  ✅ [o que já está correto]
```

**Aguarde confirmação do usuário antes de aplicar as correções**, a menos que ele já tenha pedido para corrigir tudo automaticamente.

---

## FASE 4 — APLICAÇÃO DAS OTIMIZAÇÕES

Aplique na seguinte ordem de prioridade (maior impacto no score primeiro):

### 4.1 — Imagens (maior impacto no LCP e Performance)

#### Instalar ferramentas de conversão

```bash
# Verificar disponibilidade
command -v cwebp >/dev/null 2>&1 && echo "cwebp OK" || echo "instalar: brew install webp / apt install webp"
command -v avifenc >/dev/null 2>&1 && echo "avifenc OK" || echo "avifenc não disponível"
command -v ffmpeg >/dev/null 2>&1 && echo "ffmpeg OK"
command -v sharp >/dev/null 2>&1 || node -e "require('sharp')" 2>/dev/null && echo "sharp OK"

# Se Node disponível, instalar sharp (mais completo)
npm list sharp 2>/dev/null | grep sharp || npm install sharp --save-dev 2>/dev/null
```

#### Script de conversão de imagens

Crie o arquivo `scripts/optimize-images.js` (ou `.mjs`):

```javascript
// scripts/optimize-images.js
// Converte JPG/PNG para WebP e AVIF, mantendo originais como fallback
// Uso: node scripts/optimize-images.js [--dir ./public/images] [--quality 80]

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRS = ['./public', './assets', './static', './src/assets'].filter(d => fs.existsSync(d));
const QUALITY_WEBP = 82;   // Equilíbrio qualidade/tamanho
const QUALITY_AVIF = 65;   // AVIF tolera qualidade menor com visual equivalente
const MAX_WIDTH = 1920;    // Largura máxima para desktop
const SIZES = [320, 640, 960, 1280, 1920]; // Breakpoints para srcset

async function convertImages(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await convertImages(fullPath); // Recursivo
      continue;
    }
    
    const ext = path.extname(file.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    
    const base = fullPath.slice(0, -ext.length);
    
    try {
      const img = sharp(fullPath);
      const meta = await img.metadata();
      
      console.log(`\n📸 ${file.name} (${meta.width}x${meta.height})`);
      
      // Converter para WebP
      const webpPath = `${base}.webp`;
      if (!fs.existsSync(webpPath)) {
        await img.clone()
          .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
          .webp({ quality: QUALITY_WEBP, effort: 6 })
          .toFile(webpPath);
        const orig = fs.statSync(fullPath).size;
        const newSize = fs.statSync(webpPath).size;
        console.log(`  ✅ WebP: ${(orig/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${Math.round((1-newSize/orig)*100)}%)`);
      } else {
        console.log(`  ⏭️  WebP já existe`);
      }
      
      // Converter para AVIF (melhor compressão, suporte moderno)
      const avifPath = `${base}.avif`;
      if (!fs.existsSync(avifPath)) {
        await img.clone()
          .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
          .avif({ quality: QUALITY_AVIF, effort: 6 })
          .toFile(avifPath);
        const orig = fs.statSync(fullPath).size;
        const newSize = fs.statSync(avifPath).size;
        console.log(`  ✅ AVIF: ${(orig/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (-${Math.round((1-newSize/orig)*100)}%)`);
      } else {
        console.log(`  ⏭️  AVIF já existe`);
      }
      
    } catch (e) {
      console.error(`  ❌ Erro em ${file.name}:`, e.message);
    }
  }
}

(async () => {
  for (const dir of DIRS) {
    console.log(`\n📁 Processando: ${dir}`);
    await convertImages(dir);
  }
  console.log('\n✅ Conversão concluída!');
})();
```

Execute: `node scripts/optimize-images.js`

#### Atualizar tags `<img>` para usar `<picture>` com formatos modernos

Para cada imagem encontrada no HTML/JSX/Vue/Blade, substitua:

```html
<!-- ANTES -->
<img src="/images/hero.jpg" alt="Hero" />

<!-- DEPOIS — suporte a AVIF > WebP > JPG com lazy loading e CLS zero -->
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  <img
    src="/images/hero.jpg"
    alt="Descrição clara da imagem"
    width="1200"
    height="630"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Exceção — imagens LCP (acima do fold, primeira imagem visível):**
```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  <img
    src="/images/hero.jpg"
    alt="..."
    width="1200"
    height="630"
    loading="eager"
    fetchpriority="high"
    decoding="sync"
  />
</picture>
```

**Para imagens responsivas com srcset:**
```html
<picture>
  <source
    type="image/avif"
    srcset="/images/hero-320.avif 320w,
            /images/hero-640.avif 640w,
            /images/hero-960.avif 960w,
            /images/hero-1280.avif 1280w"
    sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 80vw,
           1280px"
  />
  <source
    type="image/webp"
    srcset="/images/hero-320.webp 320w,
            /images/hero-640.webp 640w,
            /images/hero-960.webp 960w,
            /images/hero-1280.webp 1280w"
    sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 80vw,
           1280px"
  />
  <img src="/images/hero-1280.jpg" alt="..." width="1280" height="720" loading="lazy" />
</picture>
```

**Se o projeto for Next.js**, usar o componente nativo:
```jsx
import Image from 'next/image';

// Next.js já converte para WebP/AVIF automaticamente
<Image
  src="/images/hero.jpg"
  alt="Descrição"
  width={1200}
  height={630}
  priority={true}  // Apenas para imagem LCP (above-the-fold)
  quality={85}
/>
```

E adicionar no `next.config.js`:
```js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};
```

**Se o projeto for Astro**, usar:
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---
<Image src={heroImage} alt="..." width={1200} height={630} format="avif" />
```

### 4.2 — CSS Crítico e Fontes

#### Extrair CSS crítico (above-the-fold)

Instale e execute:
```bash
npm install --save-dev critical penthouse 2>/dev/null

# Gerar CSS crítico automaticamente
npx critical --base dist/ --css dist/assets/style.css --width 375 --height 812 dist/index.html --inline --minify
```

Ou adicione o script de build:
```js
// scripts/critical-css.js
const critical = require('critical');

critical.generate({
  base: 'dist/',
  src: 'index.html',
  target: 'index.html',
  width: 375,     // Mobile first
  height: 812,
  inline: true,   // Inlina o CSS crítico no <head>
  minify: true,
  extract: true,  // Remove do CSS externo o que foi inlinado
});
```

#### Otimizar carregamento de fontes

Substitua:
```html
<!-- ANTES: render-blocking -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
```

Por:
```html
<!-- DEPOIS: non-render-blocking + preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
</noscript>
```

**Melhor ainda — hospedar fontes localmente:**
```bash
npx google-webfonts-helper --fonts "Inter" --subsets "latin" --output ./public/fonts
```

```css
/* Em seu CSS global */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-v13-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;   /* Evita FOIT — texto visível durante carregamento */
}
```

#### Adicionar preload de recursos críticos no `<head>`

```html
<head>
  <!-- Preload do CSS principal -->
  <link rel="preload" href="/assets/style.css" as="style" />
  
  <!-- Preload da fonte principal usada above-the-fold -->
  <link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin />
  
  <!-- Preload da imagem LCP (hero) -->
  <link rel="preload" href="/images/hero.avif" as="image" type="image/avif" />

  <!-- DNS prefetch para domínios de terceiros -->
  <link rel="dns-prefetch" href="//www.google-analytics.com" />
  <link rel="dns-prefetch" href="//cdn.example.com" />
</head>
```

#### Minificar CSS (se não houver build pipeline)

```bash
npm install --save-dev cssnano postcss postcss-cli

# postcss.config.js
module.exports = { plugins: [require('cssnano')({ preset: 'default' })] };

# Executar
npx postcss src/style.css -o dist/style.min.css
```

### 4.3 — JavaScript

Adicione `defer` ou `async` em todos os scripts não críticos:

```html
<!-- ANTES -->
<script src="/js/analytics.js"></script>
<script src="/js/chat-widget.js"></script>

<!-- DEPOIS -->
<script src="/js/analytics.js" defer></script>          <!-- Mantém ordem de execução -->
<script src="/js/chat-widget.js" async></script>        <!-- Chat pode carregar independente -->
```

Scripts de terceiros carregados apenas quando necessário:
```html
<!-- Carregar GA4 após o carregamento da página -->
<script>
  window.addEventListener('load', function() {
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX';
    s.async = true;
    document.head.appendChild(s);
  });
</script>
```

### 4.4 — Meta Tags SEO e Estrutura HTML

Adicione (ou complete) o `<head>` de cada página com:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <!-- SEO básico -->
  <title>[Keyword Principal] — [Nome do Site] | [Benefício]</title>
  <meta name="description" content="[120-155 caracteres: keyword + proposta de valor + CTA suave]" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://seusite.com.br/pagina-atual" />

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://seusite.com.br/pagina-atual" />
  <meta property="og:title" content="[Título para redes sociais — pode ser diferente do <title>]" />
  <meta property="og:description" content="[Descrição para redes sociais]" />
  <meta property="og:image" content="https://seusite.com.br/images/og-pagina.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="[Nome do Site]" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@seuhandle" />
  <meta name="twitter:title" content="[Título]" />
  <meta name="twitter:description" content="[Descrição]" />
  <meta name="twitter:image" content="https://seusite.com.br/images/og-pagina.jpg" />

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#ffffff" />

  <!-- Schema.org JSON-LD — adapte para o tipo de página -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "[Título da Página]",
    "description": "[Descrição]",
    "url": "https://seusite.com.br/pagina-atual",
    "inLanguage": "pt-BR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "[Nome do Site]",
      "url": "https://seusite.com.br"
    }
  }
  </script>
</head>
```

**Tipos de Schema.org por contexto:**

| Tipo de Página | @type |
|---|---|
| Homepage / Empresa | `Organization` + `WebSite` |
| Blog / Artigo | `Article` ou `BlogPosting` |
| Produto / E-commerce | `Product` + `Offer` |
| FAQ | `FAQPage` |
| Serviço local | `LocalBusiness` |
| Pessoa / Portfólio | `Person` |
| Evento | `Event` |

### 4.5 — Headers HTTP e Cache

#### Para Vercel (`vercel.json`):

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*\\.webp|.*\\.avif|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.woff2)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

#### Para Netlify (`netlify.toml`):

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.avif"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Para Nginx (`nginx.conf`):

```nginx
server {
  # Compressão Brotli (melhor que Gzip)
  brotli on;
  brotli_comp_level 6;
  brotli_types text/html text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

  # Fallback Gzip
  gzip on;
  gzip_vary on;
  gzip_min_length 256;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

  # Cache de assets estáticos (com hash no nome)
  location ~* \.(webp|avif|jpg|jpeg|png|gif|svg|ico|woff2|woff|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
    add_header Vary Accept;
  }

  location ~* \.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  # HTML nunca deve ter cache longo
  location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, max-age=3600, must-revalidate";
  }
}
```

#### Para Apache (`.htaccess`):

```apache
# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml
</IfModule>

# Cache de assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Servir WebP quando suportado
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_ACCEPT} image/avif
  RewriteCond %{REQUEST_FILENAME}.avif -f
  RewriteRule ^(.+)\.(jpg|jpeg|png)$ $1.avif [T=image/avif,L]
  
  RewriteCond %{HTTP_ACCEPT} image/webp
  RewriteCond %{REQUEST_FILENAME}.webp -f
  RewriteRule ^(.+)\.(jpg|jpeg|png)$ $1.webp [T=image/webp,L]
</IfModule>
```

### 4.6 — Criar sitemap.xml e robots.txt

**`/public/sitemap.xml`** (ou gerar dinamicamente):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://seusite.com.br/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Adicionar todas as páginas do site -->
</urlset>
```

**`/public/robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://seusite.com.br/sitemap.xml
```

---

## FASE 5 — CONFIGURAÇÕES POR FRAMEWORK

### Next.js

```js
// next.config.js — configuração completa de performance
const nextConfig = {
  // Compressão automática
  compress: true,

  // Imagens otimizadas
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 ano
    dangerouslyAllowSVG: false,
  },

  // Headers de cache e segurança
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },

  // Experimental: otimizações avançadas
  experimental: {
    optimizeCss: true,       // Extrai CSS crítico automaticamente
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
};

module.exports = nextConfig;
```

### Astro

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seusite.com.br',
  integrations: [
    sitemap(),
    compress({
      CSS: true,
      HTML: { removeAttributeQuotes: false },
      Image: false, // Astro já otimiza imagens nativamente
      JavaScript: true,
      SVG: true,
    }),
  ],
  image: {
    experimentalLayout: 'responsive',
  },
  build: {
    inlineStylesheets: 'auto', // Inlina CSS pequeno automaticamente
  },
});
```

### Vite (React/Vue)

```js
// vite.config.ts
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      webp: { quality: 82 },
      avif: { quality: 65 },
      jpg: { quality: 85 },
      png: { quality: 85 },
    }),
    compression({ algorithm: 'brotliCompress', exclude: [/\.(png|jpg|webp|avif)$/i] }),
    compression({ algorithm: 'gzip', exclude: [/\.(png|jpg|webp|avif)$/i] }),
    createHtmlPlugin({ minify: true }),
  ],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

---

## FASE 6 — CHECKLIST FINAL DE VERIFICAÇÃO

Após aplicar as otimizações, verifique:

```bash
# Build de produção
npm run build 2>/dev/null || yarn build 2>/dev/null

# Verificar se WebP/AVIF foram gerados
find . -name "*.webp" -o -name "*.avif" ! -path "*/node_modules/*" | wc -l

# Verificar tamanho do CSS principal
find . -name "*.css" -path "*/dist/*" -o -name "*.css" -path "*/_next/*" 2>/dev/null | xargs ls -lh | sort -rh | head -5

# Verificar se há imagens JPG/PNG sem correspondente WebP
find . -name "*.jpg" ! -path "*/node_modules/*" | while read img; do
  webp="${img%.jpg}.webp"
  [ ! -f "$webp" ] && echo "SEM WebP: $img"
done
```

### Web Vitals alvo (Nota A = 90+):

| Métrica | Ruim | Precisa melhorar | Bom (Nota A) |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | >4s | 2.5s–4s | **<2.5s** |
| **FID / INP** (Interatividade) | >300ms | 100–300ms | **<100ms** |
| **CLS** (Cumulative Layout Shift) | >0.25 | 0.1–0.25 | **<0.1** |
| **FCP** (First Contentful Paint) | >3s | 1.8s–3s | **<1.8s** |
| **TBT** (Total Blocking Time) | >600ms | 200–600ms | **<200ms** |
| **Speed Index** | >5.8s | 3.4s–5.8s | **<3.4s** |

---

## FASE 7 — RELATÓRIO FINAL

Ao concluir, apresente:

```
╔══════════════════════════════════════════════════════════════╗
║              OTIMIZAÇÕES APLICADAS — RESUMO                  ║
╠══════════════════════════════════════════════════════════════╣
║  IMAGENS                                                     ║
║  • [N] imagens convertidas para WebP                         ║
║  • [N] imagens convertidas para AVIF                         ║
║  • Economia estimada: [X]MB → [Y]MB (-Z%)                    ║
║  • [N] tags <img> atualizadas para <picture>                 ║
║  • [N] imagens com lazy loading adicionado                   ║
║                                                              ║
║  CSS E FONTES                                                ║
║  • CSS crítico inlinado: [sim/não]                           ║
║  • Fontes movidas para self-hosted: [sim/não]                ║
║  • font-display: swap aplicado: [sim/não]                    ║
║  • Preloads adicionados: [N]                                 ║
║                                                              ║
║  SEO                                                         ║
║  • Meta tags completas: [N] páginas                          ║
║  • Open Graph: [N] páginas                                   ║
║  • Schema.org adicionado: [N] páginas                        ║
║  • Sitemap.xml: [criado/atualizado/existia]                  ║
║  • Robots.txt: [criado/atualizado/existia]                   ║
║                                                              ║
║  PERFORMANCE                                                 ║
║  • Cache headers: [configurado em qual arquivo]              ║
║  • Compressão: [Brotli/Gzip — onde]                          ║
║  • Scripts com defer/async: [N] corrigidos                   ║
╠══════════════════════════════════════════════════════════════╣
║  PRÓXIMOS PASSOS                                             ║
║  1. Executar: node scripts/optimize-images.js                ║
║  2. Fazer build de produção: npm run build                   ║
║  3. Testar em: https://pagespeed.web.dev                     ║
║  4. Submeter sitemap: Google Search Console                  ║
╚══════════════════════════════════════════════════════════════╝
```

Finalize sempre com:
> "Rode `https://pagespeed.web.dev/analysis?url=SEU_SITE` para verificar o score real. Se alguma métrica ainda estiver abaixo de 90, informe aqui os detalhes e continuo otimizando."

---

## REGRAS GERAIS DO SKILL

1. **Nunca apague imagens originais** — apenas adicione as versões WebP/AVIF ao lado
2. **Sempre faça backup antes de modificar HTML/CSS/JS em massa**: `cp -r src src.backup`
3. **Prefira AVIF quando o bundler/servidor suportar** — é 20-50% menor que WebP
4. **A imagem LCP nunca deve ter `loading="lazy"`** — isso penaliza o score
5. **`width` e `height` explícitos são obrigatórios** em todas as imagens — sem eles o CLS dispara
6. **Não inlinar CSS > 14KB** — acima disso prejudica o TTFB do HTML
7. **Sempre usar `font-display: swap`** — nunca deixar o texto invisível durante carregamento de fonte
8. **Schema.org deve corresponder ao conteúdo real** — não usar tipos genéricos quando há um específico
9. **Meta description deve ser única por página** — descrições duplicadas são penalizadas
10. **Testar em throttling 4G mobile** — o padrão do Lighthouse usa 150ms RTT, 1.6Mbps
