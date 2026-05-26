# DotDeep Design — Official Website

Creative design studio website for **DotDeep Design** — based in Vientiane, Laos. Built with Next.js 16 + Sanity CMS.

## Stack

- **Next.js 16** — App Router, Server Components, i18n (EN / TH / LO)
- **Sanity Studio** — Headless CMS with live preview & visual editing
- **Tailwind CSS** — OKLCH color palette, dark mode, fluid typography
- **next-intl** — Localization for English, Thai, Lao
- **Resend** — Contact form email delivery
- **Vercel** — Hosting & Edge deployment

## Monorepo Structure

```
/
├── frontend/   ← Next.js app (deploy root on Vercel)
└── studio/     ← Sanity Studio (deploy with `sanity deploy`)
```

## Local Development

```shell
# Install dependencies
npm install

# Copy env file and fill in your values
cp frontend/.env.example frontend/.env.local

# Start both frontend + studio
npm run dev
```

- Frontend: http://localhost:3000
- Studio: http://localhost:3333

## Environment Variables

See `frontend/.env.example` for all required variables.

| Variable                        | Required    | Description                        |
| ------------------------------- | ----------- | ---------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅          | Sanity project ID                  |
| `NEXT_PUBLIC_SANITY_DATASET`    | ✅          | `production`                       |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | ✅          | Deployed Studio URL                |
| `NEXT_PUBLIC_SITE_URL`          | ✅          | Production site URL                |
| `SANITY_API_READ_TOKEN`         | Recommended | For draft preview & live editing   |
| `RESEND_API_KEY`                | ✅          | Contact form emails                |
| `CONTACT_EMAIL`                 | ✅          | Where contact form emails are sent |
| `CONTACT_FROM_EMAIL`            | ✅          | Sender address shown in email      |

## Deploy on Vercel

1. Connect GitHub repo to Vercel
2. Set **Root Directory** → `frontend`
3. Add all environment variables from the table above
4. Deploy

## Deploy Sanity Studio

```shell
cd studio
npx sanity deploy
```

## Resources

- [Sanity docs](https://www.sanity.io/docs)
- [Next.js docs](https://nextjs.org/docs)
- [next-intl docs](https://next-intl-docs.vercel.app)
