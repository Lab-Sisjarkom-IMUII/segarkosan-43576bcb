# 🌬️ SegarKosan - Air Quality Monitoring System

SegarKosan adalah sistem monitoring kualitas udara IoT berbasis **ESP32-C3** yang dirancang khusus untuk kamar kost. Aplikasi ini mendeteksi bau, suhu, kelembaban, dan kadar CO2 secara real-time melalui dashboard web yang intuitif.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API & WebSocket](#api--websocket)
- [Troubleshooting](#troubleshooting)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

---

## 🎯 Fitur Utama

### 1. **Odor Score Calculation (0-100)**

- Algoritma pintar mengkonversi data sensor menjadi skor kualitas udara
- Kategori: Fresh (0-30), Good (31-50), Moderate (51-70), Poor (71-90), Critical (91-100)
- Status visual dengan warna dan ikon yang mudah dipahami

### 2. **Monitoring Real-time**

- Dashboard live dengan update WebSocket
- Tampilan gauge untuk Odor Score
- Stat cards untuk Suhu, Kelembaban, Heat Index, CO2
- Koneksi status indicator

### 3. **Riwayat Data & Tabel History**

- Menyimpan hingga 10 data terakhir
- Format waktu terstandar (HH:MM:SS)
- Tampilan responsive untuk mobile dan desktop

### 4. **Smart Alerts**

- Notifikasi otomatis saat kondisi tidak normal
- Alert untuk Odor Score ≥ 75, Kelembaban tinggi, Suhu ekstrem
- Peringatan CO2 > 1000 ppm

### 5. **Dual Connectivity**

- **MQTT**: Real-time data streaming yang ringan
- **HTTP REST API**: Kompatibilitas luas dan fallback

### 6. **PWA Support**

- Installable di smartphone sebagai native app
- Offline support (dengan limitations)
- Auto-update pada versi baru

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────┐
│   SENSING LAYER     │
│  DHT22 + MQ-135     │
│  (Suhu/Lembab/Gas)  │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ PROCESSING LAYER    │
│   ESP32-C3 + OLED   │
│  (Odor Algorithm)   │
└──────────┬──────────┘
           │ (WiFi)
     (HTTP/MQTT)
           │
┌──────────▼──────────────────────────┐
│    NETWORK & BACKEND LAYER          │
│  Express.js Server + MongoDB        │
│  WebSocket + Authentication (JWT)   │
└──────────┬───────────────────────────┘
           │
┌──────────▼──────────┐
│ APPLICATION LAYER   │
│  Next.js React App  │
│  TailwindCSS UI     │
└─────────────────────┘
```

### Data Flow

1. **ESP32-C3** membaca sensor setiap 2-5 detik
2. **Memproses** data mentah → skor bau & heat index
3. **Mengirim** via MQTT atau HTTP ke backend
4. **Backend** menyimpan di MongoDB + broadcast via WebSocket
5. **Frontend** menerima update real-time → render dashboard

---

## 🛠️ Tech Stack

### Frontend (FE - Workspace Ini)

| Layer       | Technology   |
| ----------- | ------------ |
| Framework   | Next.js      |
| Runtime     | React        |
| Styling     | TailwindCSS  |
| Icons       | Lucide React |
| HTTP Client | Axios        |
| JWT         | jwt-decode   | 
| PWA         | next-pwa     |
| Language    | TypeScript   |

### Hardware

| Komponen        | Model       | Catatan              |
| --------------- | ----------- | -------------------- |
| Microcontroller | ESP32-C3    | RISC-V, WiFi, 160MHz |
| Temp/Humidity   | DHT22       | Akurasi ±2% RH       |
| Gas/Odor        | MQ-135      | Ppm untuk CO2/Bau    |
| Display         | SH1106 OLED | 128x64, I2C          |

### Backend (Separate Repository)

- **Runtime**: Node.js (Express.js)
- **Database**: MongoDB
- **Real-time**: WebSocket + Socket.io
- **Authentication**: JWT

---

## 📦 Prasyarat

### Minimum Requirements

- **Node.js**: v18.0.0 atau lebih baru
- **npm**: v9.0.0 atau lebih baru (atau yarn/pnpm)
- **Git**: untuk version control

### Development Tools (Opsional)

- **VS Code**: Rekomendasi editor
- **Docker**: Untuk menjalankan backend lokal

### Backend Service

Pastikan backend server sudah running:

- **URL Default**: `http://localhost:5000`
- **WebSocket URL**: `ws://localhost:5000`

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/SegarKosan/Segarkosan-FrontEnd.git
cd Segarkosan-FrontEnd
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000

# (Optional) Analytics atau service eksternal lainnya
# NEXT_PUBLIC_GA_ID=...
```

**Catatan**: Variable dengan prefix `NEXT_PUBLIC_` akan tersedia di browser. Jangan letakkan secret key di sini.

---

## ⚙️ Konfigurasi

### PWA Configuration

Edit [`next.config.ts`](next.config.ts):

```typescript
const withPWA = withPWAInit({
  dest: "public", // Output folder untuk service worker
  register: true, // Auto-register service worker
  skipWaiting: true, // Update otomatis tanpa prompt
  disable: false, // Set true untuk disable PWA di dev
});
```

### TailwindCSS Setup

File [`app/globals.css`](app/globals.css) sudah include Tailwind imports:

```css
@import "tailwindcss";
```

### TypeScript Configuration

Lihat [`tsconfig.json`](tsconfig.json) untuk compiler options:

- Target: ES2017
- Module Resolution: Node
- Strict: false (relax untuk development)

---

## 📖 Menjalankan Aplikasi

### Development Server

```bash
npm run dev
# Server berjalan di http://localhost:3000
```

Fitur development:

- Hot reload on file changes
- Error overlay dengan stack trace
- Built-in Next.js optimizations

### Build untuk Production

```bash
npm run build
npm start
```

### Linting & Code Quality

```bash
npm run lint
# Check code dengan ESLint (Next.js + TypeScript rules)
```

### Testing (Opsional Setup)

Saat ini belum ada test framework yang dikonfigurasi. Untuk menambahkan Jest:

```bash
npm install --save-dev jest @testing-library/react
```

---

## 📁 Struktur Proyek

```
segarkosan-web/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout + metadata
│   ├── page.tsx                   # Landing page (/)
│   ├── globals.css                # Global styles
│   ├── login/
│   │   └── page.tsx               # Login form
│   ├── register/
│   │   └── page.tsx               # Register form
│   ├── dashboard/
│   │   ├── page.tsx               # Main dashboard (/dashboard)
│   │   ├── utils.ts               # Helper functions & types
│   │   ├── hooks/
│   │   │   └── useSensorMonitoring.tsx  # WebSocket + HTTP hook
│   │   └── components/
│   │       ├── Navbar.tsx         # Top navigation
│   │       ├── StatCard.tsx       # Reusable stat display card
│   │       ├── OdorGauge.tsx      # Circular gauge untuk Odor Score
│   │       ├── AQIAlert.tsx       # Alert banner untuk kualitas udara
│   │       ├── HistoryTable.tsx   # Tabel data historis
│   │       └── SkeletonLoader.tsx # Loading placeholder
│   └── components/
│       └── SWRegister.tsx         # Service Worker registration
│
├── lib/                           # Utility functions & configs
│   ├── api.ts                     # Axios instance + base URL
│   └── auth.ts                    # Token management (localStorage)
│
├── styles/                        # (Empty - styles via TailwindCSS)
│
├── public/                        # Static assets
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service Worker (auto-generated)
│   └── images/
│       └── segarkosan_logo.png    # Logo
│
├── .next/                         # Build output (git-ignored)
├── node_modules/                  # Dependencies (git-ignored)
│
├── Config Files
├── .gitignore                     # Git ignore rules
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── next-pwa.d.ts                  # PWA type definitions
├── postcss.config.mjs             # PostCSS config (TailwindCSS)
├── eslint.config.mjs              # ESLint rules
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

### Key Files Explanation

| File                                                                                         | Purpose                                     |
| -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`app/dashboard/page.tsx`](app/dashboard/page.tsx)                                           | Main dashboard component dengan grid layout |
| [`app/dashboard/hooks/useSensorMonitoring.tsx`](app/dashboard/hooks/useSensorMonitoring.tsx) | WebSocket connection + data handling        |
| [`app/dashboard/components/OdorGauge.tsx`](app/dashboard/components/OdorGauge.tsx)           | Circular gauge visualization                |
| [`lib/api.ts`](lib/api.ts)                                                                   | Axios client dengan base URL                |
| [`lib/auth.ts`](lib/auth.ts)                                                                 | Token storage helpers                       |
| [`next.config.ts`](next.config.ts)                                                           | PWA + Next.js configuration                 |

---

## 🔌 API & WebSocket

### WebSocket Connection

**Location**: [`app/dashboard/hooks/useSensorMonitoring.tsx`](app/dashboard/hooks/useSensorMonitoring.tsx)

#### Connection String

```
ws://localhost:5000?token={JWT_TOKEN}
```

#### Message Format (Backend → Frontend)

```json
{
  "type": "sensor_data",
  "payload": {
    "temperature": 28.5,
    "humidity": 65.0,
    "heat_index": 31.2,
    "co2": 450,
    "odor_score": 12,
    "odor_status": "Fresh",
    "odor_level": "Udara segar, aman untuk beraktivitas"
  }
}
```

### HTTP REST API

#### Login Endpoint

```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

#### Register Endpoint

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Sensors Data

```
GET /sensors
Authorization: Bearer {JWT_TOKEN}

Response: Array<SensorData>
```

### Authentication

Token disimpan di `localStorage`:

```typescript
// Set token setelah login
setToken(token);

// Get token untuk request
const token = getToken();

// Remove token setelah logout
removeToken();
```

---

## 🎨 UI Components Reference

### StatCard

Display metric dengan icon dan unit.

```tsx
<StatCard
  title="Suhu Ruangan"
  value={28.5}
  unit="°C"
  icon={Thermometer}
  colorClass="text-orange-600"
  bgClass="bg-orange-50"
  statusMessage="Suhu Aktual"
/>
```

### OdorGauge

Circular gauge untuk Odor Score (0-100).

```tsx
<OdorGauge
  value={45}
  min={0}
  max={100}
  unit="Index"
  customStatus="Good"
  customLevel="Ventilasi mungkin diperlukan"
/>
```

### AQIAlert

Banner alert untuk status kualitas udara.

```tsx
<AQIAlert co2={450} timestamp={Date.now()} />
```

### HistoryTable

Tabel dengan riwayat 10 data terakhir.

```tsx
<HistoryTable data={sensorArray} />
```

---

## 🔧 Troubleshooting

### Issue: WebSocket Connection Refused

**Penyebab**: Backend server tidak running atau URL salah
**Solusi**:

1. Pastikan backend server di `http://localhost:5000`
2. Cek environment variable `NEXT_PUBLIC_WS_URL`
3. Pastikan token valid dan ada di localStorage

```bash
# Backend default
npm run dev  # di folder backend
```

### Issue: "No token found, skipping connection"

**Penyebab**: User belum login atau token expired
**Solusi**:

1. Login terlebih dahulu di `/login`
2. Token akan disimpan otomatis di localStorage
3. Refresh halaman untuk reconnect

### Issue: CORS Error

**Penyebab**: Backend CORS settings tidak allow frontend URL
**Solusi**:
Update backend Express CORS middleware:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

### Issue: PWA Service Worker Not Registering

**Penyebab**: Browser tidak support atau path `/sw.js` tidak found
**Solusi**:

1. Clear browser cache
2. Jalankan `npm run build` terlebih dahulu
3. Cek console untuk error messages

---

## 📱 Mobile & Responsive Design

Aplikasi sudah dioptimasi untuk:

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

Menggunakan Tailwind's responsive breakpoints:

```tsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Environment Variables di Vercel**:

```
NEXT_PUBLIC_API_URL=https://backend-api.example.com
NEXT_PUBLIC_WS_URL=wss://backend-api.example.com
```

### Docker (Self-hosted)

Buat `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:

```bash
docker build -t segarkosan-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=... segarkosan-web
```

---

## 📊 Performance Tips

1. **Image Optimization**: Gunakan `next/image` untuk gambar
2. **Code Splitting**: Next.js auto-split routes
3. **Lazy Loading**: Gunakan `dynamic()` untuk heavy components
4. **Bundle Analysis**: `npm run build` menampilkan bundle info

---

## 🤝 Kontribusi

Kami menerima kontribusi!

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** ke branch (`git push origin feature/amazing-feature`)
5. **Open Pull Request** dengan deskripsi lengkap

### Development Guidelines

- Ikuti code style: ESLint config
- Gunakan TypeScript strictly
- Test di multiple screen sizes
- Dokumentasi untuk fitur baru

---

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

## 👥 Tim

**SegarKosan Team**

- Hardware Engineer: [Kontributor Hardware]
- Frontend Developer: [Kontributor FE]
- Backend Developer: [Kontributor BE]

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/SegarKosan/segarkosan-web/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SegarKosan/segarkosan-web/discussions)
- **Email**: support@segarkosan.example.com

---

## 🙏 Acknowledgments

Terima kasih kepada:

- Next.js dan React community
- TailwindCSS untuk utility-first CSS
- Lucide React untuk icon set
- Semua kontributor dan tester


## License

© 2025 SegarKosan by Morning Group. All rights reserved.

