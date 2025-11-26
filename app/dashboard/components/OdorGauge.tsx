import React from "react";
import { CloudFog } from "lucide-react";

interface OdorGaugeProps {
  value: number; // Skala 0 - 100
  min?: number;
  max?: number;
  unit?: string;
  customStatus?: string; // Dari Backend (e.g., "ASAP", "FRESH")
  customLevel?: string; // Dari Backend (e.g., "Critical, immediate action...")
}

export default function OdorGauge({
  value,
  min = 0,
  max = 100,
  unit = "Index",
  customStatus,
  customLevel,
}: OdorGaugeProps) {
  // 1. Normalisasi Value
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // 2. Konfigurasi Geometri SVG
  const size = 200;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  // 3. Status Text & Color Logic (Sesuai mq135.h)
  // Range: 0-30 (Fresh), 31-50 (Good), 51-70 (Moderate), 71-90 (Poor), 91-100 (Critical)

  let internalText = "Fresh Air";
  let statusColor = "text-emerald-500";
  let bgStatus = "bg-emerald-100";
  let strokeColor = "#10b981"; // Default Emerald

  if (value > 90) {
    // 91-100: Critical
    internalText = "Critical";
    statusColor = "text-purple-600";
    bgStatus = "bg-purple-100";
    strokeColor = "#9333ea";
  } else if (value > 70) {
    // 71-90: Poor
    internalText = "Poor Quality";
    statusColor = "text-red-600";
    bgStatus = "bg-red-100";
    strokeColor = "#dc2626";
  } else if (value > 50) {
    // 51-70: Moderate
    internalText = "Moderate";
    statusColor = "text-orange-500";
    bgStatus = "bg-orange-100";
    strokeColor = "#f97316";
  } else if (value > 30) {
    // 31-50: Good
    internalText = "Good";
    statusColor = "text-yellow-600";
    bgStatus = "bg-yellow-100";
    strokeColor = "#ca8a04";
  } else {
    // 0-30: Fresh
    internalText = "Fresh Air";
    statusColor = "text-emerald-600";
    bgStatus = "bg-emerald-100";
    strokeColor = "#059669";
  }

  // Gunakan customStatus dari ESP32 jika tersedia (e.g. "ASAP", "BAHAYA"), jika tidak gunakan internal
  const displayStatus = customStatus || internalText;

  // 4. Generate Ticks
  const totalTicks = 5;
  const ticks = [];
  for (let i = 0; i <= totalTicks; i++) {
    const tickValue = min + (i * (max - min)) / totalTicks;
    const angle = Math.PI + (i / totalTicks) * Math.PI;

    const innerR = radius - 20;
    const outerR = radius - 8;

    const x1 = cx + innerR * Math.cos(angle);
    const y1 = cy + innerR * Math.sin(angle);
    const x2 = cx + outerR * Math.cos(angle);
    const y2 = cy + outerR * Math.sin(angle);

    ticks.push(
      <g key={i}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text
          x={cx + (radius - 35) * Math.cos(angle)}
          y={cy + (radius - 35) * Math.sin(angle)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[10px] fill-slate-400 font-medium"
        >
          {Math.round(tickValue)}
        </text>
      </g>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden group hover:border-slate-200 transition-all duration-300 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-slate-500 text-sm font-bold tracking-wide uppercase flex items-center gap-2">
          <CloudFog size={18} className="text-slate-400" />
          Kualitas Udara
        </h3>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${bgStatus} ${statusColor}`}
        >
          {displayStatus}
        </span>
      </div>

      {/* Gauge Canvas */}
      <div className="relative flex items-center justify-center -mt-4">
        <svg
          width="100%"
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
          className="overflow-visible mt-6"
        >
          {/* Definisikan Gradient Warna Sesuai 5 Level mq135.h */}
          <defs>
            <linearGradient id="odorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" /> {/* 0-30: Green */}
              <stop offset="30%" stopColor="#eab308" /> {/* 30-50: Yellow */}
              <stop offset="50%" stopColor="#f97316" /> {/* 50-70: Orange */}
              <stop offset="70%" stopColor="#ef4444" /> {/* 70-90: Red */}
              <stop offset="100%" stopColor="#9333ea" /> {/* 90-100: Purple */}
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track Background */}
          <path
            d={`M ${strokeWidth / 2},${cy} A ${radius},${radius} 0 0,1 ${
              size - strokeWidth / 2
            },${cy}`}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Ticks */}
          {ticks}

          {/* Progress Path */}
          <path
            d={`M ${strokeWidth / 2},${cy} A ${radius},${radius} 0 0,1 ${
              size - strokeWidth / 2
            },${cy}`}
            fill="none"
            stroke="url(#odorGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
          />
        </svg>

        {/* Nilai Tengah */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-2">
          <div className="flex flex-col items-center justify-center">
            <span
              className={`text-5xl font-extrabold tracking-tight ${statusColor}`}
            >
              {typeof value === "number" ? value.toFixed(0) : "-"}
            </span>
            <span className="text-sm text-slate-400 font-medium mt-1">
              Odor Score
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-2 text-center min-h-[2.5rem] flex items-center justify-center px-2">
        <p className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg w-full">
          {customLevel || "Menunggu data sensor..."}
        </p>
      </div>
    </div>
  );
}
