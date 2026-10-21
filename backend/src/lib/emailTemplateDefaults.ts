// Built-in notification templates. Used as-is until an admin saves an edited
// version from the admin panel's Email Notifications page, and as the
// "Reset to default" target. Bodies are plain text — {{placeholder}} values
// are substituted (HTML-escaped) and line breaks preserved when sent.

export const emailTemplateKeys = ["appointment", "contact", "career_application"] as const;
export type EmailTemplateKey = (typeof emailTemplateKeys)[number];

export interface EmailTemplateDefinition {
  key: EmailTemplateKey;
  name: string;
  description: string;
  placeholders: string[];
  sample: Record<string, string>;
  defaultSubject: string;
  defaultBody: string;
}

const enquiryPlaceholders = [
  "name",
  "phone",
  "email",
  "service",
  "preferredDate",
  "preferredTime",
  "message",
  "submittedAt",
];

const enquirySample = {
  name: "Test Patient",
  phone: "9876543210",
  email: "test.patient@example.com",
  service: "Physiotherapy",
  preferredDate: "2026-11-05",
  preferredTime: "10:30",
  message: "This is a test notification sent from the admin panel.",
  submittedAt: "05 Nov 2026, 10:00 am",
};

export const emailTemplateDefinitions: Record<EmailTemplateKey, EmailTemplateDefinition> = {
  appointment: {
    key: "appointment",
    name: "Book Appointment",
    description: "Sent when someone submits the Book Appointment form.",
    placeholders: enquiryPlaceholders,
    sample: enquirySample,
    defaultSubject: "New appointment request: {{name}} ({{phone}})",
    defaultBody: [
      "A new appointment request was submitted on the website.",
      "",
      "Name: {{name}}",
      "Phone: {{phone}}",
      "Email: {{email}}",
      "Service: {{service}}",
      "Preferred date: {{preferredDate}}",
      "Preferred time: {{preferredTime}}",
      "Message: {{message}}",
      "",
      "Submitted at: {{submittedAt}}",
    ].join("\n"),
  },
  contact: {
    key: "contact",
    name: "Contact Enquiry",
    description: "Sent when someone submits the Contact form.",
    placeholders: enquiryPlaceholders,
    sample: enquirySample,
    defaultSubject: "New contact enquiry: {{name}} ({{phone}})",
    defaultBody: [
      "A new contact enquiry was submitted on the website.",
      "",
      "Name: {{name}}",
      "Phone: {{phone}}",
      "Email: {{email}}",
      "Service: {{service}}",
      "Message: {{message}}",
      "",
      "Submitted at: {{submittedAt}}",
    ].join("\n"),
  },
  career_application: {
    key: "career_application",
    name: "Career Application",
    description: "Sent when someone applies through the Careers page.",
    placeholders: [
      "name",
      "phone",
      "email",
      "position",
      "message",
      "resumeFilename",
      "certificateCount",
      "attachedFiles",
      "submittedAt",
    ],
    sample: {
      name: "Test Applicant",
      phone: "9876543210",
      email: "test.applicant@example.com",
      position: "Physiotherapist",
      message: "This is a test notification sent from the admin panel.",
      resumeFilename: "resume.pdf",
      certificateCount: "2",
      attachedFiles: "None (test email — real applications attach the resume and certificates)",
      submittedAt: "05 Nov 2026, 10:00 am",
    },
    defaultSubject: "New career application: {{name}} for {{position}}",
    defaultBody: [
      "A new job application was submitted on the website.",
      "",
      "Name: {{name}}",
      "Phone: {{phone}}",
      "Email: {{email}}",
      "Position: {{position}}",
      "Message: {{message}}",
      "Resume: {{resumeFilename}}",
      "Certificates: {{certificateCount}}",
      "",
      "The resume and certificates are also available in the admin panel (Enquiries → Career Applications).",
      "",
      "Submitted at: {{submittedAt}}",
    ].join("\n"),
  },
};
