-- On/off switches for whole public pages (e.g. the Testimonials page), set
-- from the admin panel. A page with no row here is treated as published, so
-- only pages an admin has actually toggled get a row.
CREATE TABLE IF NOT EXISTS page_visibility (
  page_key VARCHAR(50) NOT NULL PRIMARY KEY,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
