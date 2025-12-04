# Area Site - Next.js + Sanity CMS

A modern, headless CMS website built with Next.js, Sanity, and TailwindCSS. This project follows a modular, block-based architecture where all content is managed through Sanity CMS.

## 🏗️ Architecture

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity (Headless CMS)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Data Fetching**: GROQ queries
- **Rendering**: ISR (Incremental Static Regeneration)

## 📁 Project Structure

```
src/
  app/
    (site)/
      [slug]/
        page.tsx          # Dynamic page renderer
      layout.tsx
    studio/
      [[...index]]/
        page.tsx          # Sanity Studio
    layout.tsx
    page.tsx
  components/
    sections/             # Content block components
      ImageBlock.tsx
      TextBlock.tsx
      ImageTextBlock.tsx
      HeadingBlock.tsx
      ImageGalleryBlock.tsx
      VideoBlock.tsx
      SpacerBlock.tsx
      index.tsx           # Block renderer
    ui/                   # Reusable UI components
      Button.tsx
      Container.tsx
      Heading.tsx
  sanity/
    schemaTypes/
      page.ts
      blocks/
        imageBlock.ts
        textBlock.ts
        imageTextBlock.ts
        headingBlock.ts
        imageGalleryBlock.ts
        videoBlock.ts
        spacerBlock.ts
      index.ts
    deskStructure.ts
    config.ts
  lib/
    sanity.client.ts      # Sanity client setup
    queries.ts            # GROQ queries
    types.ts              # TypeScript types
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Create a new Sanity project at [sanity.io](https://www.sanity.io)
2. Get your Project ID and Dataset name
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Content Blocks

The site uses a flexible content block system. Each page can contain any combination of:

- **ImageBlock**: Single image with layout options
- **TextBlock**: Rich text content (portable text)
- **ImageTextBlock**: Image + text side by side
- **HeadingBlock**: Headings (H1-H6)
- **ImageGalleryBlock**: Multiple images in a grid
- **VideoBlock**: YouTube/Vimeo embeds or video files
- **SpacerBlock**: Vertical spacing

## 🎨 Styling

All styling is done with TailwindCSS. The project includes:

- Responsive design utilities
- Custom container component
- Typography system
- Consistent spacing

## 🔍 SEO

Each page supports SEO metadata:
- Title
- Description
- Open Graph image

Configured through the page schema in Sanity.

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Adding New Content Blocks

1. Create schema in `src/sanity/schemaTypes/blocks/`
2. Add to `schemaTypes/index.ts`
3. Create component in `src/components/sections/`
4. Add to `BlockRenderer` in `src/components/sections/index.tsx`
5. Update types in `src/lib/types.ts`

### Modifying Queries

Update GROQ queries in `src/lib/queries.ts`. The page query fetches all content blocks automatically.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🎯 Key Features

✅ Fully CMS-driven content
✅ Modular block-based architecture
✅ Dynamic routing based on slugs
✅ SEO optimized
✅ Type-safe with TypeScript
✅ Responsive design
✅ ISR for performance
