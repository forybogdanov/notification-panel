# Notification Panel
Built this to explore different technologies

A modern, full-stack notification system built with Next.js, React, and TypeScript.

## Features

- Create different types of notifications
- Display notifications in a popover
- Mark notifications as read
- Text-to-speech functionality for reading out notifications
- Real-time notification updates

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- tRPC for end-to-end typesafe APIs
- Prisma as the ORM
- PostgreSQL database
- Radix UI for components and theming
- React Hook Form for form handling
- Zod for schema validation
- ElevenLabs API for text-to-speech conversion
- OpenAI's GPT-4 for generating notification summaries
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NON_POOLING
   - ELEVENLABS_API_KEY
   - NEXT_PUBLIC_APP_DOMAIN

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```
5. Start the development server:
   ```
   npm run dev
   ```
