import type { EnquiryStatus } from "./types";

export const statusOptions: { value: EnquiryStatus; label: string }[] = [
  { value: "waiting_for_action", label: "Waiting for Action" },
  { value: "no_response", label: "No Response" },
  { value: "follow_up", label: "Follow Up" },
  { value: "appointment_confirmed", label: "Appointment Confirmed" },
  { value: "consultation_done", label: "Consultation Done" },
];

export function statusLabel(status: EnquiryStatus): string {
  return statusOptions.find((o) => o.value === status)?.label ?? status;
}

export function statusBadgeClasses(status: EnquiryStatus): string {
  switch (status) {
    case "waiting_for_action":
      return "bg-slate-100 text-slate-600";
    case "no_response":
      return "bg-red-50 text-red-700";
    case "follow_up":
      return "bg-amber-50 text-amber-700";
    case "appointment_confirmed":
      return "bg-blue-50 text-blue-700";
    case "consultation_done":
      return "bg-green-50 text-green-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}
