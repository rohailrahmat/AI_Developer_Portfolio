# Rohail Rahmat — Portfolio

Production-ready personal portfolio for Rohail Rahmat, AI engineer.
Built with Next.js (App Router), TypeScript, Tailwind CSS, and Gemini AI.

---

## Quick start

```bash
git clone https://github.com/rohailrahmat/AI_Developer_Portfolio.git
cd AI_Developer_Portfolio
npm install
cp .env.example .env.local
# Fill in .env.local (see Environment variables below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy `.env.example` to `.env.local`. The contact form requires Resend and
Cloudflare Turnstile credentials in production; Gemini and Upstash are used by
the optional AI chat and rate-limiting features.

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (server-only) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL (rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `OWNER_EMAIL` | Email address to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Your full domain (e.g. `https://rohailrahmat.dev`) |

---

## Project structure

```

```
content/                 Case studies and AI assistant knowledge base
public/                   Static images and brand assets
src/app/                  Next.js App Router pages and API handlers
src/components/           Shared navigation, chat, contact, and UI components
.github/workflows/        Typecheck, lint, and production build CI
```

---

## Editing content

### Case studies
Edit the MDX files in `content/work/`. Each file has frontmatter with title, slug, stack, and liveUrl. The body uses standard markdown with code blocks for architecture diagrams.

### AI assistant knowledge base
Edit `content/knowledge-base.json`. Each item has `id`, `title`, and `content`. The retrieval step scores items by keyword overlap with the user's question. Add new items as a new object in the array.

### Home page sections
Edit `src/app/page.tsx` — all data arrays (services, work, timeline, etc.) are defined inline at the top of the file.

---

## Deployment (Vercel)

1. Push to a GitHub repository.
2. Connect the repository to Vercel.
3. Add all environment variables in the Vercel dashboard (Project → Settings → Environment Variables).
4. Set `NEXT_PUBLIC_SITE_URL` to your domain (e.g. `https://rohailrahmat.dev`).
5. Deploy.

### Custom domain
1. In Vercel: Project → Settings → Domains → Add domain.
2. At your DNS provider, add the A and CNAME records Vercel shows you.
3. Vercel provisions HTTPS automatically.

---

## TODOs before going live

See `CONTENT_TODO.md` for a full checklist. Key items:

- [ ] Confirm social and contact links are current
- [ ] Add `public/rohail-rahmat-resume.pdf` if you want a direct PDF download (the resume page supports print-to-PDF)
- [ ] Configure Cloudflare Turnstile site and secret keys in `.env.local`
- [ ] Test the contact form end-to-end after deployment

---

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript typecheck |
