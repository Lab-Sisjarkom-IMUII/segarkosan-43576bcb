import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/public/:path*",
        destination: "/:path*",
      },
    ];
  },
  // Konfigurasi lain Anda di sini...
};

const withPWA = withPWAInit({
  dest: "public", // Tujuan output service worker
  register: true, // Auto register service worker
  skipWaiting: true, // Auto update service worker jika ada versi baru
  // Disable PWA in dev to avoid duplicate GenerateSW calls during HMR
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
