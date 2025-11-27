import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Konfigurasi lain Anda di sini...
};

const withPWA = withPWAInit({
  dest: "public", // Tujuan output service worker
  register: true, // Auto register service worker
  skipWaiting: true, // Auto update service worker jika ada versi baru
  disable: false,
});

export default withPWA(nextConfig);
