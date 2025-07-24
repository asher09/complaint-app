# Complaint App

A simple complaint management dashboard built with [Next.js](https://nextjs.org).  
Admins can view, update, and delete complaints submitted by users.

## Features

- View all complaints in a table
- Change the status of complaints (Pending, In Progress, Resolved)
- Delete complaints from the dashboard
- Mock data fallback for local development

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

- `src/app/admin/dashboard/page.tsx` – Admin dashboard for managing complaints
- `src/app/page.tsx` – Main user-facing page
- `src/pages/api/complaints` – API route for complaints (customize as needed)

## Technologies Used

- Next.js (App Router)
- React
- Axios (for API requests)
- Tailwind CSS (for styling)

## How It Works

- Complaints are fetched from `/api/complaints` and displayed in a table.
- Admins can change the status of any complaint using a dropdown.
- Click **Update All** to save all status changes to the database.
- Click **Delete** to remove a complaint from the database.

## Customization

- To use mock data, update the `useEffect` in `page.tsx` as shown in the code comments.
- You can extend the complaint model to include more fields as needed.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---
