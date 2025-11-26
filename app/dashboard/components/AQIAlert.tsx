import React from "react";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AQIAlertProps {
  co2: number;
  timestamp: number;
}

export default function AQIAlert({ co2, timestamp }: AQIAlertProps) {
  // Helper internal untuk status kualitas udara (Self-contained)
  const getAirQualityStatus = (val: number) => {
    if (val < 800)
      return {
        text: "Kualitas Udara Sangat Baik",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        icon: CheckCircle2,
        desc: "Aman untuk beraktivitas.",
      };
    if (val < 1200)
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

  // Helper format waktu (Disamakan dengan dashboard/page.tsx)
  const formatTime = (ts: number) => {
    if (!ts) return "-";
    return new Date(ts).toLocaleTimeString();
  };

  const status = getAirQualityStatus(co2);
  const Icon = status.icon;

  return (
    <div
      className={`mb-8 p-6 rounded-2xl border ${status.color} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm`}
    >
      <div className="flex gap-4">
        <div className="p-3 bg-white bg-opacity-40 rounded-xl backdrop-blur-sm">
          <Icon size={32} />
        </div>
        <div>
          <h2 className="text-lg font-bold">{status.text}</h2>
          <p className="opacity-90 text-sm">{status.desc}</p>
        </div>
      </div>
      {/* <div className="text-right hidden md:block">
        <p className="text-xs uppercase font-bold opacity-70 mb-1">
          Last Update
        </p>
        <p className="font-mono font-medium">{formatTime(timestamp)}</p>
      </div> */}
    </div>
  );
}
