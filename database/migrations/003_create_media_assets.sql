-- Generic media modeling — covers every image in frontend/content/media.ts.
CREATE TABLE IF NOT EXISTS media_assets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  src TEXT NOT NULL,
  alt VARCHAR(500) NOT NULL,
  focal VARCHAR(50) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Where a media_asset is used. Singleton placements (heroImage, careersImage, ...)
-- have entity_type/entity_id NULL. Per-entity placements (serviceShowcaseImages,
-- programImages, conditionGroupImages, teamImages, ...) set entity_type to the
-- owning table's logical name and entity_id to that row's id. The unique
-- constraint enforces "one image per purpose per entity", matching how each
-- media.ts map key currently works.
CREATE TABLE IF NOT EXISTS media_placements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  media_asset_id INT UNSIGNED NOT NULL,
  purpose VARCHAR(64) NOT NULL,
  entity_type ENUM('service','program','condition_group','team_member') NULL,
  entity_id INT UNSIGNED NULL,
  CONSTRAINT fk_media_placements_asset FOREIGN KEY (media_asset_id)
    REFERENCES media_assets(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_placement (purpose, entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
