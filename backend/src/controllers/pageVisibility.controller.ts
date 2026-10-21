import type { Request, Response } from "express";
import { z } from "zod";
import type { AuthedRequest } from "../middleware/requireAuth";
import { getPageVisibility, setPageVisibility, isToggleablePageKey } from "../services/pageVisibility.service";

const updatePageVisibilitySchema = z.object({ enabled: z.boolean() });

export async function getPageVisibilityHandler(_req: Request, res: Response) {
  const visibility = await getPageVisibility();
  res.json({ ok: true, data: visibility });
}

export async function updatePageVisibilityHandler(req: AuthedRequest, res: Response) {
  const key = req.params.key;
  if (!isToggleablePageKey(key)) {
    return res.status(404).json({ ok: false, error: "Page not found" });
  }

  const parsed = updatePageVisibilitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const visibility = await setPageVisibility(key, parsed.data.enabled);
  res.json({ ok: true, data: visibility });
}
