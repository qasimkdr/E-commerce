# Aaira's Kitchen — Cakes and Frozen Food

A full-stack MERN cake ordering platform with a guest storefront and protected admin dashboard.

## Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary media storage
- JWT admin authentication

## Apps
- `frontend/` customer storefront and admin dashboard
- `backend/` REST API, authentication, products, categories, orders and Cloudinary uploads

Copy each `.env.example` to `.env`, add your credentials, run `npm install` inside both apps, then run `npm run dev`.

## Default local admin
Create the first administrator with:

```bash
cd backend
npm run seed:admin
```

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend environment first.
