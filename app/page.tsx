"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Wind,
  Thermometer,
  Droplets,
  Activity,
  Cpu,
  Wifi,
  BellRing,
  ArrowRight,
  Github,
  BarChart3,
} from "lucide-react";

export default function Home() {
  // Color Palette based on the logo provided:
  // Primary Dark Teal: #1F7A8C (approx) -> using Tailwind teal-700/800
  // Accent Light Green: #81C784 (approx) -> using Tailwind emerald-400/500

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Image Placeholder - Replace src with your actual file path if different */}
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              {/* Asumsi logo disimpan di public folder dengan nama logo.png atau sesuai upload */}
              <Image
                src="/images/segarkosan_logo.png"
                alt="SegarKosan Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-teal-800 tracking-tight">
              Segar<span className="text-emerald-500">Kosan</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a
              href="#features"
              className="hover:text-teal-700 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="hover:text-teal-700 transition-colors"
            >
              Cara Kerja
            </a>
            <a href="#tech" className="hover:text-teal-700 transition-colors">
              Teknologi
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/SegarKosan"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="/login"
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20"
            >
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Beta Version
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Udara Bersih untuk <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-500">
                  Anak Kos Cerdas
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Sistem monitoring kualitas udara IoT berbasis ESP32-C3.
                Mendeteksi bau, suhu, dan kelembaban kamar kos Anda secara
                real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Tombol ke Login (Internal Link) */}
                <Link
                  href="/login"
                  className="px-8 py-3.5 rounded-full bg-teal-700 text-white font-bold hover:bg-teal-800 transition-all shadow-xl shadow-teal-700/20 flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5" />
                  Cek Status Udara
                </Link>

                {/* Tombol ke GitHub (External Link) */}
                <a
                  href="https://github.com/SegarKosan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Dokumentasi
                </a>
              </div>
            </div>

            {/* Hero Illustration / Mockup */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Mockup Dashboard UI */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Kamar 101
                    </h3>
                    <p className="text-xs text-slate-400">Update: Baru saja</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full">
                    Online
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-teal-600">
                      <Wind className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">
                        Odor Score
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">
                      12
                      <span className="text-sm font-normal text-slate-400">
                        /100
                      </span>
                    </p>
                    <p className="text-xs text-emerald-500 font-medium mt-1">
                      Udara Segar 🟢
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-orange-500">
                      <Thermometer className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">Suhu</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">
                      28.5
                      <span className="text-sm font-normal text-slate-400">
                        °C
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Normal
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-blue-500">
                      <Droplets className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">
                        Kelembaban
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">
                      65
                      <span className="text-sm font-normal text-slate-400">
                        %
                      </span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-purple-500">
                      <Activity className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase">CO2</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">
                      450
                      <span className="text-sm font-normal text-slate-400">
                        ppm
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs">
                  <p className="text-emerald-400">$ system_status --check</p>
                  <p>[OK] MQTT Connection Established</p>
                  <p>[OK] Sensor DHT22 Reading... Done</p>
                  <p>[OK] Odor Algorithm... Calculated</p>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS / FEATURES BAR --- */}
      <section className="bg-teal-900 py-12 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                24/7
              </div>
              <div className="text-sm text-teal-200">Real-time Monitoring</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                0-100
              </div>
              <div className="text-sm text-teal-200">Smart Odor Score</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                &lt;250ms
              </div>
              <div className="text-sm text-teal-200">Data Latency</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                Dual
              </div>
              <div className="text-sm text-teal-200">MQTT & HTTP API</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fitur Utama SegarKosan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Didesain khusus untuk kamar kost mahasiswa. Hemat daya, akurat,
              dan mudah dipantau.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Odor Score Calculation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Algoritma pintar yang mengkonversi data sensor menjadi skor
                0-100. Ketahui kapan kamar Anda &quot;Fresh&quot; (0-30) atau butuh
                ventilasi (70+).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Grafik Historis 24 Jam
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Visualisasi data historis suhu dan kelembaban. Pantau tren
                kualitas udara kamar Anda sepanjang hari.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Smart Alerts
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Notifikasi instan saat Odor Score ≥ 75, Kelembaban tinggi, atau
                suhu ruangan terlalu panas.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Dual Connectivity
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Mendukung protokol MQTT untuk realtime data stream yang ringan
                dan REST API HTTP untuk kompatibilitas luas.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                ESP32-C3 Powered
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Otak cerdas menggunakan mikrokontroler RISC-V yang efisien,
                dilengkapi dengan OLED Display lokal SH1106.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Health Focused
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Membantu menjaga kesehatan pernapasan dengan memastikan
                sirkulasi udara kamar kos selalu terjaga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Architecture) --- */}
      <section
        id="how-it-works"
        className="py-24 bg-slate-50 border-y border-slate-200"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Arsitektur Sistem
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Sensing Layer</h4>
                    <p className="text-sm text-slate-600">
                      Sensor DHT22 (Suhu/Lembab) dan MQ-135 (Gas/CO2) membaca
                      kondisi lingkungan setiap 2-5 detik.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Processing Layer (ESP32-C3)
                    </h4>
                    <p className="text-sm text-slate-600">
                      Data mentah diproses menjadi satuan standar. Skor Bau
                      dihitung menggunakan logika fuzzy sederhana.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Network Layer</h4>
                    <p className="text-sm text-slate-600">
                      Data dikirim via WiFi menggunakan protokol HTTP/MQTT ke
                      Backend Server.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Application Layer
                    </h4>
                    <p className="text-sm text-slate-600">
                      MongoDB menyimpan data, Dashboard React menampilkan grafik
                      real-time dan notifikasi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              {/* Simplified Visualization of Architecture */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full z-0"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-mono w-48 text-center">
                      DHT22 + MQ135
                    </div>
                  </div>
                  <div className="flex justify-center text-slate-300">
                    <ArrowRight className="rotate-90" />
                  </div>
                  <div className="flex justify-center">
                    <div className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-600/20 w-48 text-center">
                      ESP32-C3
                    </div>
                  </div>
                  <div className="flex justify-center text-slate-300">
                    <ArrowRight className="rotate-90" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-slate-100 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 font-bold uppercase">
                        Backend
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        MongoDB
                      </p>
                    </div>
                    <div className="bg-white border-2 border-emerald-100 p-3 rounded-lg text-center">
                      <p className="text-xs text-emerald-500 font-bold uppercase">
                        Frontend
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        React DB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK & CTA --- */}
      <section id="tech" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Powered By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tech names just as text/logos */}
            <span className="text-xl font-bold text-slate-600">PlatformIO</span>
            <span className="text-xl font-bold text-slate-600">React</span>
            <span className="text-xl font-bold text-slate-600">Next.js</span>
            <span className="text-xl font-bold text-slate-600">MongoDB</span>
            <span className="text-xl font-bold text-slate-600">
              TailwindCSS
            </span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <span className="text-xl font-bold text-white tracking-tight">
                  Segar<span className="text-emerald-500">Kosan</span>
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Made with ❤️ for better air quality in boarding rooms.
              </p>
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Terms
              </a>
              <a
                href="https://github.com/SegarKosan"
                className="hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SegarKosan Project. Licensed under
            MIT.
          </div>
        </div>
      </footer>
    </div>
  );
}
