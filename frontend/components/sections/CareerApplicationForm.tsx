"use client";

import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, ChevronDown, Upload } from "lucide-react";
import { careerApplicationSchema, type CareerApplicationInput } from "@/lib/validation";
import { careerOpenings } from "@/content/careers";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

const inputClasses =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const fileInputClasses = cn(
  inputClasses,
  "cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-light-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary file:transition-colors hover:file:bg-primary hover:file:text-white"
);

export function CareerApplicationForm({ defaultPosition }: { defaultPosition?: string }) {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const { showToast } = useToast();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeError, setResumeError] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certificatesInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerApplicationInput>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: { position: defaultPosition ?? "" },
  });

  const onSubmit = async (data: CareerApplicationInput) => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile) {
      setResumeError("Please attach your resume.");
      return;
    }
    setResumeError("");
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("position", data.position ?? "");
      formData.append("message", data.message ?? "");
      formData.append("resume", resumeFile);
      Array.from(certificatesInputRef.current?.files ?? []).forEach((file) => {
        formData.append("certificates", file);
      });

      const response = await fetch("/api/careers", { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Submission failed");
      }

      showToast("Successfully submitted!", "success");
      reset();
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      if (certificatesInputRef.current) certificatesInputRef.current.value = "";
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      const message = error instanceof Error ? error.message : "Something went wrong submitting your application.";
      setErrorMessage(message);
      showToast(message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? fieldId("name-error") : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id={fieldId("name-error")} className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Phone number
          </label>
          <input
            id={fieldId("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? fieldId("phone-error") : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id={fieldId("phone-error")} className="mt-1.5 text-xs text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("email")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Email
        </label>
        <input
          id={fieldId("email")}
          type="email"
          autoComplete="email"
          className={inputClasses}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? fieldId("email-error") : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id={fieldId("email-error")} className="mt-1.5 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={fieldId("position")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Position applying for
        </label>
        <div className="relative">
          <select id={fieldId("position")} className={cn(inputClasses, "appearance-none pr-10")} {...register("position")}>
            <option value="">General Application</option>
            {careerOpenings.map((opening) => (
              <option key={opening.slug} value={opening.title}>
                {opening.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/50"
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("resume")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Resume / CV <span className="font-normal text-navy/50">(PDF or Word, max 5MB)</span>
        </label>
        <input
          id={fieldId("resume")}
          ref={resumeInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className={fileInputClasses}
          aria-invalid={!!resumeError}
          aria-describedby={resumeError ? fieldId("resume-error") : undefined}
        />
        {resumeError && (
          <p id={fieldId("resume-error")} className="mt-1.5 text-xs text-red-600">
            {resumeError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={fieldId("certificates")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Certificates <span className="font-normal text-navy/50">(optional — PDF, Word or image, max 5MB each)</span>
        </label>
        <input
          id={fieldId("certificates")}
          ref={certificatesInputRef}
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          multiple
          className={fileInputClasses}
        />
      </div>

      <div>
        <label htmlFor={fieldId("message")} className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Cover message <span className="font-normal text-navy/50">(optional)</span>
        </label>
        <textarea
          id={fieldId("message")}
          rows={4}
          className={cn(inputClasses, "resize-none")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? fieldId("message-error") : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id={fieldId("message-error")} className="mt-1.5 text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {errorMessage || "Something went wrong submitting your application. Please try again."}
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" aria-hidden="true" />
            Submit Application
          </>
        )}
      </Button>
    </form>
  );
}
