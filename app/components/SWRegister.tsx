"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    // Cek apakah browser support service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker berhasil didaftarkan:", registration);
        })
        .catch((error) => {
          console.error("❌ Gagal mendaftarkan Service Worker:", error);
        });
    }
  }, []);

  return null; // Komponen ini tidak merender visual apa pun
}
