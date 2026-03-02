# Blog Post Instructions

## How to Create a New Blog Post

### Step 1: Create a New Markdown File

Create a new `.md` file in this directory (`src/pages/blog/`) with a URL-friendly filename:

**Good examples:**
- `how-to-choose-web-designer.md`
- `seo-tips-for-contractors.md`
- `website-speed-optimization-guide.md`

**Bad examples:**
- `My Blog Post.md` (spaces)
- `post1.md` (not descriptive)

### Step 2: Add Frontmatter

At the top of your file, add this frontmatter block with your post details:

```markdown
---
layout: ../../layouts/BlogPostLayout.astro
title: "Your Post Title Here"
description: "A compelling 150-160 character description for SEO. This appears in search results."
pubDate: "2026-02-27"
author: "OCWebPros Team"
category: "Local SEO"
image: "/images/your-image.png"
---
```

### Step 3: Write Your Content

After the frontmatter, write your content using standard markdown:

```markdown
## Main Heading (H2)

Your introduction paragraph goes here. Make it engaging and include relevant keywords naturally.

### Subheading (H3)

More content here. You can use:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](/contact)
- `code snippets`

## Another Section

Keep paragraphs short and scannable. Break up text with:
- Headings
- Lists
- Images
- Quotes

> Use blockquotes for important callouts or quotes

## The Bottom Line

Wrap up with key takeaways and a call to action.

---

**Need help with [topic]?** [Get in touch](/contact) to discuss your goals.
```

## Frontmatter Field Guide

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `layout` | ✅ Yes | Always use `../../layouts/BlogPostLayout.astro` | `../../layouts/BlogPostLayout.astro` |
| `title` | ✅ Yes | Post title (60 chars max for SEO) | `"5 Ways to Improve Local SEO"` |
| `description` | ✅ Yes | Meta description (150-160 chars) | `"Practical local SEO strategies..."` |
| `pubDate` | ✅ Yes | Publication date (YYYY-MM-DD) | `"2026-02-27"` |
| `author` | No | Author name (defaults to OCWebPros Team) | `"OCWebPros Team"` |
| `category` | No | Post category for filtering | `"Local SEO"` or `"Web Design"` or `"Tips"` |
| `image` | No | Featured image path | `"/images/blog/post-image.png"` |

## SEO Best Practices

### Title Tips:
- Include target keyword
- Keep under 60 characters
- Make it compelling and clickable
- Use numbers when possible ("5 Ways...", "10 Tips...")

### Description Tips:
- 150-160 characters (Google's limit)
- Include target keyword
- Write for humans, not robots
- Include a call to action

### Content Tips:
- Use H2 and H3 headings to structure content
- Include target keywords naturally (don't stuff)
- Link to relevant pages on your site
- Add images with descriptive alt text
- Keep paragraphs short (2-3 sentences)
- Use lists and formatting for scannability

### Keyword Strategy:
Focus on local + service keywords:
- "web design in [city]"
- "local SEO for [industry]"
- "how to [solve problem] in Orange County"
- "[industry] website tips"

## After Creating a Post

### 1. Update the Sitemap
Edit `src/pages/sitemap.xml.ts` and add your new post:

```typescript
{ url: 'blog/your-post-slug', priority: '0.7', changefreq: 'monthly' },
```

### 2. Test Locally
Run `npm run dev` and visit `http://localhost:4321/blog` to preview.

### 3. Commit and Push
```bash
git add .
git commit -m "Add blog post: [title]"
git push
```

## Content Ideas for SEO

### Local SEO Topics:
- How to rank in Google Maps
- Google Business Profile optimization
- Local citation building
- Review management strategies
- Service area pages best practices

### Web Design Topics:
- Mobile-first design principles
- Website speed optimization
- Conversion rate optimization
- Accessibility best practices
- Modern design trends

### Industry-Specific:
- "Website Must-Haves for [Industry]"
- "How [Industry] Businesses Get More Leads"
- "Common Website Mistakes [Industry] Makes"

### Location-Based:
- "Best Web Designers in [City]"
- "Local SEO Guide for [City] Businesses"
- "[Industry] Marketing in Orange County"

## Questions?

If you need help with blog strategy or content ideas, reach out to the team.
