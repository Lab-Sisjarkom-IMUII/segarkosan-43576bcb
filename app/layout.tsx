import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SWRegister from "./components/SWRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SegarKosan Dashboard", // Ubah title agar sesuai
  description: "Monitoring Kualitas Udara & Bau",

  // --- INI KUNCI UTAMANYA ---
  manifest: "/manifest.json",
  // --------------------------

  icons: {
    // Ikon standar untuk browser (favicon)
    icon: "/images/segarkosan_logo.png",

    // (Opsional) Ikon untuk shortcut di iPhone/iPad
    // Jika Anda ingin menggunakan gambar yang sama:
    apple: "/images/segarkosan_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRegister />
        {children}
      </body>
    </html>
  );
}
