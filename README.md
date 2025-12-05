 # NextGen SaaS Enterprise – Fullstack (.NET 8 + React)

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

```mermaid
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
