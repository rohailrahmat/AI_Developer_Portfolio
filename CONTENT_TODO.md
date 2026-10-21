# TODO: Replace with your actual items before deployment

## Content TODOs

### Photo
- Confirm `public/rohail.png` is the intended profile photo before launch

### Upwork Profile
- Confirm the profile URL in `src/app/page.tsx`, `src/components/SiteNav.tsx`, and `src/components/ContactForm.tsx`

### Domain
- After deploying to Vercel, connect your custom domain
- Update `NEXT_PUBLIC_SITE_URL` in `.env.local` to your domain

### Resume PDF
- Optionally add `public/rohail-rahmat-resume.pdf` if you want to offer a direct PDF download
- The `/resume` page already supports printing or saving as PDF from the browser

### Projects — results to fill in (optional, only if you have real data)
All four case studies currently state truthful but general results.
If you have specific data you can verify (e.g., number of proposals generated,
number of trips planned, specific client feedback), add it to the matching MDX
file in `content/work/`.

### Testimonials
No testimonials are shown. Only add testimonials with permission to publish
them, then add the section to `src/app/page.tsx`.

## Deployment Checklist
1. Copy `.env.example` to `.env.local` and configure the services you use
2. Create a Resend account and add your API key
3. Register a Cloudflare Turnstile site and add site key + secret
4. Create an Upstash Redis database and add REST URL + token
5. Add your Gemini API key
6. Run `npm run build` locally to confirm no errors
7. Push to GitHub and connect to Vercel
8. Add all environment variables in the Vercel dashboard
9. Connect your custom domain
10. Test the contact form end-to-end
11. Test the chat assistant
12. Run Lighthouse on the deployed site
