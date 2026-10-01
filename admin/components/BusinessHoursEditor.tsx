"use client";

import { DAYS_OF_WEEK } from "@/lib/types";
import type { HourGroup } from "@/lib/types";
import { TrashIcon, PlusIcon } from "@/components/icons";

let counter = 0;
function newId() {
  counter += 1;
  return `new-${Date.now()}-${counter}`;
}

export function BusinessHoursEditor({
  hours,
  onChange,
}: {
  hours: HourGroup[];
  onChange: (hours: HourGroup[]) => void;
}) {
  const update = (id: string, patch: Partial<HourGroup>) => {
    onChange(hours.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  };

  const toggleDay = (group: HourGroup, day: (typeof DAYS_OF_WEEK)[number]) => {
    const has = group.days.includes(day);
    const days = has ? group.days.filter((d) => d !== day) : [...group.days, day];
    update(group.id, { days });
  };

  const remove = (id: string) => {
    onChange(hours.filter((g) => g.id !== id));
  };

  const add = () => {
    onChange([...hours, { id: newId(), days: [], opens: "", closes: "", closed: false }]);
  };

  return (
    <div className="space-y-3">
      {hours.map((group) => (
        <div key={group.id} className="rounded-lg border border-slate-200 p-3">
          <div className="flex flex-wrap gap-1.5">
            {DAYS_OF_WEEK.map((day) => {
              const active = group.days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(group, day)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <input
                type="time"
                value={group.opens}
                disabled={group.closed}
                onChange={(e) => update(group.id, { opens: e.target.value })}
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:border-slate-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
              <span className="text-slate-400">–</span>
              <input
                type="time"
                value={group.closes}
                disabled={group.closed}
                onChange={(e) => update(group.id, { closes: e.target.value })}
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:border-slate-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={group.closed}
                onChange={(e) => update(group.id, { closed: e.target.checked })}
              />
              Closed
            </label>
            <button
              type="button"
              onClick={() => remove(group.id)}
              aria-label="Remove hours group"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
          {group.days.length === 0 && <p className="mt-2 text-xs text-amber-600">Select at least one day.</p>}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        <PlusIcon className="h-4 w-4" /> Add hours group
      </button>
    </div>
  );
}
