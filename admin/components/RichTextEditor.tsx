"use client";

import { useEffect, useRef } from "react";

function ToolbarButton({ label, onClick, title }: { label: string; onClick: () => void; title: string }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
    >
      {label}
    </button>
  );
}

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  };

  const onLink = () => {
    const url = window.prompt("Link URL");
    if (url) exec("createLink", url);
  };

  return (
    <div className="rounded-lg border border-slate-300">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-1.5">
        <ToolbarButton label="B" title="Bold" onClick={() => exec("bold")} />
        <ToolbarButton label="I" title="Italic" onClick={() => exec("italic")} />
        <ToolbarButton label="H2" title="Heading" onClick={() => exec("formatBlock", "H2")} />
        <ToolbarButton label="¶" title="Paragraph" onClick={() => exec("formatBlock", "P")} />
        <ToolbarButton label="• List" title="Bullet list" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton label="Link" title="Insert link" onClick={onLink} />
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        className="min-h-[140px] px-3 py-2 text-sm leading-relaxed focus:outline-none [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-blue-600 [&_a]:underline"
        suppressContentEditableWarning
      />
    </div>
  );
}
