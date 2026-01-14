"use client";

import React, { useSyncExternalStore } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipContentProps,
} from "recharts";

interface SensorData {
  temperature: number;
  humidity: number;
  heat_index: number;
  co2: number;
  timestamp: number;
}

type ChartDatum = {
  temperature: number | null;
  humidity: number | null;
  heat_index: number | null;
  co2: number | null;
  timestamp: number;
  timeStr: string;
};

const renderCustomTooltip = (
  props: TooltipContentProps<number | null, string>
): React.ReactNode => {
  const { active, payload, label } = props;
  if (active && payload && payload.length && label !== "") {
    return (
      <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl text-xs z-50">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        <div className="flex flex-col gap-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500 capitalize">{entry.name}:</span>
              <span className="font-semibold text-slate-800">
                {entry.value}
                {entry.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface SensorChartProps {
  data: SensorData[];
}

export default function SensorChart({ data }: SensorChartProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Konstanta konfigurasi grafik
  const MAX_DATA_POINTS = 15;
  const MIN_DATA_POINTS = 10;
  const enableAnimation = data.length <= MAX_DATA_POINTS;

  const chartData = React.useMemo(() => {
    // 1. Ambil sebagian data terbaru sesuai batas maksimal
    const recentData = data.slice(0, MAX_DATA_POINTS);

    // 2. Format data: Reverse agar urut waktu dari kiri (lama) ke kanan (baru)
    const formattedData: ChartDatum[] = [...recentData].reverse().map((d) => ({
      ...d,
      timeStr: new Date(d.timestamp).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

    // 3. Padding Awal (Agar grafik rapi saat data < 10)
    // Data dummy ditambahkan di kanan agar data asli muncul dari kiri
    const currentLength = formattedData.length;
    if (currentLength > 0 && currentLength < MIN_DATA_POINTS) {
      const emptySlots = MIN_DATA_POINTS - currentLength;
      for (let i = 0; i < emptySlots; i++) {
        formattedData.push({
          timestamp: i, // Dummy ID
          timeStr: "", // Label kosong
          temperature: null,
          humidity: null,
          heat_index: null,
          co2: null,
        });
      }
    }

    return formattedData;
  }, [data]);

  if (!isMounted) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[500px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center w-full">
          <div className="h-4 w-32 bg-slate-200 rounded mb-8"></div>
          <div className="h-[300px] w-full bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-400">
        Belum ada data untuk ditampilkan grafik.
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Tren Lingkungan</h3>
          <p className="text-slate-400 text-sm">
            Gabungan data Suhu (Garis) & Kelembaban (Batang)
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="timeStr"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dy={10}
              padding={{ left: 20, right: 20 }}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fontSize: 11, fill: "#f97316" }}
              axisLine={false}
              tickLine={false}
              domain={[
                (dataMin: number) => Math.floor(dataMin - 2),
                (dataMax: number) => Math.ceil(dataMax + 2),
              ]}
              label={{
                value: "Suhu (°C)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#f97316", fontSize: 11, fontWeight: 500 },
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#3b82f6" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              label={{
                value: "Kelembaban (%)",
                angle: 90,
                position: "insideRight",
                offset: 10,
                style: { fill: "#3b82f6", fontSize: 11, fontWeight: 500 },
              }}
            />

            <Tooltip
              content={renderCustomTooltip}
              cursor={{ fill: "transparent" }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
            />

            <Bar
              yAxisId="right"
              dataKey="humidity"
              name="Kelembaban"
              unit="%"
              barSize={30}
              radius={[6, 6, 0, 0]}
              fill="url(#barGradient)"
              // Animasi aktif jika enableAnimation=true.
              // Durasi 500ms agar "tumbuh" cukup cepat saat update real-time.
              isAnimationActive={enableAnimation}
              animationDuration={500}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              name="Suhu"
              unit="°C"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: "#fff", stroke: "#f97316", strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              // Sama seperti Bar, dikontrol state
              isAnimationActive={enableAnimation}
              animationDuration={500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
