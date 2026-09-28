CREATE TABLE IF NOT EXISTS subcategory_pages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL UNIQUE,
  seo_title VARCHAR(191) NULL,
  seo_description VARCHAR(500) NULL,
  seo_keywords VARCHAR(500) NULL,
  featured_image_url VARCHAR(500) NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_subcategory_pages_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subcategory_page_sections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  subcategory_page_id INT UNSIGNED NOT NULL,
  type ENUM('hero', 'about', 'how_it_helps', 'approach', 'benefits', 'why_choose_us', 'faqs') NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  position SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  data JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_page_section_type (subcategory_page_id, type),
  CONSTRAINT fk_sections_page FOREIGN KEY (subcategory_page_id) REFERENCES subcategory_pages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
