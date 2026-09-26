import {
  findAllReviews,
  findReviewById,
  insertReview,
  updateReview,
  deleteReview,
  type ReviewRow,
  type ReviewInput,
} from "../repositories/reviews.repository";

export interface ReviewDto {
  id: number;
  quote: string;
  author: string;
  context: string | null;
  rating: number | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

function toDto(row: ReviewRow): ReviewDto {
  return {
    id: row.id,
    quote: row.quote,
    author: row.author,
    context: row.context,
    rating: row.rating,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listReviews(): Promise<ReviewDto[]> {
  const rows = await findAllReviews();
  return rows.map(toDto);
}

export async function getReview(id: number): Promise<ReviewDto | null> {
  const row = await findReviewById(id);
  return row ? toDto(row) : null;
}

export async function createReview(data: ReviewInput): Promise<ReviewDto> {
  const id = await insertReview(data);
  const row = await findReviewById(id);
  if (!row) throw new Error("Failed to load newly created review");
  return toDto(row);
}

export async function editReview(id: number, data: ReviewInput): Promise<ReviewDto | null> {
  const existing = await findReviewById(id);
  if (!existing) return null;

  await updateReview(id, data);
  const row = await findReviewById(id);
  return row ? toDto(row) : null;
}

export async function removeReview(id: number): Promise<boolean> {
  const existing = await findReviewById(id);
  if (!existing) return false;

  await deleteReview(id);
  return true;
}
