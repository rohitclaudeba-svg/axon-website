"use client";

import { useEffect, useState } from "react";
import { apiClient, ApiError } from "@/lib/apiClient";
import { TextListEditor } from "@/components/TextListEditor";
import { BusinessHoursEditor } from "@/components/BusinessHoursEditor";
import { useToast } from "@/components/Toast";
import type { SiteSettingsDto, TextListItem, HourGroup } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";

export default function SiteSettingsPage() {
  const showToast = useToast();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phones, setPhones] = useState<TextListItem[]>([]);
  const [emails, setEmails] = useState<TextListItem[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [hours, setHours] = useState<HourGroup[]>([]);

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: SiteSettingsDto }>("/api/site-settings")
      .then((result) => {
        const s = result.data;
        setStreetAddress(s.streetAddress);
        setAddressLocality(s.addressLocality);
        setAddressRegion(s.addressRegion);
        setPostalCode(s.postalCode);
        setPhones(s.phones);
        setEmails(s.emails);
        setWhatsappNumber(s.whatsappNumber);
        setHours(s.hours);
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load site settings."))
      .finally(() => setLoading(false));
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    setSaved(false);

    if (phones.length === 0 || phones.every((p) => !p.text.trim())) {
      setSaveError("Please add at least one phone number.");
      return;
    }
    if (emails.length === 0 || emails.every((e2) => !e2.text.trim())) {
      setSaveError("Please add at least one email address.");
      return;
    }
    if (hours.length === 0) {
      setSaveError("Please add at least one hours entry.");
      return;
    }
    if (hours.some((h) => h.days.length === 0)) {
      setSaveError("Every hours entry needs at least one day selected.");
      return;
    }

    setSaving(true);
    try {
      const result = await apiClient.put<{ ok: true; data: SiteSettingsDto }>("/api/site-settings", {
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        phones: phones.filter((p) => p.text.trim()),
        emails: emails.filter((e2) => e2.text.trim()),
        whatsappNumber,
        hours,
      });
      setPhones(result.data.phones);
      setEmails(result.data.emails);
      setHours(result.data.hours);
      setSaved(true);
      showToast("Site settings saved.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to save. Please try again.";
      setSaveError(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Address, phone numbers, email addresses and business hours shown across the site — footer, contact page,
        floating call/WhatsApp buttons and search-engine listing info.
      </p>

      <form onSubmit={onSave} className="mt-6 max-w-3xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Address</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Street address</label>
              <input
                type="text"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">City / Town</label>
                <input
                  type="text"
                  required
                  value={addressLocality}
                  onChange={(e) => setAddressLocality(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
                <input
                  type="text"
                  required
                  value={addressRegion}
                  onChange={(e) => setAddressRegion(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Postal code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Phone numbers</h2>
          <p className="mt-1 text-xs text-slate-400">
            The Primary number is used for the floating call button and as the main number in the footer and contact page.
          </p>
          <div className="mt-4">
            <TextListEditor items={phones} onChange={setPhones} placeholder="e.g. +91-94456-80838" markPrimary />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">WhatsApp number</h2>
          <p className="mt-1 text-xs text-slate-400">
            Digits only with country code, no +, spaces or dashes — used for the WhatsApp floating button.
          </p>
          <div className="mt-3">
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 919445680838"
              className={`${inputClass} sm:w-60`}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Email addresses</h2>
          <p className="mt-1 text-xs text-slate-400">The Primary address is used as the main contact email.</p>
          <div className="mt-4">
            <TextListEditor items={emails} onChange={setEmails} placeholder="e.g. info@example.com" markPrimary />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Business hours</h2>
          <p className="mt-1 text-xs text-slate-400">
            Group days that share the same hours — e.g. one entry for Mon–Sat, another for Sunday — instead of
            setting every day individually.
          </p>
          <div className="mt-4">
            <BusinessHoursEditor hours={hours} onChange={setHours} />
          </div>
        </div>

        {saveError && <p className="text-sm text-red-600">{saveError}</p>}
        {saved && !saveError && <p className="text-sm text-green-600">Saved.</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
