"use client";

import type { TextListItem } from "@/lib/types";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon, PlusIcon } from "@/components/icons";

let counter = 0;
function newId() {
  counter += 1;
  return `new-${Date.now()}-${counter}`;
}

export function TextListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: TextListItem[];
  onChange: (items: TextListItem[]) => void;
  placeholder?: string;
}) {
  const update = (id: string, text: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, text } : item)));
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
    onChange([...items, { id: newId(), text: "" }]);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="text"
            value={item.text}
            onChange={(e) => update(item.id, e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => move(index, -1)}
            disabled={index === 0}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => move(index, 1)}
            disabled={index === items.length - 1}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          >
            <ArrowDownIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        <PlusIcon className="h-4 w-4" /> Add item
      </button>
    </div>
  );
}
