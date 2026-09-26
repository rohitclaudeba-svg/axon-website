-- Replaces gallery_images with a unified gallery_items table supporting both
-- uploaded photos and YouTube videos in one admin-managed, orderable list.
-- Safe to drop: gallery_images has never held real data.
DROP TABLE IF EXISTS gallery_images;

CREATE TABLE IF NOT EXISTS gallery_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('image','video') NOT NULL,
  filename VARCHAR(255) NULL,          -- image only, stored file on disk
  original_filename VARCHAR(255) NULL, -- image only
  youtube_id VARCHAR(20) NULL,         -- video only
  title VARCHAR(255) NULL,             -- video only
  description VARCHAR(500) NOT NULL DEFAULT '',
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
