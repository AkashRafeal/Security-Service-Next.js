# Vanguard Defense & Security Solutions Platform

A complete, production-grade **Security Services Corporate Website & Tactical Operations Management System** built as a modular monolith with modern enterprise aesthetics and military-grade design standards.

---

## 🏛️ Architecture & Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS (Tactical Dark Navy `#080C14` / `#0D1525`, Gold & Amber `#D97706` / `#F59E0B` accents, Glassmorphism, and subtle glow effects)
- **Routing**: React Router v6 with public & role-guarded routes
- **Forms & Validation**: React Hook Form + Zod
- **Networking**: Axios with JWT Bearer Interceptors & multipart file upload support
- **Icons & UI**: Lucide React
- **Animations**: Framer Motion
- **Data Analytics**: Recharts for interactive operational charts

### Backend
- **Platform**: Java 21 LTS
- **Framework**: Spring Boot 3.3.4 (Modular Monolith)
- **Data Access**: Spring Data JPA + Hibernate ORM (HikariCP connection pool)
- **Security**: Spring Security 6 + JJWT (Stateless JWT token authentication, BCrypt password hashing, RBAC)
- **Validation**: Jakarta Bean Validation (`@Valid`, custom error handling)
- **Audit & Logging**: JPA Auditing + Automated Audit Trails for compliance
- **Database**: MySQL 8+ with automated schema generation & seed data

---

## 🚀 Quick Start Guide

### Prerequisites
1. **Java 21 JDK** installed and on `PATH`
2. **Maven 3.9+** installed
3. **Node.js 18+** and **npm** installed
4. **MySQL 8** running on `localhost:3306` with database `security_services_db`

### 1. Database Configuration
Create the database in MySQL (if not already existing):
```sql
CREATE DATABASE IF NOT EXISTS security_services_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
The application connects with `root` / `root` by default (or set `DB_USERNAME` and `DB_PASSWORD` in your environment or `application.yml`).

### 2. Backend Startup (Spring Boot)
Navigate to the backend directory and run:
```bash
cd security-services/security-services-backend
mvn clean spring-boot:run
```
- The backend will start on **http://localhost:8080**.
- On first launch, `DataInitializer` automatically provisions:
  - 1 Default Admin account (`admin` / `Admin@123456`)
  - 13 Pre-seeded Security Services across 4 distinct categories
  - 11 Protected Industry verticals
  - 8 Corporate projects / case studies
  - 6 Leadership & commanding officers
  - 8 Client partners & verified testimonials
  - 8 Operational gallery photographs
  - 3 Security advisory whitepapers / blog posts
  - 8 Frequently asked questions
  - 3 Job openings
  - Corporate settings, sample RFQs, and dispatches

### 3. Frontend Startup (React + Vite)
In a separate terminal, navigate to the frontend directory:
```bash
cd security-services/security-services-frontend
npm install
npm run dev
```
- The frontend will start on **http://localhost:5173**.
- Vite proxies `/api` and `/uploads` requests directly to `http://localhost:8080`.

---

## 🔐 Default Access Credentials

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `Admin@123456` | Full Administrative & Operations Access |

---

## 🧭 Application Sitemap & Routes

### 🌐 Public Client Routes (21 Routes)
- `/` - Corporate Landing Command Center (Hero, quick quote calculator, stats, services carousel, case studies, reviews)
- `/about` - Corporate History, Executive Credentials & Military-Grade Standards
- `/services` - Full Service Catalog with Category Filters
- `/services/:slug` - Detailed Service Specifications, SLA Protocols, Threat Profiles & In-page Quote Form
- `/industries` - 11 Specialized Industry Security Solutions (Banking, Healthcare, Aviation, Construction, etc.)
- `/why-choose-us` - Tactical Advantages, Rapid Response Times, Rigorous Guard Vetting, Cutting-edge Tech
- `/process` - 5-Stage Security Onboarding Framework (Threat Assessment to 24/7 Monitoring)
- `/team` - Executive Command Staff, Tactical Instructors & Supervisory Roster
- `/clients` - Corporate Partners, Government Agencies & Testimonials
- `/projects` - High-Profile Case Studies & Mission Logs
- `/projects/:id` - Detailed Project Breakdown (The Challenge, The Tactical Solution, Measurable Results)
- `/gallery` - Operational Fleet, Mobile Patrols, K9 Units, and SOC Center Media
- `/testimonials` - Verified Client Reviews & Video Testimonials
- `/blog` - Threat Advisories, Security Best Practices & Regulatory Updates
- `/blog/:slug` - Full Insight Article with Author Bio and Key Takeaways
- `/faq` - Interactive Searchable FAQ Accordion
- `/careers` - Career Opportunities, Guard Training Academy & Benefits
- `/careers/:id` - Job Details, Duties, Requirements & Resume Upload Form
- `/contact` - Dispatch Numbers, Interactive Emergency Lines & Inquiry Form
- `/request-quote` - Comprehensive Security Assessment & Guard Calculator Form
- `/privacy` - Data Governance & Privacy Policy
- `/terms` - Terms of Service & SLA Legal Disclosures

### 🛡️ Protected Administrative Routes (19 Routes)
Access requires authentication via `/admin/login`:
- `/admin/dashboard` - Executive Overview (Active Services, Open RFQs, Pending Leads, Job Applicants, Revenue Trends, Service Demand Chart)
- `/admin/quotes` - Quotation Requests Management (Status updates: NEW, CONTACTED, IN_PROGRESS, QUOTED, CONVERTED, REJECTED)
- `/admin/enquiries` - Contact Message Inquiries & Triage
- `/admin/applications` - Employment Candidates & Resume Downloads
- `/admin/services` - Security Services CRUD (Pricing, Features, Icons, Category mapping)
- `/admin/categories` - Service Categories CRUD
- `/admin/industries` - Industry Solutions Management
- `/admin/clients` - Client Brand Profiles & Logos
- `/admin/projects` - Case Studies Management
- `/admin/team` - Command Officers Roster Management
- `/admin/testimonials` - Client Reviews Moderation & Approval
- `/admin/gallery` - Media Showcase Uploads & Categorization
- `/admin/blog` - Article Authoring, Markdown Support & Publishing States
- `/admin/faqs` - FAQ Knowledge Base Management
- `/admin/jobs` - Job Openings Management
- `/admin/users` - User Provisioning & RBAC Permissions (ROLE_ADMIN only)
- `/admin/notifications` - Real-time Operational Notification Center
- `/admin/audit-logs` - Immutable System Action Trail for Compliance (ROLE_ADMIN only)
- `/admin/settings` - Global Company Configuration (Emergency Hotline, HQ Address, Social Links)

---

## 🛡️ Security Features
- **Stateless JWT Authentication**: Tokens signed with HMAC-SHA512 (`app.jwt.secret`) and verified via `JwtAuthenticationFilter`.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for `ROLE_ADMIN`, `ROLE_SECURITY_MANAGER`, and `ROLE_OPERATOR`.
- **Audit Trails**: Critical state changes, user account operations, and logins are recorded in `AuditLog` table with timestamp and actor details.
- **Input Sanitization**: Request bodies verified with Jakarta Bean Validation and Zod schemas on the frontend.
