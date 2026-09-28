"use client";

import type { FaqItem } from "@/lib/types";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon, PlusIcon } from "@/components/icons";

let counter = 0;
function newId() {
  counter += 1;
  return `new-${Date.now()}-${counter}`;
}

export function FaqListEditor({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  const update = (id: string, patch: Partial<FaqItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const remove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const add = () => {
    onChange([...items, { id: newId(), question: "", answer: "", enabled: true }]);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={item.question}
                onChange={(e) => update(item.id, { question: e.target.value })}
                placeholder="Question"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium focus:border-slate-500 focus:outline-none"
              />
              <textarea
                value={item.answer}
                onChange={(e) => update(item.id, { answer: e.target.value })}
                placeholder="Answer"
                rows={2}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(e) => update(item.id, { enabled: e.target.checked })}
                />
                Enabled
              </label>
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              >
                <ArrowUpIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              >
                <ArrowDownIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        <PlusIcon className="h-4 w-4" /> Add FAQ
      </button>
    </div>
  );
}
