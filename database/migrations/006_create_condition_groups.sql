-- Mirrors ConditionGroup in frontend/content/types.ts.
CREATE TABLE IF NOT EXISTS condition_groups (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(191) NOT NULL,
  description VARCHAR(500) NOT NULL,
  icon ENUM('speech','occupational','physiotherapy','special-education','behavioral-therapy',
            'social-groups','school-readiness','play-groups','pediatric','neurological',
            'orthopedic','geriatric','assessment','plan','therapy','progress','gallery',
            'testimonials') NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS condition_group_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  condition_group_id INT UNSIGNED NOT NULL,
  title VARCHAR(191) NOT NULL,
  description VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_condition_group_items_group FOREIGN KEY (condition_group_id)
    REFERENCES condition_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
