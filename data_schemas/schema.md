## BOOLCORE

# products

- id || PK INT UNIQUE AUTOINC
- name || VARCHAR(255) NOTNULL
- description ||
- price || DECIMAL
-date || DATE
- discount || INT

# in-voice

- id || PK INT UNIQUE AUTOINC
- name || VARCHAR(255)
- last_name || VARCHAR(255)
- email || CHAR(50)
- date || DATE
- address || VARCHAR(100)
- city || CHAR(50)
- cap || INT(5)
- country || CHAR(50)
- total || DECIMAL
- payment_method || VARCHAR(45)
- shipping_price ||

# images

- image
- product_id || FK

# product_order

- id || PK INT UNIQUE AUTOINC

# categories

- id || PK INT UNIQUE AUTOINC

# details

- id || PK INT UNIQUE AUTOINC
- product_id
- ram
- processor
- storage
- graphic_card
- os
- psu
- case
- motherboard
- color
- dpi
- audio_type
- connectivity
- keyboard_layout
- keyboard_type
- impedance
- frequency

QUERIES:

-- Categories
INSERT INTO categories (id, name) VALUES
(1, 'pc fissi'),
(2, 'portatili'),
(3, 'accessori');

-- Products
INSERT INTO products (id, categories_id, name, description, price, discount, create_date, details) VALUES
(1, 1, 'Desktop Alpha', 'PC fisso per ufficio', 800, 50, '2025-09-03', 'Dettagli Desktop Alpha'),
(2, 1, 'Desktop Beta', 'PC fisso gaming', 1500, 100, '2025-09-03', 'Dettagli Desktop Beta'),
(3, 2, 'Laptop Gamma', 'Portatile leggero', 1200, 80, '2025-09-03', 'Dettagli Laptop Gamma'),
(4, 2, 'Laptop Delta', 'Portatile business', 1400, 120, '2025-09-03', 'Dettagli Laptop Delta'),
(5, 3, 'Mouse Speed', 'Mouse ottico USB', 30, 5, '2025-09-03', 'Dettagli Mouse Speed'),
(6, 3, 'Tastiera Pro', 'Tastiera meccanica', 90, 10, '2025-09-03', 'Dettagli Tastiera Pro'),
(7, 3, 'Cuffie Bass', 'Cuffie stereo', 60, 8, '2025-09-03', 'Dettagli Cuffie Bass'),
(8, 2, 'Laptop Epsilon', 'Portatile touch', 1600, 150, '2025-09-03', 'Dettagli Laptop Epsilon'),
(9, 1, 'Desktop Omega', 'PC fisso mini', 700, 40, '2025-09-03', 'Dettagli Desktop Omega'),
(10, 3, 'Mouse Wireless', 'Mouse wireless bluetooth', 40, 6, '2025-09-03', 'Dettagli Mouse Wireless');

-- Details (solo esempio, puoi espandere)
INSERT INTO details (product_id, ram, processor, storage, graphic_card, os, psu, case, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency) VALUES
(1, '8GB', 'Intel i5', '256GB SSD', 'Intel UHD', 'Windows 11', '500W', 'ATX', 'MSI B460', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '16GB', 'Intel i7', '1TB SSD', 'RTX 3060', 'Windows 11', '650W', 'ATX', 'ASUS Z490', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '8GB', 'AMD Ryzen 5', '512GB SSD', 'AMD Vega', 'Windows 11', NULL, NULL, NULL, '15.6', 'Grigio', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '16GB', 'Intel i7', '1TB SSD', 'Intel Iris', 'Windows 11', NULL, NULL, NULL, '14', 'Argento', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', '3200', NULL, NULL, 'USB', NULL, NULL, NULL),
(6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, NULL, NULL, 'USB', 'ITA', 'Meccanica', NULL),
(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, 'Stereo', '32 Ohm', 'Jack 3.5mm', NULL, NULL, '20Hz-20kHz'),
(8, '16GB', 'Intel i5', '512GB SSD', 'Intel UHD', 'Windows 11', NULL, NULL, NULL, '13.3', 'Blu', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '4GB', 'Intel Celeron', '128GB SSD', 'Intel UHD', 'Windows 10', '300W', 'Mini', 'Gigabyte H410', NULL, 'Bianco', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Grigio', '1600', NULL, NULL, 'Bluetooth', NULL, NULL, NULL);

-- Images
INSERT INTO images (product_id, image) VALUES
(1, 'desktop_alpha.jpg'),
(2, 'desktop_beta.jpg'),
(3, 'laptop_gamma.jpg'),
(4, 'laptop_delta.jpg'),
(5, 'mouse_speed.jpg'),
(6, 'tastiera_pro.jpg'),
(7, 'cuffie_bass.jpg'),
(8, 'laptop_epsilon.jpg'),
(9, 'desktop_omega.jpg'),
(10, 'mouse_wireless.jpg');
