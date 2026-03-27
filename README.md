# Lifewood Website

## Deployment Notes

This repository contains:

- `frontend/`: Next.js application prepared for Vercel builds from the repo root
- `backend/`: Django API and admin services

### Vercel

The root `package.json` and `vercel.json` are configured so Vercel can build the Next.js frontend with:

```bash
npm install
npm run build
```

Set the root project environment variables from `.env.example`.

### Backend Hosting

The Django backend reads configuration from environment variables such as `DATABASE_URL`, `EMAIL_SERVICE_API_KEY`, and `STORAGE_BUCKET_URL`, but it is not converted into Vercel serverless functions in this repo. Deploy the backend to a Python-capable host such as Render, Railway, Fly.io, or another container/service platform, then point `NEXT_PUBLIC_API_BASE_URL` at that backend URL.
