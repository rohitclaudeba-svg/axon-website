"use client";

import type { HoursDay } from "@/lib/types";

export function BusinessHoursEditor({
  hours,
  onChange,
}: {
  hours: HoursDay[];
  onChange: (hours: HoursDay[]) => void;
}) {
  const update = (day: string, patch: Partial<HoursDay>) => {
    onChange(hours.map((h) => (h.day === day ? { ...h, ...patch } : h)));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-3 py-2.5">Day</th>
            <th className="px-3 py-2.5">Opens</th>
            <th className="px-3 py-2.5">Closes</th>
            <th className="px-3 py-2.5">Closed</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((h) => (
            <tr key={h.day} className="border-b border-slate-100 last:border-0">
              <td className="px-3 py-2.5 font-medium text-slate-800">{h.day}</td>
              <td className="px-3 py-2.5">
                <input
                  type="time"
                  value={h.opens}
                  disabled={h.closed}
                  onChange={(e) => update(h.day, { opens: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:border-slate-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                />
              </td>
              <td className="px-3 py-2.5">
                <input
                  type="time"
                  value={h.closes}
                  disabled={h.closed}
                  onChange={(e) => update(h.day, { closes: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:border-slate-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                />
              </td>
              <td className="px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={h.closed}
                  onChange={(e) => update(h.day, { closed: e.target.checked })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
