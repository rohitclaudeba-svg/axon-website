import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";

/**
 * Enquiry/appointment submission endpoint.
 * No database yet — validates the payload and logs it server-side. Once the
 * backend/CMS phase is built, swap the body of this handler for a call into
 * the real backend API without changing the frontend form contract.
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

  console.info("[AXON enquiry received]", parsed.data);

  return NextResponse.json({ ok: true });
}
