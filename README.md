<img width="1920" height="1080" alt="Screenshot (3891)" src="https://github.com/user-attachments/assets/380dde9c-e57f-45b4-b2e3-3019077beb75" />

#  Salah Airlines — Full-Stack Airline Booking System

A complete, production-ready airline booking platform built with Next.js, TypeScript, and Supabase. From flight search to payment — every step is fully functional.

 **[Live Demo](https://airlines-web-site.vercel.app)** &nbsp;|&nbsp; ⭐ Star this repo if you like it!

---

## Preview

---

![Homepage](https://github.com/user-attachments/assets/055ec77f-5d01-4418-b1a6-0c3a4fdca7a7)

---

##  Screenshots

| Homepage | Search Form |
|----------|-------------|
| ![](https://github.com/user-attachments/assets/055ec77f-5d01-4418-b1a6-0c3a4fdca7a7) | ![](https://github.com/user-attachments/assets/8505effe-9262-4211-a115-0547ff65cea6) |

| Flight Results | Flight Details |
|----------------|---------------|
| ![](https://github.com/user-attachments/assets/13491354-eadd-47bc-873d-e5b31b1a8b36) | ![](https://github.com/user-attachments/assets/3ed53376-2e63-40c0-bf46-0bf27a6868fd) |

| Booking Page | Passenger Info |
|--------------|---------------|
| ![](https://github.com/user-attachments/assets/187ab676-5e4f-4a23-92bf-2ca98ec52872) | ![](https://github.com/user-attachments/assets/60797c81-52b1-4b8b-9c85-c2002264b112) |

| Payment — Stripe | Trip Summary |
|------------------|--------------|
| ![](https://github.com/user-attachments/assets/3e608669-0faa-4f8b-ac03-991380f4e215) | ![](https://github.com/user-attachments/assets/e218b736-5410-44ab-8f73-7134d245c9c4) |

| Login Page | Google OAuth |
|------------|--------------|
| ![](https://github.com/user-attachments/assets/ab725e14-c6f2-472a-a327-7c2817d6dced) | ![](https://github.com/user-attachments/assets/364edcdc-728b-48bb-81f7-eae22f2dbb3b) |

| Email Verification | Offers Section |
|--------------------|---------------|
| ![](https://github.com/user-attachments/assets/cd0e0f56-6b01-43a9-bca5-249d57628061) | ![](https://github.com/user-attachments/assets/fb13d30a-88a1-4006-a469-d555ffd70454) |

| Mobile View | Mobile Booking |
|-------------|---------------|
| ![](https://github.com/user-attachments/assets/d432c8e9-752c-40a4-bd82-017dd8490629) | ![](https://github.com/user-attachments/assets/951b841f-023d-47af-bfc1-2edba18f9058) |

| Performance Score — 96/100 |
|---------------------------|
| ![](https://github.com/user-attachments/assets/80f639b2-2bce-4cfd-9b5c-27ce58982926) |

---

## Features

### Smart Flight Search
- Search flights between **14.000+ airports worldwide** using real IATA codes, city names, and coordinates
- **Return & One-way** trip options
- Custom-built **passenger selector** (Adults, Children, Infants) from scratch
- **Range date picker** with react-date-range
- Economy & Premium class selection

### Dynamic Pricing System
- Flight prices calculated from **real GPS coordinates** (latitude & longitude) of each airport
- **Flight duration** estimated based on distance between airports
- **Live currency conversion** via external API — supports multiple currencies
- Exchange rates cached in localStorage to minimize API calls

### Authentication
- **Email & Password** authentication
- Powered by **Supabase Auth**

### Full Booking Flow
- Step 1: Search flights → Step 2: Select flight → Step 3: Passenger info → Step 4: Payment
- **Phone number input** with country flags and dial codes via API
- Form validation for email, phone, and all passenger details
- Trip details **slide-in panel** showing full flight information
- Booking data managed with **React Context API** across all pages

### UI/UX
- **Skeleton loading** screens for smooth experience
- Fully **responsive** — optimized for mobile and desktop
- **Vercel Speed Insights score: 96/100**
- Carousel sections, suggestion cities, offer alerts

### Email Offers
- Newsletter subscription with city preferences
- Users receive personalized flight offer suggestions

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| Payment | Stripe |
| State Management | React Context API |
| Rendering | SSR + CSR (Next.js) |
| Deployment | Vercel |

---

## External APIs

- **Currency Exchange API** — Live currency conversion with local caching
- **Phone Flags API** — Country codes and flags for phone input
- **Airport Data** — 14.000+ airports with IATA codes, coordinates, and city info (JSON)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

```bash
git clone https://github.com/20Salah02/Airlines-WebSite.git
cd Airlines-WebSite
npm install
```

### Environment Variables

Create a `.env.local` file

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Performance

| Metric | Score |
|--------|-------|
| Real Experience Score | 96/100 ✅ |
| First Contentful Paint | 1.55s ✅ |
| Interaction to Next Paint | 96ms ✅ |

---

##  Author

**Salaheddine Mourid**  
Web Developer — React.js · Next.js · TypeScript  
📍 Morocco  
🐙 [GitHub](https://github.com/20Salah02)

---

##  License

MIT License — feel free to use this project.
