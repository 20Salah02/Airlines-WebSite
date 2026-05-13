
#  Salah Airlines — Full-Stack Airline Booking System

A complete, production-ready airline booking platform built with Next.js, TypeScript, and Supabase. From flight search to payment — every step is fully functional.

 **[Live Demo](https://airlines-web-site.vercel.app)** &nbsp;|&nbsp; ⭐ Star this repo if you like it!

---

## Preview



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
