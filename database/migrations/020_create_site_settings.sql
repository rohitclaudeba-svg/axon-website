CREATE TABLE IF NOT EXISTS site_settings (
  id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  street_address VARCHAR(255) NOT NULL DEFAULT '',
  address_locality VARCHAR(191) NOT NULL DEFAULT '',
  address_region VARCHAR(191) NOT NULL DEFAULT '',
  postal_code VARCHAR(20) NOT NULL DEFAULT '',
  address_country VARCHAR(2) NOT NULL DEFAULT 'IN',
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  phones JSON NOT NULL,
  emails JSON NOT NULL,
  whatsapp_number VARCHAR(20) NULL,
  hours JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_site_settings_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
