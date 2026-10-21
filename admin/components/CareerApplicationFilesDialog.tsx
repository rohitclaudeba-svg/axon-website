"use client";

import { useEffect, useRef, useState } from "react";
import { fetchFile, saveBlob, ApiError } from "@/lib/apiClient";
import type { CareerApplicationDto } from "@/lib/types";

interface AttachedFile {
  key: string;
  label: string;
  filename: string;
  path: string;
}

function attachedFiles(application: CareerApplicationDto): AttachedFile[] {
  return [
    {
      key: "resume",
      label: "Resume / CV",
      filename: application.resumeOriginalFilename,
      path: `/api/career-applications/${application.id}/resume`,
    },
    ...application.certificates.map((certificate) => ({
      key: `certificate-${certificate.index}`,
      label: `Certificate ${certificate.index + 1}`,
      filename: certificate.originalFilename,
      path: `/api/career-applications/${application.id}/certificates/${certificate.index}`,
    })),
  ];
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
    </svg>
  );
}

/**
 * Popup listing every file attached to a career application (resume +
 * certificates), with an in-page preview for PDFs/images and a download
 * button per file.
 */
export function CareerApplicationFilesDialog({
  application,
  onClose,
}: {
  application: CareerApplicationDto;
  onClose: () => void;
}) {
  const files = attachedFiles(application);
  const blobCache = useRef(new Map<string, Blob>());
  const [selectedKey, setSelectedKey] = useState(files[0].key);
  const [preview, setPreview] = useState<{ key: string; url: string; type: string } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  const getBlob = async (file: AttachedFile): Promise<Blob> => {
    const cached = blobCache.current.get(file.key);
    if (cached) return cached;
    const blob = await fetchFile(file.path);
    blobCache.current.set(file.key, blob);
    return blob;
  };

  // Load the selected file for preview; revoke the previous object URL.
  useEffect(() => {
    const file = files.find((f) => f.key === selectedKey);
    if (!file) return;
    let cancelled = false;
    let url: string | null = null;

    setPreviewLoading(true);
    setError("");
    getBlob(file)
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setPreview({ key: file.key, url, type: blob.type });
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Failed to load file.");
      })
      .finally(() => {
        if (!cancelled) setPreviewLoading(false);
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onDownload = async (file: AttachedFile) => {
    setDownloadingKey(file.key);
    setError("");
    try {
      saveBlob(await getBlob(file), file.filename);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to download file.");
    } finally {
      setDownloadingKey(null);
    }
  };

  const selectedFile = files.find((f) => f.key === selectedKey) ?? files[0];
  const currentPreview = preview?.key === selectedKey ? preview : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-0 sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Files from ${application.name}`}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-5xl flex-col overflow-hidden bg-white shadow-xl sm:h-[90vh] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="truncate font-bold text-slate-900">{application.name}</h2>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {application.position || "General Application"} · {files.length}{" "}
              {files.length === 1 ? "file" : "files"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* File list */}
          <ul className="max-h-[40%] shrink-0 space-y-2 overflow-y-auto border-b border-slate-200 p-3 md:max-h-none md:w-80 md:border-b-0 md:border-r">
            {files.map((file) => {
              const active = file.key === selectedKey;
              return (
                <li
                  key={file.key}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 transition-colors ${
                    active ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedKey(file.key)}
                    className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                  >
                    <FileIcon className="h-5 w-5 shrink-0 text-slate-400" />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {file.label}
                      </span>
                      <span className="block truncate text-sm text-slate-800" title={file.filename}>
                        {file.filename}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDownload(file)}
                    disabled={downloadingKey === file.key}
                    aria-label={`Download ${file.filename}`}
                    title="Download"
                    className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{downloadingKey === file.key ? "…" : "Download"}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Preview */}
          <div className="flex min-h-0 flex-1 flex-col bg-slate-100">
            {error && <p className="m-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {previewLoading && !currentPreview ? (
              <p className="m-auto text-sm text-slate-500">Loading preview…</p>
            ) : currentPreview?.type === "application/pdf" ? (
              <iframe src={currentPreview.url} title={selectedFile.filename} className="h-full w-full flex-1 border-0" />
            ) : currentPreview?.type.startsWith("image/") ? (
              <div className="flex flex-1 items-center justify-center overflow-auto p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentPreview.url} alt={selectedFile.filename} className="max-h-full max-w-full object-contain" />
              </div>
            ) : currentPreview ? (
              <div className="m-auto max-w-xs p-6 text-center">
                <FileIcon className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3 text-sm text-slate-600">
                  Preview isn&apos;t available for this file type (e.g. Word documents). Download it to open.
                </p>
                <button
                  type="button"
                  onClick={() => onDownload(selectedFile)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download {selectedFile.filename}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
