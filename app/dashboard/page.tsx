"use client";

import { Droplets, Sun, Wind, Thermometer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSensorMonitoring } from "./hooks/useSensorMonitoring";
import Navbar from "./components/Navbar";
import SkeletonLoader from "./components/SkeletonLoader";
import AQIAlert from "./components/AQIAlert";
import StatCard from "./components/StatCard";
import HistoryTable from "./components/HistoryTable";
import OdorGauge from "./components/OdorGauge"; // Pastikan path import benar
import React, { useEffect, useState } from "react";

// Definisi Tipe Data Sensor yang Lengkap (Termasuk Odor)
interface SensorData {
  temperature: number;
  humidity: number;
  heat_index: number;
  co2: number;
  odor_score?: number;
  odor_status?: string;
  odor_level?: string;
  timestamp: number;
}

// Mock Token Helper
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.log("No token found, redirecting...");
      setTimeout(() => setIsAuthorized(false), 0);
      router.push("/login");
    }
  }, [router]);

  const { sensors, latest, loading, isConnected } = useSensorMonitoring();

  // Casting data 'latest' ke interface SensorData agar properti odor terbaca
  const sensorData = latest as unknown as SensorData;

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      <Navbar isConnected={isConnected} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard Monitoring
            </h1>
            <p className="text-slate-500 mt-1">
              Pantauan kondisi lingkungan Real-time
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Terakhir Diupdate
            </p>
            <p className="text-sm font-medium text-slate-700">
              {latest ? new Date(latest.timestamp).toLocaleTimeString() : "-"}
            </p>
          </div>
        </div>

        {loading && !latest ? (
          <SkeletonLoader />
        ) : (
          <>
            {latest && (
              <AQIAlert co2={latest.co2} timestamp={latest.timestamp} />
            )}

            {/* Grid Layout untuk Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* KOLOM 1: Odor Gauge (Utama) */}
              <div className="lg:col-span-1">
                <OdorGauge
                  // Gunakan Number() untuk memastikan data string dari JSON dikonversi ke angka
                  value={Number(sensorData?.odor_score ?? 0)}
                  min={0}
                  max={100}
                  unit="Index"
                  // Pass status dan level description dari backend
                  customStatus={sensorData?.odor_status}
                  customLevel={sensorData?.odor_level}
                />
              </div>

              {/* KOLOM 2: Metric Lainnya */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                {/* Kita pindahkan Suhu ke StatCard biasa karena Gauge dipakai Odor */}
                <StatCard
                  title="Suhu Ruangan"
                  value={latest?.temperature.toFixed(1) || "-"}
                  unit="°C"
                  icon={Thermometer}
                  colorClass="text-orange-600"
                  bgClass="bg-orange-50"
                  statusMessage="Suhu Aktual"
                />

                <StatCard
                  title="Kelembaban"
                  value={latest?.humidity.toFixed(1) || "-"}
                  unit="%"
                  icon={Droplets}
                  colorClass="text-blue-600"
                  bgClass="bg-blue-50"
                  statusMessage="Kelembaban relatif"
                />

                <StatCard
                  title="Heat Index"
                  value={latest?.heat_index.toFixed(1) || "-"}
                  unit="°C"
                  icon={Sun}
                  colorClass="text-amber-600"
                  bgClass="bg-amber-50"
                  statusMessage="Suhu yang dirasakan"
                />

                <StatCard
                  title="Kadar CO2"
                  value={latest?.co2 || "-"}
                  unit="ppm"
                  icon={Wind}
                  colorClass={
                    latest?.co2 > 1000 ? "text-red-600" : "text-emerald-600"
                  }
                  bgClass={latest?.co2 > 1000 ? "bg-red-50" : "bg-emerald-50"}
                  statusMessage={
                    latest?.co2 > 1000 ? "Ventilasi Buruk" : "Udara Segar"
                  }
                />
              </div>
            </div>

            {/* Tabel History */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">
                Riwayat Data Sensor
              </h2>
              <HistoryTable data={sensors} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
