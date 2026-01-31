![🚀 Zenmo – Multi-Vendor Service Platform]
### Overview

Zenmo is a scalable multi-vendor service marketplace where Admins provide service products, Vendors deliver services, and Users consume services through secure online payments.

It is designed with enterprise-grade architecture, role-based access control, and high-availability infrastructure.

### 🧠 Core Concept

| Role            | Responsibility                                                |
| --------------- | ------------------------------------------------------------- |
| **Super Admin** | System configuration, platform control                        |
| **Admin**       | Create services, assign products to vendors, manage locations |
| **Vendor**      | Provide services in assigned locations, collect service fees  |
| **User**        | Book services, make payments, give ratings & reviews          |


### Service Flow

1. Admin creates a service/product
2. Admin assigns service to Vendor
3. Vendor delivers service to User
4. User makes payment
5. Commission is split between Admin & Vendor
6. User leaves rating & review


### 🌍 Location-Based Service System

Country
 └── Division
     └── District
         └── City
             └── Area
                 └── Sub-Area
                     └── Zip Code

### Location Rules

1. Locations are created & managed only by Admin / Super Admin
2. When a Vendor is created, a Vendor Location Profile is auto-generated
3. Vendors can only provide services inside their assigned locations
4. No unnecessary location data is created unless a vendor exists


### 💳 Payment System

1. Stripe
2. bKash
3. IoT Scanner (future-ready integration)


### Payment Flow
User → Payment → Booking → Commission → Vendor & Admin


### ⭐ Review & Rating System
Users can:
Rate services
Leave comments
Edit or delete their reviews
Reviews appear on Service Detail Pages
Used for vendor performance tracking


### 🏗️ System Architecture

```
# Load Balanced Infrastructure
              ┌─────────────────┐
              │   Nginx :80     │
              │  Load Balancer  │
              └────────┬────────┘
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼
 Frontend          Frontend          Frontend
  :5173              :5174              :5175
```


```
# API Layer
        ┌───────────────┐
        │   Nginx :80   │
        │   /api route │
        └───────┬───────┘
                │
   ┌────────────┼────────────┐
   ▼            ▼            ▼
 Backend      Backend      Backend
  :5001        :5002        :5003
```


### Services

MongoDB – Primary Database
Redis – Caching & rate-limiting
Cloudinary – Media storage


### 🧩 Backend – Modular Architecture
```
backend/
└── src/
    ├── config/
    ├── middlewares/
    ├── utils/
    ├── helper/
    └── modules/
        ├── auth
        ├── user
        ├── service
        ├── booking
        ├── payment
        ├── review
        ├── report
        ├── support
        ├── finance
        ├── notification
        ├── admin
        └── vendor
```


# Each Module Contains
controller.ts
service.ts
repository.ts
model.ts
route.ts
validation.ts
requirement.txt

# This ensures:
High maintainability
Easy scalability
Clear separation of concerns


### 🎨 Frontend Stack

# Technologies Used
React + TypeScript
Redux Toolkit
Tailwind CSS
Framer Motion
shadcn ui
magic ui
zod & zod resolver
Vite

# Frontend Structure
```
frontend/
└── src/
    ├── assets/
    ├── components/
    ├── constants/
    ├── lib/
    ├── pages/
    ├── redux/
    ├── routes/
    ├── types/
    └── utils/
```

### Dashboard Roles
Super Admin Dashboard
Admin Dashboard
Vendor Dashboard
User Dashboard

Each dashboard is role-protected and dynamically rendered.


### 🔐 Authentication & Security
JWT Authentication
Access Token + Refresh Token
CSRF Protection
Rate Limiting
Role-Based Access Control (RBAC)


### ⚙️ Key Features

1. Multi-vendor service system
2. Location-based service delivery
3. Commission & finance management
4. Secure payment integration
5. Review & rating system
6. Admin audit logs
7. Redis caching
8. Scalable & load-balanced architecture


### 🚀 Installation

# Frontend
https://github.com/NaimurRahmanNishat/service_management.git
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev


### 🌐 Deployment

Frontend: Vercel
Backend: Docker + Nginx
Database: MongoDB Atlas
Cache: Redis


### 🤝 Contributing

Follow modular architecture
Write clean & documented code
Test before submitting PR


### 📞 Contact

Email: naimurrhamun34@gmail.com
LinkedIn: https://www.linkedin.com/in/naimur-rahman-0a8046381
Facebook: https://www.facebook.com/profile.php?id=61576332312271
Portfolio: https://portfolio-frontend-ten-coral.vercel.app


### 📜 License
MIT License © Zenmo


### 🌟 Zenmo
A Scalable Multi-Vendor Service Platform for the Modern Web
