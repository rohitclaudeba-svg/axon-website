import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

/**
 * Enquiry/appointment submission endpoint. Validates the form fields, then
 * forwards to the real backend (which stores it and makes it manageable from
 * the admin panel's Appointments/Contacts modules). `source` isn't part of
 * the validated form fields — it's attached by EnquiryForm based on which
 * page/variant submitted, and passed through as-is.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const source =
    typeof body === "object" && body !== null && "source" in body && body.source === "contact"
      ? "contact"
      : "appointment";

  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, source }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return NextResponse.json(
        { ok: false, error: errorBody?.error ?? "Submission failed." },
        { status: response.status }
      );
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Could not reach the server. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
