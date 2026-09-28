import {
  findAllCareerOpenings,
  findCareerOpeningById,
  findCareerOpeningBySlug,
  insertCareerOpening,
  updateCareerOpening,
  deleteCareerOpening,
  type CareerOpeningRow,
} from "../repositories/careerOpenings.repository";

export interface CareerOpeningDto {
  id: number;
  slug: string;
  title: string;
  department: string;
  icon: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  enabled: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

function parseList(raw: unknown): string[] {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return Array.isArray(raw) ? (raw as string[]) : [];
}

function toDto(row: CareerOpeningRow): CareerOpeningDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department,
    icon: row.icon,
    type: row.type,
    location: row.location,
    summary: row.summary,
    responsibilities: parseList(row.responsibilities),
    requirements: parseList(row.requirements),
    enabled: Boolean(row.enabled),
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 150) || "role"
  );
}

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let suffix = 2;
  while (await findCareerOpeningBySlug(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function listCareerOpenings(): Promise<CareerOpeningDto[]> {
  const rows = await findAllCareerOpenings();
  return rows.map(toDto);
}

export async function listPublishedCareerOpenings(): Promise<CareerOpeningDto[]> {
  const rows = await findAllCareerOpenings();
  return rows.filter((row) => row.enabled).map(toDto);
}

export async function getCareerOpening(id: number): Promise<CareerOpeningDto | null> {
  const row = await findCareerOpeningById(id);
  return row ? toDto(row) : null;
}

export interface CareerOpeningInput {
  title: string;
  department: string;
  icon: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  enabled: boolean;
}

export async function createCareerOpening(data: CareerOpeningInput): Promise<CareerOpeningDto> {
  const slug = await uniqueSlug(data.title);
  const id = await insertCareerOpening({ ...data, slug });
  const row = await findCareerOpeningById(id);
  if (!row) throw new Error("Failed to load newly created career opening");
  return toDto(row);
}

export async function editCareerOpening(id: number, data: CareerOpeningInput): Promise<CareerOpeningDto | null> {
  const existing = await findCareerOpeningById(id);
  if (!existing) return null;

  await updateCareerOpening(id, data);
  const row = await findCareerOpeningById(id);
  return row ? toDto(row) : null;
}

export async function removeCareerOpening(id: number): Promise<boolean> {
  const row = await findCareerOpeningById(id);
  if (!row) return false;

  await deleteCareerOpening(id);
  return true;
}
