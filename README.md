# 🏡 Real Estate Dashboard Web App

A modern **Real Estate Platform** built with **Next.js (App Router)**, **ShadCN UI**, and **Tailwind CSS**, providing property listings, agency exploration, search & filtering, interactive maps, and a clean dashboard experience.

---

## ✨ Features

### 🔹 Core Features

* **Dashboard** with quick navigation to Properties & Agencies
* **Properties Listing Page** with image carousels
* **Agencies Listing & Search** (filter by agency name)
* **Agency Detail Page** with:

  * Logo & branding
  * Description & licenses
  * Contact information
  * Property statistics
  * Categories & service areas
* **Interactive Map (Leaflet – Free Tier)**
  * Marker based on agency coordinates

## ⭐ Saved Properties & Agencies
  * **Save/Unsave Agencies and Properties**
    * Toggle save button on agency detail page
    * Visual feedback (Saved / Unsaved state)
    * Prevent duplicate saves
    * Optimized add/remove logic
  * **User-Specific Saved Data**
    * Each user has isolated saved items
    * Linked via authenticated session

* **Authentication UI**

  * Login page
  * Signup page (ShadCN Form)
* **Responsive Design** (Mobile, Tablet, Desktop)
* **Animated UI** (Framer Motion)
* **Skeleton Loaders** for smooth UX

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 14+ (App Router)**
* **React**
* **Tailwind CSS**
* **ShadCN UI**
* **Framer Motion** (animations)
* **Lucide Icons**

### Backend / APIs

* **Next.js API Routes**
* **Axios** for HTTP requests
* **RapidAPI – UAE Real Estate API**

### Maps

* **Leaflet** (Free tier)

---

## 🧠 Complex Logic & Implementation Details

### 1️⃣ API Integration (RapidAPI)

* Secure server-side calls using **Next.js API routes**
* Dynamic filters:

  * Price range
  * Rooms & baths
  * Completion status
  * Amenities
* Error handling & fallback to static data

### 2️⃣ Search & Filtering

* Controlled inputs using `useState`
* Debounced search by agency name
* Conditional rendering based on API response

### 3️⃣ UI/UX Enhancements

* **ShadCN Cards + Carousel** for listings
* **Skeleton loaders** during API fetch
* Hover effects & transitions
* Mobile-first responsive grid system

### 4️⃣ Map Integration

* Leaflet with:

  * Custom marker
  * Coordinates from API data
* No paid Google Maps dependency

### 5️⃣ Performance Optimization

* Server Components where possible
* Client Components only when needed (`"use client"`)
* Lazy-loaded carousels & images

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
MONGO_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
RAPIDAPI_KEY=your_rapidapi_key
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🎨 Design Philosophy

* Minimal & modern
* Card-based layouts
* High readability
* Smooth transitions
* Real-estate friendly color palette

---

## 📌 Future Improvements

* Pagination & infinite scrolling
* Advanced filters (location radius, map-based search)
* Admin dashboard

---

## 🧑‍💻 Credits

Built with Bayut API from **UAE Real Estate** listed on RapidAPI

---

## 📜 License

This project is for educational & portfolio purposes.
