# FlexForge — Client

FlexForge is a comprehensive Fitness & Gym Management Platform built for fitness enthusiasts, gym trainers, and administrators. Users can discover and book fitness classes, participate in a community forum, and track their fitness journey. Trainers can manage their classes and share knowledge through forum posts. Administrators oversee the platform's users, classes, and content.

## Purpose

This platform was built as a full-stack assignment project to demonstrate role-based access control, secure authentication, payment integration, and a complete CRUD-driven fitness management workflow.

## Live URL

https://your-live-url.vercel.app *(update after deployment)*

## Key Features

- Role-based dashboards for User, Trainer, and Admin with distinct permissions
- Secure authentication using Better Auth (Credential + Google login) with JWT stored in HTTPOnly cookies
- Browse, search (MongoDB `$regex`), and filter (MongoDB `$in`) fitness classes with server-side pagination
- Stripe-powered class booking with duplicate booking prevention
- Favorite classes with duplicate-entry prevention
- Community Forum with posts, Like/Dislike voting, and threaded comments (edit/delete own comments)
- Apply-as-Trainer workflow with Admin approval/rejection and feedback
- Admin controls: manage users (block/unblock/promote), manage trainers, approve/reject classes, moderate forum posts, view transaction history
- Soft-block enforcement — blocked users can browse but cannot perform state-changing actions
- Trainer tools: add/update/delete classes, view enrolled students, publish forum posts
- Fully responsive design across mobile, tablet, and desktop
- Framer Motion animations on the homepage
- Custom 404 page and global loading states

## NPM Packages Used

- next
- react / react-dom
- better-auth
- mongodb
- axios
- framer-motion
- react-hot-toast
- lucide-react
- @stripe/stripe-js
- @stripe/react-stripe-js
- tailwindcss / @tailwindcss/postcss

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your credentials
npm run dev
```