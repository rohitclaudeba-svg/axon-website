-- Mirrors CareerOpening in frontend/content/types.ts.
CREATE TABLE IF NOT EXISTS career_openings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(191) NOT NULL,
  department VARCHAR(191) NOT NULL,
  icon ENUM('speech','occupational','physiotherapy','special-education','behavioral-therapy',
            'social-groups','school-readiness','play-groups','pediatric','neurological',
            'orthopedic','geriatric','assessment','plan','therapy','progress','gallery',
            'testimonials') NOT NULL,
  employment_type VARCHAR(100) NOT NULL,
  location VARCHAR(191) NOT NULL,
  summary VARCHAR(500) NOT NULL,
  is_open TINYINT(1) NOT NULL DEFAULT 1,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS career_opening_responsibilities (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  career_opening_id INT UNSIGNED NOT NULL,
  item VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_career_responsibilities_opening FOREIGN KEY (career_opening_id)
    REFERENCES career_openings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS career_opening_requirements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  career_opening_id INT UNSIGNED NOT NULL,
  item VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_career_requirements_opening FOREIGN KEY (career_opening_id)
    REFERENCES career_openings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
