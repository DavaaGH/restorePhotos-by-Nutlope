```markdown
# Project Structure: RestorePhotos.io

## 1. High-Level Overview

RestorePhotos.io is an AI-powered web application designed to restore old and blurry face photos. It is built using Next.js for the frontend and backend, allowing users to upload images, have them processed by an AI model, and view the restored results.

## 2. Key Technologies

*   **Frameworks/Languages:** Next.js, React, TypeScript
*   **Styling:** Tailwind CSS, Headless UI
*   **AI Model Host:** Replicate (for GFPGAN model)
*   **Image Storage/Upload:** Bytescale
*   **Authentication:** NextAuth.js
*   **ORM & Database:** Prisma, PostgreSQL
*   **Rate Limiting:** Upstash Redis
*   **Client-side NSFW Check:** nsfwjs, TensorFlow.js
*   **Deployment:** Vercel

## 3. Directory Structure

*   **`pages/`**: Contains Next.js pages and API routes.
    *   `pages/index.tsx`: The main landing page.
    *   `pages/restore.tsx` (inferred): The page where users upload photos and see results.
    *   `pages/api/`: Backend API routes.
        *   `pages/api/auth/[...nextauth].ts`: NextAuth.js authentication route.
        *   `pages/api/generate.ts`: Core API endpoint for image restoration.
*   **`components/`**: Reusable React components used throughout the application (e.g., `Header.tsx`, `Footer.tsx`, `CompareSlider.tsx`, `Toggle.tsx`).
*   **`utils/`**: Utility functions shared across the application (e.g., `downloadPhoto.ts` for downloading images, `nsfwCheck.ts` for client-side NSFW detection, `redis.ts` for Upstash client initialization).
*   **`lib/`**: Library code, primarily `lib/prismadb.ts` for Prisma client initialization.
*   **`prisma/`**: Prisma-related files.
    *   `prisma/schema.prisma`: Defines the database schema (User, Account, Session models for NextAuth).
    *   `prisma/migrations/`: Database migration files.
*   **`public/`**: Static assets accessible directly via URL (e.g., images, favicons).

## 4. Core Application Flow

1.  **Authentication:** Users can sign in/up, typically via Google OAuth (handled by NextAuth.js). User sessions are managed, and certain actions (like image generation) require authentication.
2.  **Image Upload:** On the `/restore` page, users upload an image.
    *   **Client-side NSFW Check:** Before processing, the uploaded image is checked for NSFW content using `nsfwjs` in the browser.
    *   The image is likely uploaded to Bytescale, which provides a URL for the image.
3.  **API Call to `generate.ts`:** The frontend sends the uploaded image URL to the `/api/generate` backend endpoint.
4.  **Backend Processing (`/api/generate.ts`):**
    *   **Authentication & Rate Limiting:** The API verifies the user's session and checks if they have exceeded the daily generation limit (2 per day per user, managed by Upstash Redis).
    *   **Replicate Interaction:**
        *   The API sends a request to the Replicate API with the image URL to start the GFPGAN AI model processing.
        *   It then polls a Replicate endpoint until the AI processing is complete or fails.
    *   **Response:** The API returns the URL of the restored image (from Replicate) or an error message.
5.  **Displaying Results:** The frontend receives the restored image URL.
    *   It displays the original and restored images, often using a `CompareSlider` component for easy visual comparison.
    *   Users can typically download the restored image.

## 5. Database

*   **ORM:** Prisma is used as the Object-Relational Mapper.
*   **Database:** PostgreSQL.
*   **Schema:** The database schema (`prisma/schema.prisma`) primarily consists of models required by NextAuth.js for managing users, accounts (OAuth), sessions, and verification tokens. It does not currently store image-specific data like generation history, but could be extended.

## 6. External Service Integrations

*   **Replicate:** Used to host and run the GFPGAN AI model for photo restoration. The application interacts with Replicate's API to submit images and retrieve results.
*   **Bytescale:** Used for image uploads and storage. Provides the URL for the uploaded image that is then sent to Replicate.
*   **Upstash Redis:** Used for rate limiting the image generation feature, preventing abuse by limiting users to a certain number of restorations per day.

## 7. General Modification Strategy

Modifying or adding new features generally involves the following:

*   **UI Changes:**
    *   Create or update React components in `components/`.
    *   Modify Next.js pages in `pages/`.
    *   Use Tailwind CSS for styling.
*   **Backend Logic Modifications:**
    *   Create new API routes in `pages/api/` or modify existing ones.
    *   Implement business logic, ensuring authentication and input validation.
*   **Database Schema Updates:**
    *   Modify `prisma/schema.prisma` to add or change models/fields.
    *   Generate and run database migrations using `npx prisma migrate dev`.
    *   Update the Prisma client using `npx prisma generate`.
    *   Interact with the database in API routes using the Prisma client.
*   **Managing Environment Variables:**
    *   Store API keys, database URLs, and other sensitive configurations in `.env` (local) and as environment variables in the Vercel deployment environment.
    *   Update `.env.example` to reflect new variables.
```
