# Next.js E-Commerce Iconic Bags Store

A fully-featured **E-Commerce web application** built with **Next.js 16**, **Prisma**, **NextAuth**, **Stripe**, **PayPal**, **TailwindCSS**, and **PostgreSQL (Neon)**.
Users can browse products, manage carts, place orders, leave reviews, and track their order history — while admins manage products, orders, and users through an admin dashboard.

 **Live Demo:** [https://nextjs-ecommerce-bag-store.vercel.app/](https://nextjs-ecommerce-bag-store.vercel.app/)

---

## 🚀 Features

### 🛍️ **User Features**

* Browse products with images, details, rating, and reviews
* Add items to cart and create orders
* **Authentication** (Sign up / Sign in using credentials)
* Update personal profile (name, etc.)
* View full **order history**
* Write reviews (logged-in users only)
* Full **product search** with:

  * Category filtering
  * Price filtering
  * Rating filtering
  * Sorting
  * Keyword search

### 💳 **Payments**

Users can pay in **three ways**:

* **Stripe**
* **PayPal**
* **Cash on Delivery (COD)**

After successful payment, user receives an **email receipt**.

### 🌗 **Dark & Light Mode**

Powered by **next-themes**.

---

## 🛠️ **Admin Features**

Admins have access to a dedicated **Admin Dashboard**:

### 📊 Dashboard

* Sales summary
* Analytics using **Recharts**

### 🛒 Products Management (CRUD)

* Create, update, delete products
* Manage product images via UploadThing
* Manage product categories

### 📦 Orders Management

* View all orders
* Mark orders as **delivered**
* Mark **COD orders as paid**

### 👥 User Management (CRUD)

* View all users
* Edit user roles (admin / user)
* Update or delete users

---

## 📦 Tech Stack

### **Frontend**

* Next.js 16
* React 19
* TailwindCSS 4
* Radix UI
* UploadThing
* Recharts
* Lucide Icons

### **Backend**

* Next.js API Routes
* Prisma ORM
* Neon PostgreSQL
* Zod validation
* NextAuth v5

### **Payments & Emails**

* Stripe
* PayPal
* Resend + React Email (email receipts)

### **Testing**

* Jest
* ts-jest

---

## 🧰 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/plinadev/nextjs-ecommerce-bag-store
cd nextjs-ecommerce-bag-store
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file and include:

```
DATABASE_URL="postgres://..."
NEXTAUTH_SECRET="..."
STRIPE_SECRET_KEY="..."
PAYPAL_CLIENT_ID="..."
PAYPAL_SECRET="..."
RESEND_API_KEY="..."
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
```

### 4️⃣ Migrate Prisma schema

```bash
npx prisma migrate dev
```

### 5️⃣ Start the development server

```bash
npm run dev
```

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.
👉 **Live Demo:** [https://nextjs-ecommerce-bag-store.vercel.app/](https://nextjs-ecommerce-bag-store.vercel.app/)

---

