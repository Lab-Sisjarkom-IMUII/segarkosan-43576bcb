import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-32"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>
            <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
          </div>
          <div className="h-8 w-1/2 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
