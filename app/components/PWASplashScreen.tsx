"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWASplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    // This check works for most modern browsers and iOS
    const nav = window.navigator as NavigatorWithStandalone;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      // Use setTimeout to avoid synchronous state update warning during effect
      setTimeout(() => {
        setIsPWA(true);
      }, 0);
      
      // Simulate booting time
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000); // 3 seconds splash screen

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowSplash(false), 0);
    }
  }, []);

  if (!isPWA || !showSplash) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src="/images/segarkosan_logo.png"
            alt="SegarKosan Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-emerald-600 mb-2 tracking-wide">SegarKosan</h1>
        <p className="text-sm text-gray-500 mb-8">Smart Kosan with Odor Detection</p>
        
        <div className="flex items-center space-x-2">
           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
