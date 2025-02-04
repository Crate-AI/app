This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Install [yt-dlp](https://github.com/yt-dlp/yt-dlp/wiki/Installation#third-party-package-managers) with the appropriate version for your OS

- Install dependencies with `pnpm i`

- Run the development server with `pnpm dev`

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Supabase

## Local environment setup

n.b. most of the documentation comes from [here](https://supabase.com/docs/guides/cli/local-development)

- Make sure you have [docker](https://docs.docker.com/get-docker/) installed and running
- Install the [supabase-cli](https://supabase.com/docs/guides/cli) and run the following:

```
supabase login # you'll need a PAT which this command will tell you how to generate
supabase init
supabase start
```

- That's pretty much it! The Studio app for your local deployment will be exposed at `http://127.0.0.1:54321` or something similar (will be displayed when `supabase start` completes)

## Deploying changes

- Apply the migration locally so that the types are updated. `supabase migration up --include-all`
- You can generate the types for your changes using `npx supabase gen types typescript --local > types/database/supabase.ts`. This allows them to be used in the frontend code with type safety
