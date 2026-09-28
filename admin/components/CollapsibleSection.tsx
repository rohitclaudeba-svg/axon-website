"use client";

import { useState } from "react";
import { ChevronDownIcon, ArrowUpIcon, ArrowDownIcon } from "@/components/icons";

export function CollapsibleSection({
  title,
  enabled,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  defaultOpen = false,
  children,
}: {
  title: string;
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <ChevronDownIcon className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
          <span className="font-semibold text-slate-900">{title}</span>
          {!enabled && (
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
              Disabled
            </span>
          )}
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            title="Move section up"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            title="Move section down"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30"
          >
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </button>
          <label className="ml-2 flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <input type="checkbox" checked={enabled} onChange={(e) => onToggleEnabled(e.target.checked)} />
            Enabled
          </label>
        </div>
      </div>

      {open && <div className="space-y-4 px-4 py-4">{children}</div>}
    </div>
  );
}
