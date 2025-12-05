 # NextGen SaaS Enterprise – Fullstack (.NET 8 + React/TS/Tailwind)

NextGen SaaS Enterprise is a **portfolio-grade, fullstack SaaS platform** that simulates a modern
multi-tenant financial / BI product.

It’s designed to showcase how I build real-world systems end-to-end:

- **Backend** – .NET 8 Minimal APIs, JWT auth, multi-tenant architecture, SQL Server, Repository + UnitOfWork, AI-style insight engine
- **Frontend** – React 18 + TypeScript + Vite + Tailwind, fintech dashboard UI, JWT login, role-based navigation, live API calls

### What it Demonstrates

- Clean separation of **Domain / Application / Infrastructure / API / UI**
- **Multi-tenant SaaS patterns** with tenant isolation at the API and DB level
- **JWT / OAuth2-style** authentication with role-based authorization
- API-first design with Swagger + Bearer token flow
- Modern React frontend with:
  - Centralized Auth context
  - Tenant-aware Axios client
  - Dashboard, transactions, and AI insights view
- Enterprise quality: error handling middleware, DTOs, service layer, repository/unit-of-work


## 🏗 Architecture Overview

```text
flowchart LR
    subgraph Client["Client Tier"]
        UI["React + TypeScript\nFintech Dashboard"]
    end

    subgraph API["API Tier (.NET 8 Minimal APIs)"]
        Gateway["/api endpoints\nJWT-protected"]
        Auth["Auth & JWT\nToken Issuer"]
        TenantMW["Tenant Middleware\nX-Tenant-ID + Claims"]
        AppLayer["Application Layer\nDTOs + Services\n(AI Insight Engine)"]
        Infra["Infrastructure\nUnitOfWork + Repositories"]
    end

    subgraph Data["Data Tier"]
        DB["SQL Server\n(NextGenSaaS DB)"]
    end

    UI -->|"HTTPS / JSON"| Gateway
    Gateway --> Auth
    Gateway --> TenantMW
    TenantMW --> AppLayer
    AppLayer --> Infra
    Infra --> DB

    UI <-->|"JWT Bearer Token"| Auth
    UI <-->|"Insights & Aggregates"| Gateway
```
```
cd src
dotnet restore
dotnet run --project NextGen.Api
```

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=NextGenSaaS;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
}
```

# ✔ On first run, the API seeds:

- Tenant
- Users: admin/admin123, user/user123
- Account + transactions


#Swagger UI:

- https://localhost:5001/swagger (or whatever port Kestrel shows)

#2️⃣ Frontend (React + TypeScript + Vite + Tailwind)
```
npm install
cp .env.example .env

```

Edit .env:
```
VITE_API_BASE=https://localhost:5001
```

Run dev:
```
npm run dev
```

Open:

- http://localhost:5173

Login with:

- admin / admin123 → Admin view with Tenants menu

- user / user123 → Standard operator view (no Tenants menu)

The dashboard will:

- Fetch /api/accounts

- Fetch /api/accounts/{id}/transactions

- Fetch /api/accounts/{id}/ai-insight

- Allow you to post new transactions and see:

   - Updated balance

   - Updated AI insight narrative

#3️⃣ Docker (high level)
```
version: '3.9'
services:
  api:
    image: nextgen-saas-api
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5001:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=db;Database=NextGenSaaS;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong!Passw0rd
    ports:
      - "1433:1433"
```
#Frontend Dockerfile (example):
```
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

In production .env:
```
VITE_API_BASE=https://api.nextgensaas.your-domain.com
```


















