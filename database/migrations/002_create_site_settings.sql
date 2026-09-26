-- Singleton business-info ("NAP") table — mirrors frontend/content/nap.ts.
-- Only ever one row (id = 1). The API only ever exposes GET/PUT for this table,
-- never POST/DELETE; the CHECK constraint is a belt-and-suspenders DB-level guard.
CREATE TABLE IF NOT EXISTS site_settings (
  id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  brand_name VARCHAR(191) NOT NULL,
  legal_name VARCHAR(191) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  emotional_tagline VARCHAR(255) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  address_locality VARCHAR(150) NOT NULL,
  address_region VARCHAR(150) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  address_country VARCHAR(100) NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  whatsapp_number VARCHAR(20) NOT NULL,
  whatsapp_default_message VARCHAR(500) NOT NULL,
  email VARCHAR(191) NOT NULL,
  map_embed_url TEXT NOT NULL,
  map_directions_url TEXT NOT NULL,
  google_reviews_url TEXT NOT NULL,
  site_url VARCHAR(255) NOT NULL,
  social_facebook VARCHAR(255) NOT NULL DEFAULT '',
  social_instagram VARCHAR(255) NOT NULL DEFAULT '',
  social_youtube VARCHAR(255) NOT NULL DEFAULT '',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_site_settings_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7 rows, Monday–Sunday. display_time is the human string shown on the site
-- (e.g. "3:00 PM – 7:00 PM"); opens_24h/closes_24h are derived 24h times used
-- server-side to build the schema.org OpeningHoursSpecification JSON-LD.
CREATE TABLE IF NOT EXISTS business_hours (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  day_of_week ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL UNIQUE,
  display_time VARCHAR(50) NOT NULL,
  opens_24h TIME NULL,
  closes_24h TIME NULL,
  closed TINYINT(1) NOT NULL DEFAULT 0,
  position SMALLINT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
