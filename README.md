# Complaint App

A simple complaint management system built with **Next.js**, **React**, **Node.js**, and **MongoDB**.

## Features

- Users can submit complaints (title, description, category, priority)
- Admin dashboard to view, update status, and delete complaints
- Email notifications for new complaints and status updates
- Responsive design for mobile and desktop

## Getting Started

1. **Install dependencies**
   ```bash
   cd complaint-app
   npm install
   ```
2. **Configure environment variables** in `.env.local`:
   ```
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_email_address
   SENDGRID_API_KEY=your_email_password
   SENDGRID_EMAIL_FROM=gmail
   ```
3. **Run the app**
   ```bash
   npm run dev
   ```

## Usage

- Users submit complaints via the home page form.
- Admins manage complaints at `/admin/dashboard`.

## API Endpoints

- `POST /api/complaints` – Create complaint
- `GET /api/complaints` – List complaints
- `PUT /api/complaints/:id` – Update complaint
- `DELETE /api/complaints/:id` – Delete complaint

## Email Setup

- Uses NodeMailer. Configure SMTP/email credentials in `.env.local`.

## MongoDB

- Requires a running MongoDB instance. Set `MONGODB_URL` in your `.env.local` file with your connection string.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [NodeMailer Documentation](https://nodemailer.com/about/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
