-- Backs both the "Appointments" and "Contacts" admin modules — one table,
-- distinguished by `source`, since both public forms (book-appointment and
-- contact) already submit through the same shape (frontend/lib/validation.ts
-- enquirySchema). Admin lists filter by source rather than using two tables.
CREATE TABLE IF NOT EXISTS enquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  source ENUM('appointment','contact') NOT NULL DEFAULT 'appointment',
  name VARCHAR(191) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(191) NULL,
  service_interest VARCHAR(191) NULL,
  preferred_date DATE NULL,
  preferred_time VARCHAR(20) NULL,
  message TEXT NULL,
  status ENUM('waiting_for_action','no_response','follow_up','appointment_confirmed','consultation_done')
    NOT NULL DEFAULT 'waiting_for_action',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiries_source (source),
  INDEX idx_enquiries_status (status),
  INDEX idx_enquiries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
