# Obi's Kitchen & Bedrooms (Next.js)

## Setup

```bash
npm install
```

## Local dev

```bash
npm run dev
```

## Build + run

```bash
npm run build
npm start
```

## Environment variables

- Copy `.env.example` → `.env.local`
- **Never commit** `.env.local` (it contains secrets)

## Content sources

- **WooCommerce products**: fetched server-side from `WORDPRESS_URL` + `WC_CONSUMER_KEY` + `WC_CONSUMER_SECRET`
- **WordPress posts**: fetched server-side from `WORDPRESS_URL`

If env vars aren’t present, the site falls back to built-in mock content (`lib/wordpress.js`).

## Notes

- `/contact` uses a Netlify-style form post; `public/__forms.html` is included for the build target that expects it.
 
## Netlify

- **Node**: set to 20 (see `.nvmrc` / `netlify.toml`)
- **Build**: `npm run build`
- **Env vars**: configure in Netlify UI (do not commit `.env.local`)
- **Headers**: `public/_headers`
- **Forms**: submit `/contact` once after deploy and confirm it appears in Netlify → Forms

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
