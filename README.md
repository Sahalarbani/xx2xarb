# ⚡ ARBSKINZ - NEXT GEN LIVERY HUB

<div align="center">

![ArbSkinz Banner](https://arbskin.vercel.app/opengraph-image)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Cyberpunk-00f0ff?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-white?style=for-the-badge&logo=prisma&logoColor=black)](https://www.prisma.io/)
[![NeonDB](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

**The ultimate platform for high-performance simulation assets.**
Dominating the asphalt with HD Liveries for Bus Simulator, Truck, and Racing games.

[🚀 LIVE DEMO](https://arbskin.vercel.app) · [🐛 REPORT BUG](https://github.com/Sahalarbani/arbskinz-next/issues)

</div>

---

## 🔮 SYSTEM OVERVIEW

**ArbSkinz** bukan sekadar web download biasa. Ini adalah **Asset Management System** modern yang dibangun dengan arsitektur *Serverless* dan desain *Cyberpunk*. Dirancang untuk kecepatan, keamanan, dan kemudahan pengelolaan konten visual.

Dibangun langsung dari **Android (Termux)** menggunakan kekuatan **Vibe Coding & AI**.

### ✨ CORE MODULES (2026 Features)

* **🎨 Cyberpunk Interface:** UI Gelap (`#050505`) dengan aksen Neon Cyan (`#00f0ff`) menggunakan font *Oxanium* futuristik.
* **📂 Cloudinary Custom Gallery:** Integrasi *deep-level* dengan Cloudinary API. Mendukung:
    * Upload Widget (Unsigned).
    * Custom Media Library (Signed API) dengan auto-thumbnail generator.
* **⚡ Smart Description Presets:** Fitur produktivitas untuk menyimpan template deskripsi (HTML/CSS support) ke database. Sekali klik, form terisi otomatis.
* **🏷️ Dynamic Categorization:** Sistem kategori cerdas yang mendeteksi input database secara *real-time* tanpa hardcode.
* **🔐 Secure Authentication:** NextAuth v5 integration dengan Google OAuth & Middleware protection.
* **🚀 SEO & Metadata Engine:** Dilengkapi `opengraph-image` dinamis dan metadata lengkap untuk preview link WhatsApp/Twitter yang menawan.

---

## 🛠️ TECH ARSENAL

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | React Server Components & Server Actions |
| **Database** | Neon (Postgres) | Serverless Database with Pooling |
| **ORM** | Prisma | Type-safe database client |
| **Styling** | Tailwind CSS | Utility-first styling with custom config |
| **Storage** | Cloudinary | Image optimization & delivery network |
| **Icons** | Lucide React | Modern & lightweight icon set |
| **Dev Env** | Termux & Android 14 | Mobile-first development workflow |

---

## 🔌 INITIALIZE SEQUENCE

Ikuti langkah ini untuk menjalankan project di local environment (Termux/PC).

### 1. Clone Repository
```bash
git clone [https://github.com/Sahalarbani/arbskinz-next.git](https://github.com/Sahalarbani/arbskinz-next.git)
cd arbskinz-next

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Config

Buat file `.env` dan isi kunci rahasia berikut:

```env
# Database (Neon/Postgres)
DATABASE_URL="postgresql://user:pass@ep-xyz.Region.aws.neon.tech/neondb?sslmode=require"

# Auth (NextAuth.js)
AUTH_SECRET="your_generated_secret_key"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

# Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your_api_key"
NEXT_PUBLIC_CLOUDINARY_PRESET="your_unsigned_preset"
CLOUDINARY_API_SECRET="your_api_secret"

```

### 4. Database Sync

```bash
npx prisma generate
npx prisma db push

```

### 5. Ignite Server 🚀

```bash
npm run dev

```

Akses di `http://localhost:3000`

---

## 📂 PROJECT BLUEPRINT

Struktur folder utama project ini:

```
arbskinz-next/
├── 📂 app/
│   ├── 📂 api/             # Backend Endpoints (Cloudinary Sign, Resources)
│   ├── 📂 dashboard/       # Admin Panel (Protected Routes)
│   ├── 📂 lib/             # Server Actions & Utilities
│   ├── layout.tsx          # Root Layout with Metadata
│   └── page.tsx            # Hero Page with Dynamic Filtering
├── 📂 components/
│   ├── ImageGalleryModal.tsx  # Custom Cloudinary Gallery
│   ├── PresetSelector.tsx     # New Feature: Description Presets
│   └── SkinCard.tsx           # Cyberpunk Card UI
├── 📂 prisma/
│   └── schema.prisma       # Database Models
└── 📂 public/              # Static Assets

```

---

## 🤝 CONTRIBUTING

Project ini dikembangkan secara solo oleh **Sahal Arbani**, namun kontribusi selalu terbuka.

1. Fork repository ini.
2. Buat branch fitur (`git checkout -b fitur-keren`).
3. Commit perubahan (`git commit -m 'Menambah fitur keren'`).
4. Push ke branch (`git push origin fitur-keren`).
5. Buka Pull Request.

---

<div align="center">

**Developed with ❤️ and ☕ on Android.**
© 2026 Sahal Arbani. All Rights Reserved.

</div>

```
