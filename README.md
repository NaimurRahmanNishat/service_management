# service_management folder structure

// use moduler pattern (because this is big project) backend 

backend/
├── src/
│   ├── @types/
│   │   └── api.d.ts
│   │
│   ├── config/
│   │   ├── cacheConfig.ts
│   │   ├── cloudinary.ts
│   │   ├── db.ts
│   │   ├── index.ts
│   │   └── redis.ts
│   │
│   ├── helper/
│   │   ├── baseImage.ts
│   │   └── fileUploader.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── cacheAsync.ts
│   │   └── validate.middleware.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── requirement.txt
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── user/
│   │   │   ├── requirement.txt
│   │   │   ├── user.controller.ts
│   │   │   ├── user.model.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.route.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.validation.ts
│   │   │
│   │   ├── service/
│   │   │   ├── requirement.txt
│   │   │   ├── service.controller.ts
│   │   │   ├── service.model.ts
│   │   │   ├── service.repository.ts
│   │   │   ├── service.route.ts
│   │   │   ├── service.service.ts
│   │   │   └── service.validation.ts
│   │   │
│   │   ├── booking/
│   │   │   ├── requirement.txt
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.model.ts
│   │   │   ├── booking.repository.ts
│   │   │   ├── booking.route.ts
│   │   │   ├── booking.service.ts
│   │   │   └── booking.validation.ts
│   │   │
│   │   ├── payment/
│   │   │   ├── requirement.txt
│   │   │   ├── payment.controller.ts
│   │   │   ├── payment.model.ts
│   │   │   ├── payment.repository.ts
│   │   │   ├── payment.route.ts
│   │   │   ├── payment.service.ts
│   │   │   └── payment.validation.ts
│   │   │
│   │   ├── review/
│   │   │   ├── requirement.txt
│   │   │   ├── review.controller.ts
│   │   │   ├── review.model.ts
│   │   │   ├── review.repository.ts
│   │   │   ├── review.route.ts
│   │   │   ├── review.service.ts
│   │   │   └── review.validation.ts
│   │   │
│   │   ├── report/
│   │   │   ├── requirement.txt
│   │   │   ├── report.controller.ts
│   │   │   ├── report.model.ts
│   │   │   ├── report.repository.ts
│   │   │   ├── report.route.ts
│   │   │   ├── report.service.ts
│   │   │   └── report.validation.ts
│   │   │
│   │   ├── support/
│   │   │   ├── requirement.txt
│   │   │   ├── support.controller.ts
│   │   │   ├── support.model.ts
│   │   │   ├── support.repository.ts
│   │   │   ├── support.route.ts
│   │   │   ├── support.service.ts
│   │   │   └── support.validation.ts
│   │   │
│   │   ├── finance/
│   │   │   ├── requirement.txt
│   │   │   ├── commission.model.ts
│   │   │   ├── withdrawal.model.ts
│   │   │   ├── paymentHistory.model.ts
│   │   │   └── finance.service.ts
│   │   │
│   │   ├── notification/
│   │   │   ├── notification.model.ts
│   │   │   ├── notification.service.ts
│   │   │   └── notification.route.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── requirement.txt
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.route.ts
│   │   │   ├── admin.service.ts
│   │   │   ├── auditLog.model.ts
│   │   │   └── appConfig.model.ts
│   │   │
│   │   └── vendor/
│   │       ├── requirement.txt
│   │       ├── vendorProfile.model.ts
│   │       ├── vendor.controller.ts
│   │       ├── vendor.route.ts
│   │       └── vendor.service.ts
│   │
│   ├── templates/
│   │
│   ├── utils/
│   │   ├── cache.ts
│   │   ├── constants.ts
│   │   ├── cookie.ts
│   │   ├── email.ts
│   │   ├── errorHandler.ts
│   │   ├── token.ts
│   │   └── response.ts
│   │
│   ├── app.ts
│   └── server.ts
└── package.json


Frontend

