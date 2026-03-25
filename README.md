# Next.js + Tigris Storage Starter

A minimal starter template for file storage with [Tigris Storage SDK](https://www.tigrisdata.com/docs/sdks/tigris/) and [Next.js](https://nextjs.org/). Upload, list, download, and delete files using Tigris Storage SDK.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftigrisdata%2Ftigris-nextjs-starter&env=TIGRIS_STORAGE_ACCESS_KEY_ID,TIGRIS_STORAGE_SECRET_ACCESS_KEY,TIGRIS_STORAGE_BUCKET&envLink=https%3A%2F%2Fwww.tigrisdata.com%2Fdocs%2F&project-name=tigris-nextjs-starter&repository-name=tigris-nextjs-starter)

## Features

- **File uploads** — Files are uploaded with `private` access by default
- **Presigned URL downloads** — Secure, time-limited download links via Tigris
- **Multipart uploads** — Large files are uploaded in parallel chunks
- **Pagination** — Browse files with pagination

## Getting Started

1. **Create a new project**

   ```bash
   npx create-next-app my-app --example "https://github.com/tigrisdata/tigris-nextjs-starter"
   cd my-app
   ```

   Or clone directly:

   ```bash
   git clone https://github.com/tigrisdata/tigris-nextjs-starter.git my-app
   cd my-app
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Tigris credentials. You can get these from the [Tigris Dashboard](https://console.tigris.dev/).

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to start uploading files.

## Project Structure

| Path                              | Description                                   |
| --------------------------------- | --------------------------------------------- |
| `src/app/layout.tsx`              | Root layout with metadata and header          |
| `src/app/page.tsx`                | Main page — owns file state and data fetching |
| `src/app/api/files/route.ts`      | List files and handle client uploads          |
| `src/app/api/files/[id]/route.ts` | Get presigned download URL and delete files   |
| `src/components/file-upload.tsx`  | Upload widget using `@tigrisdata/react`       |
| `src/components/file-list.tsx`    | Presentational file list with actions         |
| `src/lib/format.ts`               | File size and date formatting utilities       |

## API Routes

| Method   | Path              | Description                         |
| -------- | ----------------- | ----------------------------------- |
| `GET`    | `/api/files`      | List files with optional pagination |
| `POST`   | `/api/files`      | Handle client upload handshake      |
| `GET`    | `/api/files/[id]` | Get a presigned download URL        |
| `DELETE` | `/api/files/[id]` | Delete a file                       |

## Environment Variables

| Variable                           | Description                            |
| ---------------------------------- | -------------------------------------- |
| `TIGRIS_STORAGE_ACCESS_KEY_ID`     | Your Tigris access key ID              |
| `TIGRIS_STORAGE_SECRET_ACCESS_KEY` | Your Tigris secret access key          |
| `TIGRIS_STORAGE_BUCKET`            | The name of your Tigris storage bucket |

## Learn More

- [Tigris Documentation](https://www.tigrisdata.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [`@tigrisdata/storage` on npm](https://www.npmjs.com/package/@tigrisdata/storage)
- [`@tigrisdata/react` on npm](https://www.npmjs.com/package/@tigrisdata/react)
