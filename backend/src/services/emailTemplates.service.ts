import {
  findAllEmailTemplates,
  findEmailTemplateByKey,
  upsertEmailTemplate,
  type EmailTemplateRow,
} from "../repositories/emailTemplates.repository";
import {
  emailTemplateDefinitions,
  emailTemplateKeys,
  type EmailTemplateKey,
} from "../lib/emailTemplateDefaults";
import type { UpdateEmailTemplateInput } from "../validators/emailTemplates";

export interface EmailTemplateDto {
  key: EmailTemplateKey;
  name: string;
  description: string;
  placeholders: string[];
  subject: string;
  body: string;
  enabled: boolean;
  defaultSubject: string;
  defaultBody: string;
  isCustomized: boolean;
  updatedAt: string | null;
}

export function isEmailTemplateKey(value: string): value is EmailTemplateKey {
  return (emailTemplateKeys as readonly string[]).includes(value);
}

function toDto(key: EmailTemplateKey, row: EmailTemplateRow | null): EmailTemplateDto {
  const definition = emailTemplateDefinitions[key];
  return {
    key,
    name: definition.name,
    description: definition.description,
    placeholders: definition.placeholders,
    subject: row?.subject ?? definition.defaultSubject,
    body: row?.body ?? definition.defaultBody,
    enabled: row ? Boolean(row.enabled) : true,
    defaultSubject: definition.defaultSubject,
    defaultBody: definition.defaultBody,
    isCustomized: Boolean(row),
    updatedAt: row?.updated_at ?? null,
  };
}

export async function listEmailTemplates(): Promise<EmailTemplateDto[]> {
  const rows = await findAllEmailTemplates();
  return emailTemplateKeys.map((key) => toDto(key, rows.find((row) => row.template_key === key) ?? null));
}

export async function getEmailTemplate(key: EmailTemplateKey): Promise<EmailTemplateDto> {
  return toDto(key, await findEmailTemplateByKey(key));
}

export async function updateEmailTemplate(
  key: EmailTemplateKey,
  data: UpdateEmailTemplateInput
): Promise<EmailTemplateDto> {
  await upsertEmailTemplate(key, data);
  return getEmailTemplate(key);
}
