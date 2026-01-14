import React from "react";
import { RefreshCw, Clock, Wind } from "lucide-react";

// Definisi tipe data disamakan dengan dashboard/page.tsx
export interface SensorData {
  temperature: number;
  humidity: number;
  heat_index: number;
  co2: number;
  odor_score?: number;
  odor_status?: string;
  odor_level?: string;
  timestamp: number;
}

export default function HistoryTable({ data }: { data: SensorData[] }) {
  // Helper untuk format waktu (Disamakan dengan logic di dashboard/page.tsx)
  const formatTime = (ts: number) => {
    if (!ts) return "-";
    return new Date(ts).toLocaleTimeString();
  };

  // Helper untuk warna badge Bau
  const getOdorColor = (status: string | undefined) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("wangi") || s.includes("normal") || s.includes("fresh")) {
      return "bg-emerald-100 text-emerald-800";
    }
    if (s.includes("menyengat") || s.includes("bau")) {
      return "bg-red-100 text-red-800";
    }
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Card */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Riwayat Data</h3>
          <p className="text-slate-400 text-sm">
            Menampilkan 10 data terakhir yang diterima sensor.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          title="Refresh Manual"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Waktu</th>
              <th className="px-6 py-4">Suhu (°C)</th>
              <th className="px-6 py-4">Kelembaban (%)</th>
              <th className="px-6 py-4">CO2 (ppm)</th>
              <th className="px-6 py-4">Bau (Odor)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.slice(0, 10).map((s, i) => (
              <tr
                key={i}
                className={`hover:bg-slate-50 transition-colors group ${
                  i === 0 ? "bg-blue-50/20" : ""
                }`}
              >
                {/* Kolom Waktu */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-slate-600 font-mono text-sm">
                    <Clock
                      size={14}
                      className={i === 0 ? "text-blue-500" : "text-slate-400"}
                    />
                    <span className={i === 0 ? "font-bold text-blue-700" : ""}>
                      {formatTime(s.timestamp)}
                    </span>
                    {i === 0 && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                        New
                      </span>
                    )}
                  </div>
                </td>

                {/* Kolom Suhu */}
                <td className="px-6 py-4 font-medium text-slate-700">
                  {s.temperature?.toFixed(1)}°
                </td>

                {/* Kolom Kelembaban */}
                <td className="px-6 py-4 text-slate-600">
                  {s.humidity?.toFixed(1)}%
                </td>

                {/* Kolom CO2 */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      s.co2 < 1000
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.co2?.toFixed(0)}
                  </span>
                </td>

                {/* Kolom Bau (Odor) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getOdorColor(
                        s.odor_status
                      )}`}
                    >
                      <Wind size={12} />
                      {s.odor_status || "Unknown"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      (Score: {s.odor_score ?? "-"})
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400">
                  Belum ada data yang terekam.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
