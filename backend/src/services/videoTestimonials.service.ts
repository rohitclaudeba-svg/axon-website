import {
  findAllVideoTestimonials,
  findVideoTestimonialById,
  insertVideoTestimonial,
  updateVideoTestimonial,
  deleteVideoTestimonial,
  type VideoTestimonialRow,
  type VideoTestimonialInput,
} from "../repositories/videoTestimonials.repository";

export interface VideoTestimonialDto {
  id: number;
  youtubeId: string;
  title: string;
  author: string | null;
  thumbnail: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

function toDto(row: VideoTestimonialRow): VideoTestimonialDto {
  return {
    id: row.id,
    youtubeId: row.youtube_id,
    title: row.title,
    author: row.author,
    thumbnail: `https://img.youtube.com/vi/${row.youtube_id}/hqdefault.jpg`,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listVideoTestimonials(): Promise<VideoTestimonialDto[]> {
  const rows = await findAllVideoTestimonials();
  return rows.map(toDto);
}

export async function getVideoTestimonial(id: number): Promise<VideoTestimonialDto | null> {
  const row = await findVideoTestimonialById(id);
  return row ? toDto(row) : null;
}

export async function createVideoTestimonial(data: VideoTestimonialInput): Promise<VideoTestimonialDto> {
  const id = await insertVideoTestimonial(data);
  const row = await findVideoTestimonialById(id);
  if (!row) throw new Error("Failed to load newly created video testimonial");
  return toDto(row);
}

export async function editVideoTestimonial(
  id: number,
  data: VideoTestimonialInput
): Promise<VideoTestimonialDto | null> {
  const existing = await findVideoTestimonialById(id);
  if (!existing) return null;

  await updateVideoTestimonial(id, data);
  const row = await findVideoTestimonialById(id);
  return row ? toDto(row) : null;
}

export async function removeVideoTestimonial(id: number): Promise<boolean> {
  const existing = await findVideoTestimonialById(id);
  if (!existing) return false;

  await deleteVideoTestimonial(id);
  return true;
}
