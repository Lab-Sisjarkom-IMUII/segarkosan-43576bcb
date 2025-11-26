import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

// --- Types ---
// Kita sesuaikan agar cocok dengan output JSON dari ESP32
// Timestamp kita biarkan required, tapi nanti diisi oleh Frontend (bukan dari MQTT)
export interface SensorData {
  temperature: number;
  humidity: number;
  heat_index: number;
  co2: number;

  // Field ini sekarang WAJIB (Required) karena di Main.cpp sudah pasti dikirim
  odor_score: number;
  odor_status: string;
  odor_level: string;

  // Timestamp dibuat di sisi client (frontend) saat data diterima
  // Format: Unix Timestamp dalam detik (seconds)
  timestamp: number;
}

// --- Helpers ---

// 1. Helper untuk mengubah payload mentah dari MQTT menjadi SensorData
// Fungsi ini menyuntikkan waktu sekarang (Date.now) karena ESP32 tidak mengirim jam.
export const processMqttPayload = (payload: any): SensorData => {
  return {
    temperature: payload.temperature,
    humidity: payload.humidity,
    heat_index: payload.heat_index,
    co2: payload.co2,
    odor_score: payload.odor_score,
    odor_status: payload.odor_status,
    odor_level: payload.odor_level,
    // Kita ambil waktu sekarang (milidetik) dan bagi 1000 agar jadi detik
    // Ini sesuai dengan helper formatTime di bawah yang dikali 1000
    timestamp: Math.floor(Date.now() / 1000),
  };
};

// 2. Format waktu untuk tampilan (Input: seconds)
export const formatTime = (ts: number) =>
  new Date(ts * 1000).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const getAirQualityStatus = (co2: number) => {
  if (co2 < 800)
    return {
      text: "Kualitas Udara Sangat Baik",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      icon: CheckCircle2,
      desc: "Aman untuk beraktivitas.",
    };
  if (co2 < 1200)
    return {
      text: "Kualitas Udara Sedang",
      color: "text-yellow-700 bg-yellow-50 border-yellow-200",
      icon: Activity,
      desc: "Ventilasi mungkin diperlukan.",
    };
  return {
    text: "Kualitas Udara Buruk",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: AlertTriangle,
    desc: "Segera buka jendela!",
  };
};
