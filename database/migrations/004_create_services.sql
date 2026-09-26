-- Mirrors ServiceEntry in frontend/content/types.ts.
CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(191) NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  icon ENUM('speech','occupational','physiotherapy','special-education','behavioral-therapy',
            'social-groups','school-readiness','play-groups','pediatric','neurological',
            'orthopedic','geriatric','assessment','plan','therapy','progress','gallery',
            'testimonials') NOT NULL,
  hero_summary VARCHAR(500) NOT NULL,
  what_it_is TEXT NOT NULL,
  seo_title VARCHAR(191) NOT NULL,
  seo_description VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_support_areas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  title VARCHAR(191) NOT NULL,
  description VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_support_areas_service FOREIGN KEY (service_id)
    REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional, richer alternative to a flat support-areas list (only used by one
-- service today, e.g. Behavioral Therapy) — a service can have either or both.
CREATE TABLE IF NOT EXISTS service_approach_sections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  title VARCHAR(191) NOT NULL,
  intro VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_approach_sections_service FOREIGN KEY (service_id)
    REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_approach_section_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  approach_section_id INT UNSIGNED NOT NULL,
  title VARCHAR(191) NOT NULL,
  description VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_approach_items_section FOREIGN KEY (approach_section_id)
    REFERENCES service_approach_sections(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_who_may_benefit (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  item VARCHAR(255) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_who_benefit_service FOREIGN KEY (service_id)
    REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_process_steps (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  step VARCHAR(500) NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_process_steps_service FOREIGN KEY (service_id)
    REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_faqs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id INT UNSIGNED NOT NULL,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_service_faqs_service FOREIGN KEY (service_id)
    REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
