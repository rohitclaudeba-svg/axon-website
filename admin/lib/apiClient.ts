import { getToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const isFormData = options.body instanceof FormData;
  if (!isFormData && options.body) headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Validation failures come back as { errors: { field: [messages] } } rather
    // than a single `error` string — surface the first field message instead
    // of falling back to a generic "Request failed".
    const fieldError = data?.errors && Object.values(data.errors)[0];
    const message = data?.error ?? (Array.isArray(fieldError) ? fieldError[0] : undefined) ?? "Request failed";
    throw new ApiError(message, response.status);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body instanceof FormData ? body : JSON.stringify(body) }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

/**
 * Fetches an admin-only file (resumes/certificates aren't served from a
 * public static path, so a plain <a href> can't carry the Bearer token) as a
 * blob — for previewing in the page or saving via downloadFile.
 */
export async function fetchFile(path: string): Promise<Blob> {
  const token = getToken();
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { headers });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(data?.error ?? "Download failed", response.status);
  }
  return response.blob();
}

/** Triggers a browser save of a blob through a throwaway link. */
export function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Downloads an admin-only file straight to disk. */
export async function downloadFile(path: string, filename: string): Promise<void> {
  saveBlob(await fetchFile(path), filename);
}

export { API_BASE_URL };
