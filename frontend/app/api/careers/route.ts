import { NextResponse } from "next/server";
import { careerApplicationSchema } from "@/lib/validation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

/**
 * Career application submission endpoint. Validates the payload and file
 * attachments, then forwards the multipart form to the real backend (which
 * stores the resume/certificates and the application, manageable from the
 * admin panel's Enquiries > Career Applications module).
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fields = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    position: formData.get("position")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = careerApplicationSchema.safeParse(fields);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const resume = formData.get("resume");

  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ ok: false, error: "Please attach your resume." }, { status: 422 });
  }
  if (resume.size > MAX_FILE_SIZE) {
    return NextResponse.json({ ok: false, error: "Resume must be smaller than 5MB." }, { status: 422 });
  }
  if (!ALLOWED_FILE_TYPES.includes(resume.type)) {
    return NextResponse.json({ ok: false, error: "Resume must be a PDF or Word document." }, { status: 422 });
  }

  const certificates = formData.getAll("certificates").filter((value): value is File => value instanceof File && value.size > 0);

  for (const certificate of certificates) {
    if (certificate.size > MAX_FILE_SIZE) {
      return NextResponse.json({ ok: false, error: `${certificate.name} must be smaller than 5MB.` }, { status: 422 });
    }
    if (!ALLOWED_FILE_TYPES.includes(certificate.type)) {
      return NextResponse.json(
        { ok: false, error: `${certificate.name} must be a PDF, Word document or image.` },
        { status: 422 }
      );
    }
  }

  const forward = new FormData();
  forward.append("name", parsed.data.name);
  forward.append("email", parsed.data.email);
  forward.append("phone", parsed.data.phone);
  forward.append("position", parsed.data.position ?? "");
  forward.append("message", parsed.data.message ?? "");
  forward.append("resume", resume, resume.name);
  for (const certificate of certificates) {
    forward.append("certificates", certificate, certificate.name);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/career-applications`, {
      method: "POST",
      body: forward,
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
