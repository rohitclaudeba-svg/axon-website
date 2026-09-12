import { NextResponse } from "next/server";
import { careerApplicationSchema } from "@/lib/validation";

/**
 * Career application submission endpoint.
 * No database or file storage yet — validates the payload, checks the resume/
 * certificate attachments, and logs the metadata server-side. Once the
 * backend/CMS phase is built, swap this for a real upload + persistence call
 * without changing the frontend form contract.
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

  console.info("[AXON career application received]", {
    ...parsed.data,
    resume: { name: resume.name, size: resume.size, type: resume.type },
    certificates: certificates.map((certificate) => ({
      name: certificate.name,
      size: certificate.size,
      type: certificate.type,
    })),
  });

  return NextResponse.json({ ok: true });
}