frontend/
├── src/
│   ├── assets/
│   │   ├── (hero/image)
│   │   └── image
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Comments.tsx
│   │   │   ├── Error.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── IssueCard.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── NavItems.tsx
│   │   │   ├── SearchFilter.tsx
│   │   │   └── UserAuth.tsx
│   │   │
│   │   └── ui/(all ui file)
|   |    
│   ├── lib/
│   │   └── utils.
|   |  
│   ├── pages/
│   │   ├── [id]/
│   │   │   └── SinglePage.tsx
│   │   │   
│   │   ├── dashboard/
│   │   │   ├── super_admin/
│   │   │   │
│   │   │   ├── admin/
│   │   │   │
│   │   │   ├── vendor/
│   │   │   │
│   │   │   ├── user/
│   │   │   │
│   │   │   ├── SuperAdminDashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── VendorDashboard.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── UserDashboard.tsx
│   │   │ 
│   │   ├── home/
│   │   │   └── Home.tsx
│   │   │
│   │   ├── service/
│   │   │   └── Service.tsx
│   │   │
│   │   ├── technology/
│   │   │   └── Technology.tsx
│   │   │
│   │   ├── health/
│   │   │   └── Health.tsx
│   │   │
│   │   ├── lifestyle/
│   │   │   └── LifeStyle.tsx
│   │   │
│   │   ├── fitness/
│   │   │   └── Fitness.tsx
│   │   │ 
│   │   ├── house/
│   │   │   └── House.tsx
│   │   │ 
│   │   ├── land/
│   │   │   └── Land.tsx
│   │   │ 
│   │   ├── vehicle/
│   │   │   └── Vehicle.tsx
│   │   │ 
│   │   ├── others/
│   │   │   └── Others.tsx
│   │   │ 
│   │   ├── about/
│   │   │   └── About.tsx
│   │   │ 
│   │   └── contact/
│   │       └── Contact.tsx 
│   │   
│   ├── redux/
│   │   ├── features/
│   │   ├── hooks.ts
│   │   └── store.ts
│   │
│   ├── routes/
│   │   ├── protectedRoute.ts
│   │   └── router.ts
│   │   
│   ├── types/
│   │   └── index.ts
│   │   
│   ├── utils/
│   │   └── getBaseUrl.ts
│   │   
│   ├── App.css
│   │   
│   ├── App.tsx
│   │   
│   ├── index.css
│   │   
│   ├── main.tsx
│   │   
│   └── vite-env.d.ts
│
├── index.html
└── package.json





                    ┌─────────────────┐
                    │   Nginx :80     │
                    │  Load Balancer  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  Frontend    │ │  Frontend    │ │  Frontend    │
    │   :3001      │ │   :3002      │ │   :3003      │
    └──────────────┘ └──────────────┘ └──────────────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Nginx :80     │
                    │   /api route    │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  Backend     │ │  Backend     │ │  Backend     │
    │   :5001      │ │   :5002      │ │   :5003      │
    └──────────────┘ └──────────────┘ └──────────────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   MongoDB    │ │    Redis     │ │  Cloudinary  │
    └──────────────┘ └──────────────┘ └──────────────┘




┌──────────┐      ┌────────────────┐
│  USER    │────▶ │ VENDOR_PROFILE │
└──────────┘      └────────────────┘
     │                    │
     │                    │
     ▼                    ▼
┌──────────┐       ┌────────────────┐
│ BOOKING  │◀────▶│  VENDOR_SERVICE│
└──────────┘       └────────────────┘
     │                    ▲
     │                    │
     ▼                    │
┌──────────┐      ┌────────────────┐
│ PAYMENT  │      │    SERVICE     │
└──────────┘      └────────────────┘
     │                    │
     ▼                    ▼
┌──────────┐      ┌────────────────┐
│COMMISSION│      │    CATEGORY    │
└──────────┘      └────────────────┘
     │                    │
     ▼                    ▼
┌──────────┐       ┌────────────────┐
│ LOCATION │◀────▶│  SERVICE_AREA  │
└──────────┘       └────────────────┘
     │
     ▼ 
┌──────────┐
│  REVIEW  │
└──────────┘
