-- Mirrors the local VideoTestimonial interface in
-- frontend/content/videoTestimonials.ts. Only seed the real videos here — the
-- ×2 display-padding on the gallery/testimonials pages is a presentation-layer
-- concern, not data.
CREATE TABLE IF NOT EXISTS video_testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  youtube_id VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(150) NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
