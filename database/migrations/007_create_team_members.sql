-- Mirrors TeamMember in frontend/content/types.ts. photoPlaceholder isn't
-- persisted — real photos are modeled via media_placements (entity_type =
-- 'team_member', purpose = 'portrait').
CREATE TABLE IF NOT EXISTS team_members (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(191) NOT NULL,
  credentials VARCHAR(255) NULL,
  role VARCHAR(255) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_member_bio_paragraphs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  team_member_id INT UNSIGNED NOT NULL,
  paragraph TEXT NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_team_bio_paragraphs_member FOREIGN KEY (team_member_id)
    REFERENCES team_members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
