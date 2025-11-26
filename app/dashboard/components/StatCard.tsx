import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  statusMessage?: string;
}

export default function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  colorClass,
  bgClass,
  statusMessage,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
            {title}
          </h3>
          {statusMessage && (
            <span className="text-xs font-medium text-slate-400 mt-1 block">
              {statusMessage}
            </span>
          )}
        </div>
        <div
          className={`p-2.5 rounded-xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}
        >
          <Icon size={22} />
        </div>
      </div>
      <div className="flex items-baseline gap-1 min-w-0">
        <span className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight truncate">
          {value}
        </span>
        <span className="text-sm md:text-lg font-medium text-slate-400 ml-1">
          {unit}
        </span>
      </div>
    </div>
  );
}
