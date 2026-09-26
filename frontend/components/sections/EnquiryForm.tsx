"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { services } from "@/content/services";
import { nap } from "@/content/nap";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

const inputClasses =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

/** Half-hour slots across the clinic's real opening hours, labelled with AM/PM. */
function buildTimeSlots(opens: string, closes: string, stepMinutes = 30): string[] {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const toLabel = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const slots: string[] = [];
  for (let t = toMinutes(opens); t <= toMinutes(closes); t += stepMinutes) {
    slots.push(toLabel(t));
  }
  return slots;
}

const timeSlots = buildTimeSlots(nap.openingHours[0].opens, nap.openingHours[0].closes);

export function EnquiryForm({ variant = "appointment" }: { variant?: "appointment" | "contact" }) {
  const { showToast } = useToast();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [minDate, setMinDate] = useState("");

  // Computed client-side to avoid an SSR/client date mismatch.
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryInput) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: variant }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      showToast("Successfully submitted!", "success");
      reset();
      setStatus("idle");
    } catch {
      setStatus("error");
      showToast("Something went wrong submitting your request. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {variant === "appointment" && (
        <div>
          <label htmlFor="email" className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Email <span className="font-normal text-navy/50">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      )}

      {variant === "appointment" && (
        <div>
          <label htmlFor="serviceInterest" className="mb-1.5 block font-heading text-sm font-medium text-navy">
            Service of interest <span className="font-normal text-navy/50">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="serviceInterest"
              className={cn(inputClasses, "appearance-none pr-10")}
              {...register("serviceInterest")}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/50"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {variant === "appointment" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate" className="mb-1.5 block font-heading text-sm font-medium text-navy">
              Preferred date <span className="font-normal text-navy/50">(optional)</span>
            </label>
            <input
              id="preferredDate"
              type="date"
              min={minDate}
              className={inputClasses}
              aria-invalid={!!errors.preferredDate}
              {...register("preferredDate")}
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className="mb-1.5 block font-heading text-sm font-medium text-navy">
              Preferred time <span className="font-normal text-navy/50">(optional)</span>
            </label>
            <div className="relative">
              <select
                id="preferredTime"
                className={cn(inputClasses, "appearance-none pr-10")}
                aria-invalid={!!errors.preferredTime}
                {...register("preferredTime")}
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/50"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block font-heading text-sm font-medium text-navy">
          Anything we should know?{" "}
          <span className="font-normal text-navy/50">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className={cn(inputClasses, "resize-none")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Something went wrong submitting your request. Please try again.
        </div>
      )}

      <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : variant === "appointment" ? (
          "Request Appointment"
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
