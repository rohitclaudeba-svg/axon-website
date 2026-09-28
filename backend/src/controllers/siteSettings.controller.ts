import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import { getSiteSettings, updateSiteSettings } from "../services/siteSettings.service";
import { updateSiteSettingsSchema } from "../validators/siteSettings";

export async function getSiteSettingsHandler(_req: AuthedRequest, res: Response) {
  const settings = await getSiteSettings();
  res.json({ ok: true, data: settings });
}

export async function updateSiteSettingsHandler(req: AuthedRequest, res: Response) {
  const parsed = updateSiteSettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const settings = await updateSiteSettings(parsed.data);
  res.json({ ok: true, data: settings });
}
