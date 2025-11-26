"use client";

import React from "react";
import { Wifi, WifiOff, LogOut } from "lucide-react";

// Mocking fungsi untuk preview environment
// Dalam aplikasi Next.js asli, Anda akan menggunakan import ini:
import { useRouter } from "next/navigation";
import { removeToken } from "../../../lib/auth";

export default function Navbar({ isConnected }: { isConnected: boolean }) {
  // Mock router
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      removeToken();
      router.push("/");
    }
  };

  return (
    <nav className="bg-white/90 border-b border-teal-100 sticky top-0 z-50 backdrop-blur-xl shadow-sm shadow-teal-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* --- LOGO BRAND --- */}
          <div className="flex items-center gap-3.5">
            {/* Logo Image */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 transform transition-transform hover:scale-105 duration-300">
              <img
                src="/images/segarkosan_logo.png"
                alt="Logo SegarKosan"
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Teks Logo */}
            <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-800">
              Segar<span className="text-emerald-500">Kosan</span>
            </span>
          </div>

          {/* --- STATUS & LOGOUT --- */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Status Koneksi Badge */}
            {/* <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide border shadow-sm transition-all duration-300 ${
                isConnected
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-emerald-100"
                  : "bg-rose-50 border-rose-200 text-rose-600 shadow-rose-100"
              }`}
            >
              {isConnected ? (
                <>
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <span className="hidden sm:inline uppercase">Online</span>
                  <Wifi size={14} className="sm:hidden" />
                </>
              ) : (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500"></div>
                  <span className="hidden sm:inline uppercase">Offline</span>
                  <WifiOff size={14} className="sm:hidden" />
                </>
              )}
            </div> */}

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>

            {/* Tombol Logout */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
              title="Keluar Aplikasi"
            >
              <LogOut
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
