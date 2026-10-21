-- Admin-editable notification emails sent to the clinic inbox when a public
-- form (book-appointment, contact, careers) is submitted. One row per
-- template_key; rows only exist once an admin saves a template — until then
-- the backend falls back to its built-in defaults
-- (backend/src/lib/emailTemplateDefaults.ts).
CREATE TABLE IF NOT EXISTS email_templates (
  template_key VARCHAR(50) NOT NULL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
