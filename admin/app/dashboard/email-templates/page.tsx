"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useToast } from "@/components/Toast";
import type { EmailTemplateDto, EmailTemplatesResponse } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";

export default function EmailTemplatesPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [data, setData] = useState<EmailTemplatesResponse | null>(null);

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: EmailTemplatesResponse }>("/api/email-templates")
      .then((result) => setData(result.data))
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load email templates."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (loadError || !data) return <p className="text-sm text-red-600">{loadError || "Failed to load email templates."}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Email Notifications</h1>
      <p className="mt-1 text-sm text-slate-500">
        Emails sent to the clinic inbox whenever a visitor submits the Book Appointment, Contact or Careers form.
        Switch each one on or off and edit its wording here.
      </p>

      <div
        className={`mt-6 max-w-3xl rounded-2xl border p-4 text-sm ${
          data.configured ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-800"
        }`}
      >
        {data.configured ? (
          <>
            <p className="font-semibold">Email sending is set up.</p>
            <p className="mt-1 break-words">Notifications go to: {data.recipients.join(", ")}</p>
          </>
        ) : (
          <>
            <p className="font-semibold">Email sending is not set up yet.</p>
            <p className="mt-1">
              Add SMTP_USER and SMTP_PASS (a Gmail App Password) to the backend&apos;s .env file and restart the
              backend. Until then no notification emails are sent.
            </p>
          </>
        )}
      </div>

      <div className="mt-6 max-w-3xl space-y-6">
        {data.templates.map((template) => (
          <TemplateCard key={template.key} initial={template} configured={data.configured} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ initial, configured }: { initial: EmailTemplateDto; configured: boolean }) {
  const showToast = useToast();
  const [template, setTemplate] = useState(initial);
  const [subject, setSubject] = useState(initial.subject);
  const [body, setBody] = useState(initial.body);
  const [enabled, setEnabled] = useState(initial.enabled);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const lastFocused = useRef<"subject" | "body">("body");

  const isDirty = subject !== template.subject || body !== template.body || enabled !== template.enabled;
  const isDefault = subject === template.defaultSubject && body === template.defaultBody;

  const insertPlaceholder = (name: string) => {
    const token = `{{${name}}}`;
    const field = lastFocused.current === "subject" ? subjectRef.current : bodyRef.current;
    const value = lastFocused.current === "subject" ? subject : body;
    const setValue = lastFocused.current === "subject" ? setSubject : setBody;
    const start = field?.selectionStart ?? value.length;
    const end = field?.selectionEnd ?? value.length;
    setValue(value.slice(0, start) + token + value.slice(end));
    requestAnimationFrame(() => {
      field?.focus();
      field?.setSelectionRange(start + token.length, start + token.length);
    });
  };

  const save = async (
    next: { subject: string; body: string; enabled: boolean },
    successMessage: string
  ): Promise<EmailTemplateDto | null> => {
    setError("");
    setSaving(true);
    try {
      const result = await apiClient.put<{ ok: true; data: EmailTemplateDto }>(
        `/api/email-templates/${template.key}`,
        next
      );
      setTemplate(result.data);
      setEnabled(result.data.enabled);
      showToast(successMessage);
      return result.data;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to save. Please try again.";
      setError(message);
      showToast(message, "error");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setError("Subject and body are both required.");
      return;
    }
    save({ subject, body, enabled }, `${template.name} template saved.`).then((saved) => {
      if (saved) {
        setSubject(saved.subject);
        setBody(saved.body);
      }
    });
  };

  // The switch saves straight away (with the last saved wording) so turning a
  // notification off doesn't depend on also pressing Save. Unsaved edits in the
  // fields are left untouched.
  const onToggle = (next: boolean) => {
    const previous = enabled;
    setEnabled(next);
    save(
      { subject: template.subject, body: template.body, enabled: next },
      `${template.name} notifications turned ${next ? "on" : "off"}.`
    ).then((saved) => {
      if (!saved) setEnabled(previous);
    });
  };

  const onReset = () => {
    setSubject(template.defaultSubject);
    setBody(template.defaultBody);
  };

  const onSendTest = async () => {
    setError("");
    setTesting(true);
    try {
      const result = await apiClient.post<{ ok: true; data: { recipients: string[] } }>(
        `/api/email-templates/${template.key}/test`
      );
      showToast(`Test email sent to ${result.data.recipients.join(", ")}.`);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to send test email.";
      setError(message);
      showToast(message, "error");
    } finally {
      setTesting(false);
    }
  };

  return (
    <form onSubmit={onSave} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-slate-900">{template.name}</h2>
          <p className="mt-1 text-xs text-slate-400">{template.description}</p>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
          <span>{enabled ? "On" : "Off"}</span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`${template.name} notifications`}
            disabled={saving}
            onClick={() => onToggle(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
              enabled ? "bg-green-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </label>
      </div>

      <div className={`mt-4 space-y-4 ${enabled ? "" : "opacity-60"}`}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
          <input
            ref={subjectRef}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={() => (lastFocused.current = "subject")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Body</label>
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => (lastFocused.current = "body")}
            rows={12}
            className={`${inputClass} font-mono text-[13px] leading-relaxed`}
          />
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">Insert a field — tap to add it where the cursor is:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {template.placeholders.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => insertPlaceholder(name)}
                className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100"
              >
                {`{{${name}}}`}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">Fields the visitor left empty show as “-”.</p>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onSendTest}
          disabled={testing || !configured || isDirty}
          title={isDirty ? "Save your changes first" : !configured ? "Email sending isn't set up yet" : undefined}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          {testing ? "Sending…" : "Send Test Email"}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-40 sm:ml-auto"
        >
          Reset to default
        </button>
      </div>
      {isDirty && <p className="mt-2 text-xs text-amber-600">You have unsaved changes.</p>}
    </form>
  );
}
