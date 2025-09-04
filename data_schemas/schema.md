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

- DETAILS

INSERT INTO details (product_id, ram, processor, storage, graphic_card, os, psu, case, motherboard, inches, color, dpi, audio_type, impedance, connectivity, keyboard_layout, keyboard_type, frequency) VALUES

(24, '16GB', 'Intel i5', '512GB SSD', 'Intel UHD', 'Windows 11', '400W', 'ATX', 'MSI Pro', NULL, 'Grigio', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, '32GB', 'Intel i7', '1TB SSD', 'NVIDIA RTX 3060', 'Windows 11', '650W', 'ATX', 'Gigabyte Ultra', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, '8GB', 'AMD Ryzen 3', '256GB SSD', 'AMD Radeon', 'Windows 11', '350W', 'Micro ATX', 'ASRock', NULL, 'Bianco', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, '64GB', 'AMD Threadripper', '4TB SSD', 'NVIDIA Quadro', 'Windows 11 Pro', '1000W', 'Full Tower', 'Supermicro', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, '8GB', 'Intel i5', '256GB SSD', 'Intel Iris Xe', 'Windows 11', NULL, NULL, NULL, '15.6', 'Argento', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, '16GB', 'Intel i7', '512GB SSD', 'Intel Iris Xe', 'Windows 11', NULL, NULL, NULL, '14', 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, '32GB', 'AMD Ryzen 7', '1TB SSD', 'NVIDIA RTX 4060', 'Windows 11', NULL, NULL, NULL, '17', 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, '16GB', 'Intel i5', '512GB SSD', 'Intel Iris Xe', 'Windows 11', NULL, NULL, NULL, '13.3', 'Blu', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, '4GB', 'Intel Celeron', '128GB SSD', 'Intel UHD', 'Windows 10', NULL, NULL, NULL, '15.6', 'Grigio', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', '1600', NULL, NULL, 'USB', NULL, NULL, NULL),
(34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Rosso', '12000', NULL, NULL, 'Wireless', NULL, NULL, NULL),
(35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, NULL, NULL, 'USB', 'ITA', 'Meccanica', NULL),
(36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Bianco', NULL, NULL, NULL, 'USB', 'ITA', 'Membrana', NULL),
(37, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, 'Studio', '32', 'Jack 3.5mm', NULL, NULL, '20Hz-20kHz'),
(38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Blu', NULL, 'Sport', '16', 'Bluetooth', NULL, NULL, '20Hz-18kHz'),
(39, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Grigio', NULL, 'Travel', '24', 'Jack 3.5mm', NULL, NULL, '20Hz-20kHz'),
(40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, 'Bass', '32', 'Jack 3.5mm', NULL, NULL, '15Hz-22kHz'),
(41, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Rosa', NULL, 'Kids', '16', 'Jack 3.5mm', NULL, NULL, '30Hz-16kHz'),
(42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Verde', NULL, 'Kids', '16', 'Bluetooth', NULL, NULL, '30Hz-16kHz');
(43, '16GB', 'Intel i9', '2TB SSD', 'NVIDIA RTX 4080', 'Windows 11 Pro', '850W', 'ATX', 'ASUS ROG', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, '32GB', 'AMD Ryzen 9', '4TB SSD', 'AMD Radeon RX 7900', 'Windows 11 Pro', '1000W', 'Full Tower', 'MSI X570', NULL, 'Grigio', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(45, '8GB', 'Intel i5', '512GB SSD', 'Intel UHD', 'Windows 10', '400W', 'Mini Tower', 'Gigabyte B560', NULL, 'Bianco', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(46, '64GB', 'Intel Xeon', '8TB SSD', 'NVIDIA Quadro RTX', 'Windows Server', '1200W', 'Rack', 'Supermicro X11', NULL, 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, '16GB', 'AMD Ryzen 5', '1TB SSD', 'AMD Radeon', 'Windows 11', '500W', 'ATX', 'ASRock B450', NULL, 'Blu', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, '8GB', 'Intel i3', '256GB SSD', 'Intel UHD', 'Windows 10', NULL, NULL, NULL, '15.6', 'Argento', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, '16GB', 'Intel i7', '512GB SSD', 'Intel Iris Xe', 'Windows 11', NULL, NULL, NULL, '14', 'Nero', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, '32GB', 'AMD Ryzen 7', '1TB SSD', 'NVIDIA RTX 4060', 'Windows 11', NULL, NULL, NULL, '17', 'Grigio', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, '16GB', 'Intel i5', '512GB SSD', 'Intel Iris Xe', 'Windows 11', NULL, NULL, NULL, '13.3', 'Blu', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, '4GB', 'Intel Celeron', '128GB SSD', 'Intel UHD', 'Windows 10', NULL, NULL, NULL, '15.6', 'Bianco', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', '3200', NULL, NULL, 'USB', NULL, NULL, NULL),
(54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Rosso', '12000', NULL, NULL, 'Wireless', NULL, NULL, NULL),
(55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Blu', NULL, NULL, NULL, 'USB', 'ITA', 'Meccanica', NULL),
(56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Bianco', NULL, NULL, NULL, 'USB', 'ITA', 'Membrana', NULL),
(57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, 'Stereo', '32 Ohm', 'Jack 3.5mm', NULL, NULL, '20Hz-20kHz'),
(58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Blu', NULL, 'Sport', '16 Ohm', 'Bluetooth', NULL, NULL, '20Hz-18kHz'),
(59, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Grigio', NULL, 'Travel', '24 Ohm', 'Jack 3.5mm', NULL, NULL, '20Hz-20kHz'),
(60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nero', NULL, 'Bass', '32 Ohm', 'Jack 3.5mm', NULL, NULL, '15Hz-22kHz'),
(61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Rosa', NULL, 'Kids', '16 Ohm', 'Jack 3.5mm', NULL, NULL, '30Hz-16kHz'),
(62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Verde', NULL, 'Kids', '16 Ohm', 'Bluetooth', NULL, NULL, '30Hz-16kHz');

- PRODUCTS
  INSERT INTO products (id, categories_id, name, description, price, discount, create_date) VALUES
  (23, 2, 'PC Fisso Sigma Plus', 'PC desktop professionale avanzato', 999.99, 0.05, '2025-09-10'),
  (24, 2, 'PC Fisso Omega Pro', 'PC desktop gaming estremo', 1599.99, 0.12, '2025-09-11'),
  (25, 2, 'PC Fisso Kappa S', 'PC desktop multimediale compatto', 799.99, 0.03, '2025-09-12'),
  (26, 2, 'PC Fisso Lambda X', 'PC desktop compatto ultra', 649.99, 0.09, '2025-09-13'),
  (27, 2, 'PC Fisso Theta Max', 'PC desktop workstation avanzata', 1899.99, 0.00, '2025-09-14'),
  (28, 2, 'PC Fisso Zeta', 'PC desktop economico', 499.99, 0.04, '2025-09-15'),
  (29, 2, 'PC Fisso Eta', 'PC desktop silenzioso', 899.99, 0.06, '2025-09-16'),
  (30, 2, 'PC Fisso Iota', 'PC desktop mini', 699.99, 0.07, '2025-09-17'),
  (31, 2, 'PC Fisso Pi', 'PC desktop per studenti', 599.99, 0.08, '2025-09-18'),
  (32, 2, 'PC Fisso Rho', 'PC desktop per ufficio', 799.99, 0.09, '2025-09-19'),
  (33, 2, 'PC Fisso Tau', 'PC desktop all-in-one', 1099.99, 0.00, '2025-09-20'),
  (34, 2, 'PC Fisso Upsilon', 'PC desktop multimediale', 849.99, 0.05, '2025-09-21'),
  (35, 2, 'PC Fisso Phi', 'PC desktop gaming', 1299.99, 0.10, '2025-09-22'),
  (36, 2, 'PC Fisso Chi', 'PC desktop workstation', 1599.99, 0.00, '2025-09-23'),
  (37, 2, 'PC Fisso Psi', 'PC desktop compatto', 699.99, 0.07, '2025-09-24'),
  (38, 2, 'PC Fisso Omega X', 'PC desktop professionale', 999.99, 0.06, '2025-09-25'),
  (39, 2, 'PC Fisso Alpha', 'PC desktop gaming', 1399.99, 0.09, '2025-09-26'),
  (40, 2, 'PC Fisso Beta', 'PC desktop economico', 599.99, 0.03, '2025-09-27'),
  (41, 2, 'PC Fisso Gamma', 'PC desktop silenzioso', 899.99, 0.08, '2025-09-28'),
  (42, 2, 'PC Fisso Delta', 'PC desktop mini', 699.99, 0.04, '2025-09-29');
  (43, 2, 'PC Fisso Sigma Ultra', 'PC desktop professionale top gamma', 2099.99, 0.07, '2025-09-30'),
  (44, 2, 'PC Fisso Omega X', 'PC desktop gaming con raffreddamento liquido', 1799.99, 0.13, '2025-10-01'),
  (45, 2, 'PC Fisso Kappa Pro', 'PC desktop multimediale avanzato', 899.99, 0.04, '2025-10-02'),
  (46, 2, 'PC Fisso Lambda S', 'PC desktop compatto silenzioso', 749.99, 0.10, '2025-10-03'),
  (47, 2, 'PC Fisso Theta S', 'PC desktop workstation grafica', 1999.99, 0.00, '2025-10-04'),
  (48, 2, 'PC Fisso Zeta Pro', 'PC desktop economico SSD', 599.99, 0.05, '2025-10-05'),
  (49, 2, 'PC Fisso Eta Max', 'PC desktop silenzioso avanzato', 999.99, 0.08, '2025-10-06'),
  (50, 2, 'PC Fisso Iota S', 'PC desktop mini ultra', 799.99, 0.09, '2025-10-07'),
  (51, 2, 'PC Fisso Pi Pro', 'PC desktop per studenti SSD', 699.99, 0.10, '2025-10-08'),
  (52, 2, 'PC Fisso Rho Max', 'PC desktop per ufficio avanzato', 899.99, 0.11, '2025-10-09'),
  (53, 2, 'PC Fisso Tau S', 'PC desktop all-in-one touch', 1199.99, 0.00, '2025-10-10'),
  (54, 2, 'PC Fisso Upsilon Pro', 'PC desktop multimediale ultra', 949.99, 0.06, '2025-10-11'),
  (55, 2, 'PC Fisso Phi Max', 'PC desktop gaming RTX', 1399.99, 0.12, '2025-10-12'),
  (56, 2, 'PC Fisso Chi S', 'PC desktop workstation silenziosa', 1699.99, 0.00, '2025-10-13'),
  (57, 2, 'PC Fisso Psi Pro', 'PC desktop compatto SSD', 799.99, 0.09, '2025-10-14'),
  (58, 2, 'PC Fisso Omega Z', 'PC desktop professionale SSD', 1099.99, 0.07, '2025-10-15'),
  (59, 2, 'PC Fisso Alpha S', 'PC desktop gaming silenzioso', 1499.99, 0.10, '2025-10-16'),
  (60, 2, 'PC Fisso Beta Pro', 'PC desktop economico compatto', 699.99, 0.05, '2025-10-17'),
  (61, 2, 'PC Fisso Gamma S', 'PC desktop silenzioso ultra', 999.99, 0.08, '2025-10-18'),
  (62, 2, 'PC Fisso Delta Pro', 'PC desktop mini SSD', 799.99, 0.06, '2025-10-19');

- NOTEBOOK

(23, 3, 'Notebook Alpha S', 'Notebook leggero', 799.99, 0.07, '2025-10-01'),
(24, 3, 'Notebook Beta Pro', 'Notebook business', 1099.99, 0.00, '2025-10-02'),
(25, 3, 'Notebook Gamma X', 'Notebook gaming', 1599.99, 0.12, '2025-10-03'),
(26, 3, 'Notebook Delta S', 'Notebook convertibile', 999.99, 0.00, '2025-10-04'),
(27, 3, 'Notebook Epsilon Lite', 'Notebook economico', 499.99, 0.05, '2025-10-05'),
(28, 3, 'Notebook Zeta', 'Notebook touch', 899.99, 0.08, '2025-10-06'),
(29, 3, 'Notebook Eta', 'Notebook ultra sottile', 1199.99, 0.10, '2025-10-07'),
(30, 3, 'Notebook Iota', 'Notebook per studenti', 699.99, 0.03, '2025-10-08'),
(31, 3, 'Notebook Pi', 'Notebook per ufficio', 799.99, 0.09, '2025-10-09'),
(32, 3, 'Notebook Rho', 'Notebook all-in-one', 1099.99, 0.04, '2025-10-10'),
(33, 3, 'Notebook Tau', 'Notebook multimediale', 849.99, 0.06, '2025-10-11'),
(34, 3, 'Notebook Upsilon', 'Notebook gaming', 1299.99, 0.11, '2025-10-12'),
(35, 3, 'Notebook Phi', 'Notebook workstation', 1599.99, 0.00, '2025-10-13'),
(36, 3, 'Notebook Chi', 'Notebook compatto', 699.99, 0.08, '2025-10-14'),
(37, 3, 'Notebook Psi', 'Notebook professionale', 999.99, 0.00, '2025-10-15'),
(38, 3, 'Notebook Omega', 'Notebook gaming', 1399.99, 0.09, '2025-10-16'),
(39, 3, 'Notebook Alpha Lite', 'Notebook economico', 599.99, 0.05, '2025-10-17'),
(40, 3, 'Notebook Beta S', 'Notebook silenzioso', 899.99, 0.07, '2025-10-18'),
(41, 3, 'Notebook Gamma S', 'Notebook mini', 699.99, 0.03, '2025-10-19'),
(42, 3, 'Notebook Delta Pro', 'Notebook touch', 899.99, 0.08, '2025-10-20');
(43, 3, 'Notebook Sigma Pro', 'Notebook leggero con display OLED', 899.99, 0.09, '2025-10-21'),
(44, 3, 'Notebook Omega Max', 'Notebook business con fingerprint', 1199.99, 0.02, '2025-10-22'),
(45, 3, 'Notebook Kappa Ultra', 'Notebook gaming con RTX', 1699.99, 0.14, '2025-10-23'),
(46, 3, 'Notebook Lambda S', 'Notebook convertibile 360°', 1049.99, 0.00, '2025-10-24'),
(47, 3, 'Notebook Theta Lite', 'Notebook economico SSD', 599.99, 0.07, '2025-10-25'),
(48, 3, 'Notebook Zeta Pro', 'Notebook touch ultra', 999.99, 0.08, '2025-10-26'),
(49, 3, 'Notebook Eta Max', 'Notebook ultra sottile premium', 1299.99, 0.11, '2025-10-27'),
(50, 3, 'Notebook Iota S', 'Notebook per studenti SSD', 749.99, 0.04, '2025-10-28'),
(51, 3, 'Notebook Pi Pro', 'Notebook per ufficio avanzato', 849.99, 0.09, '2025-10-29'),
(52, 3, 'Notebook Rho Max', 'Notebook all-in-one touch', 1199.99, 0.00, '2025-10-30'),
(53, 3, 'Notebook Tau S', 'Notebook multimediale ultra', 899.99, 0.06, '2025-10-31'),
(54, 3, 'Notebook Upsilon Pro', 'Notebook gaming RTX', 1399.99, 0.13, '2025-11-01'),
(55, 3, 'Notebook Phi Max', 'Notebook workstation silenziosa', 1599.99, 0.00, '2025-11-02'),
(56, 3, 'Notebook Chi S', 'Notebook compatto SSD', 799.99, 0.08, '2025-11-03'),
(57, 3, 'Notebook Psi Pro', 'Notebook professionale SSD', 1099.99, 0.07, '2025-11-04'),
(58, 3, 'Notebook Omega Z', 'Notebook gaming silenzioso', 1499.99, 0.10, '2025-11-05'),
(59, 3, 'Notebook Alpha Max', 'Notebook economico compatto', 699.99, 0.05, '2025-11-06'),
(60, 3, 'Notebook Beta Ultra', 'Notebook silenzioso ultra', 999.99, 0.08, '2025-11-07'),
(61, 3, 'Notebook Gamma Pro', 'Notebook mini SSD', 799.99, 0.06, '2025-11-08'),
(62, 3, 'Notebook Delta Max', 'Notebook touch premium', 1099.99, 0.09, '2025-11-09');

- PRODUCT

INSERT INTO products (id, categories_id, name, description, price, discount, create_date) VALUES
(23, 4, 'Mouse Precision', 'Mouse ottico', 34.99, 0.00, '2025-10-01'),
(24, 4, 'Mouse Speed', 'Mouse gaming', 59.99, 0.10, '2025-10-02'),
(25, 4, 'Mouse Wireless', 'Mouse senza fili', 44.99, 0.05, '2025-10-03'),
(26, 4, 'Mouse Ergonomico', 'Mouse ergonomico', 49.99, 0.07, '2025-10-04'),
(27, 4, 'Mouse Bluetooth', 'Mouse bluetooth', 54.99, 0.06, '2025-10-05'),
(28, 4, 'Mouse Gaming Pro', 'Mouse gaming RGB', 69.99, 0.12, '2025-10-06'),
(29, 4, 'Mouse Mini', 'Mouse compatto', 29.99, 0.03, '2025-10-07'),
(30, 4, 'Mouse USB', 'Mouse cablato USB', 24.99, 0.00, '2025-10-08'),
(31, 4, 'Mouse Verticale', 'Mouse verticale', 39.99, 0.04, '2025-10-09'),
(32, 4, 'Mouse Silenzioso', 'Mouse silenzioso', 34.99, 0.02, '2025-10-10'),
(33, 4, 'Mouse Laser', 'Mouse laser ad alta precisione', 59.99, 0.09, '2025-10-11'),
(34, 4, 'Mouse Office', 'Mouse da ufficio', 27.99, 0.00, '2025-10-12'),
(35, 4, 'Mouse Travel', 'Mouse da viaggio', 32.99, 0.05, '2025-10-13'),
(36, 4, 'Mouse Kids', 'Mouse per bambini', 19.99, 0.00, '2025-10-14'),
(37, 4, 'Mouse LED', 'Mouse con LED colorati', 39.99, 0.07, '2025-10-15'),
(38, 4, 'Mouse Recharge', 'Mouse ricaricabile', 49.99, 0.08, '2025-10-16'),
(39, 4, 'Mouse Macro', 'Mouse con tasti macro', 69.99, 0.10, '2025-10-17'),
(40, 4, 'Mouse Sport', 'Mouse sportivo', 29.99, 0.04, '2025-10-18'),
(41, 4, 'Mouse Classic', 'Mouse classico', 24.99, 0.00, '2025-10-19'),
(42, 4, 'Mouse Ultra', 'Mouse ultra leggero', 39.99, 0.06, '2025-10-20');
(43, 4, 'Mouse Precision Pro', 'Mouse ottico ad alta precisione', 44.99, 0.05, '2025-10-21'),
(44, 4, 'Mouse Speed Max', 'Mouse gaming ultra veloce', 69.99, 0.12, '2025-10-22'),
(45, 4, 'Mouse Wireless Plus', 'Mouse wireless con batteria lunga durata', 54.99, 0.07, '2025-10-23'),
(46, 4, 'Mouse Ergonomico S', 'Mouse ergonomico per ufficio', 59.99, 0.09, '2025-10-24'),
(47, 4, 'Mouse Bluetooth Pro', 'Mouse bluetooth compatibile con Mac', 64.99, 0.08, '2025-10-25'),
(48, 4, 'Mouse Gaming RGB', 'Mouse gaming con illuminazione RGB', 79.99, 0.13, '2025-10-26'),
(49, 4, 'Mouse Mini Pro', 'Mouse compatto per viaggi', 34.99, 0.04, '2025-10-27'),
(50, 4, 'Mouse USB C', 'Mouse cablato USB-C', 29.99, 0.02, '2025-10-28'),
(51, 4, 'Mouse Verticale Pro', 'Mouse verticale per ergonomia avanzata', 49.99, 0.06, '2025-10-29'),
(52, 4, 'Mouse Silenzioso Max', 'Mouse silenzioso per ufficio', 39.99, 0.03, '2025-10-30'),
(53, 4, 'Mouse Laser Pro', 'Mouse laser per grafica', 69.99, 0.10, '2025-10-31'),
(54, 4, 'Mouse Office S', 'Mouse da ufficio wireless', 32.99, 0.00, '2025-11-01'),
(55, 4, 'Mouse Travel Pro', 'Mouse da viaggio pieghevole', 37.99, 0.05, '2025-11-02'),
(56, 4, 'Mouse Kids Color', 'Mouse per bambini colorato', 24.99, 0.00, '2025-11-03'),
(57, 4, 'Mouse LED RGB', 'Mouse con LED RGB', 49.99, 0.08, '2025-11-04'),
(58, 4, 'Mouse Recharge Max', 'Mouse ricaricabile USB-C', 59.99, 0.09, '2025-11-05'),
(59, 4, 'Mouse Macro Pro', 'Mouse con tasti macro programmabili', 79.99, 0.12, '2025-11-06'),
(60, 4, 'Mouse Sport S', 'Mouse sportivo leggero', 34.99, 0.04, '2025-11-07'),
(61, 4, 'Mouse Classic Pro', 'Mouse classico wireless', 29.99, 0.00, '2025-11-08'),
(62, 4, 'Mouse Ultra Max', 'Mouse ultra leggero professionale', 49.99, 0.07, '2025-11-09');

- TASTIERE

INSERT INTO products (id, categories_id, name, description, price, discount, create_date) VALUES
(23, 4, 'Tastiera RGB', 'Tastiera retroilluminata', 89.99, 0.00, '2025-10-01'),
(24, 4, 'Tastiera Office', 'Tastiera da ufficio', 29.99, 0.08, '2025-10-02'),
(25, 4, 'Tastiera Meccanica', 'Tastiera meccanica gaming', 109.99, 0.10, '2025-10-03'),
(26, 4, 'Tastiera Wireless', 'Tastiera senza fili', 59.99, 0.05, '2025-10-04'),
(27, 4, 'Tastiera Bluetooth', 'Tastiera bluetooth', 69.99, 0.07, '2025-10-05'),
(28, 4, 'Tastiera Slim', 'Tastiera sottile', 39.99, 0.04, '2025-10-06'),
(29, 4, 'Tastiera Ergonomica', 'Tastiera ergonomica', 79.99, 0.09, '2025-10-07'),
(30, 4, 'Tastiera USB', 'Tastiera cablata USB', 34.99, 0.00, '2025-10-08'),
(31, 4, 'Tastiera Compact', 'Tastiera compatta', 49.99, 0.06, '2025-10-09'),
(32, 4, 'Tastiera Retro', 'Tastiera stile retrò', 59.99, 0.08, '2025-10-10'),
(33, 4, 'Tastiera Multimediale', 'Tastiera con tasti multimediali', 69.99, 0.07, '2025-10-11'),
(34, 4, 'Tastiera Gaming', 'Tastiera gaming LED', 99.99, 0.12, '2025-10-12'),
(35, 4, 'Tastiera Silenziosa', 'Tastiera silenziosa', 44.99, 0.03, '2025-10-13'),
(36, 4, 'Tastiera Waterproof', 'Tastiera resistente all'acqua', 54.99, 0.05, '2025-10-14'),
(37, 4, 'Tastiera Kids', 'Tastiera per bambini', 24.99, 0.00, '2025-10-15'),
(38, 4, 'Tastiera Illuminata', 'Tastiera con retroilluminazione RGB', 79.99, 0.09, '2025-10-16'),
(39, 4, 'Tastiera Office Pro', 'Tastiera da ufficio professionale', 39.99, 0.06, '2025-10-17'),
(40, 4, 'Tastiera Bluetooth Pro', 'Tastiera bluetooth compatta', 64.99, 0.08, '2025-10-18'),
(41, 4, 'Tastiera Macro', 'Tastiera con tasti macro', 89.99, 0.10, '2025-10-19'),
(42, 4, 'Tastiera Ultra', 'Tastiera ultra leggera', 49.99, 0.07, '2025-10-20');
(43, 4, 'Tastiera RGB Pro', 'Tastiera retroilluminata professionale', 99.99, 0.11, '2025-10-21'),
(44, 4, 'Tastiera Office Max', 'Tastiera da ufficio silenziosa', 34.99, 0.09, '2025-10-22'),
(45, 4, 'Tastiera Meccanica Ultra', 'Tastiera meccanica per gaming avanzato', 119.99, 0.12, '2025-10-23'),
(46, 4, 'Tastiera Wireless S', 'Tastiera wireless compatta', 69.99, 0.06, '2025-10-24'),
(47, 4, 'Tastiera Bluetooth Pro', 'Tastiera bluetooth per tablet', 79.99, 0.08, '2025-10-25'),
(48, 4, 'Tastiera Slim Max', 'Tastiera ultra sottile', 49.99, 0.05, '2025-10-26'),
(49, 4, 'Tastiera Ergonomica Plus', 'Tastiera ergonomica avanzata', 89.99, 0.10, '2025-10-27'),
(50, 4, 'Tastiera USB Pro', 'Tastiera cablata USB professionale', 44.99, 0.00, '2025-10-28'),
(51, 4, 'Tastiera Compact S', 'Tastiera compatta wireless', 59.99, 0.07, '2025-10-29'),
(52, 4, 'Tastiera Retro Pro', 'Tastiera retrò con tasti rotondi', 69.99, 0.09, '2025-10-30'),
(53, 4, 'Tastiera Multimediale Max', 'Tastiera con tasti multimediali extra', 79.99, 0.08, '2025-10-31'),
(54, 4, 'Tastiera Gaming Pro', 'Tastiera gaming con macro', 109.99, 0.13, '2025-11-01'),
(55, 4, 'Tastiera Silenziosa S', 'Tastiera silenziosa per ufficio', 49.99, 0.04, '2025-11-02'),
(56, 4, 'Tastiera Waterproof Pro', 'Tastiera impermeabile', 64.99, 0.06, '2025-11-03'),
(57, 4, 'Tastiera Kids Color', 'Tastiera per bambini colorata', 29.99, 0.00, '2025-11-04'),
(58, 4, 'Tastiera Illuminata Max', 'Tastiera RGB con effetti luminosi', 89.99, 0.10, '2025-11-05'),
(59, 4, 'Tastiera Office Ultra', 'Tastiera da ufficio ultra silenziosa', 44.99, 0.07, '2025-11-06'),
(60, 4, 'Tastiera Bluetooth S', 'Tastiera bluetooth slim', 69.99, 0.09, '2025-11-07'),
(61, 4, 'Tastiera Macro Pro', 'Tastiera con macro programmabili', 99.99, 0.12, '2025-11-08'),
(62, 4, 'Tastiera Ultra Max', 'Tastiera ultra leggera professionale', 59.99, 0.08, '2025-11-09');

- CUFFIE

INSERT INTO products (id, categories_id, name, description, price, discount, create_date) VALUES
(23, 4, 'Cuffie Studio', 'Cuffie professionali', 129.99, 0.00, '2025-10-01'),
(24, 4, 'Cuffie Sport', 'Cuffie bluetooth sportive', 69.99, 0.09, '2025-10-02'),
(25, 4, 'Cuffie Travel', 'Cuffie pieghevoli', 39.99, 0.00, '2025-10-03'),
(26, 4, 'Cuffie Bass', 'Cuffie con bassi potenziati', 59.99, 0.06, '2025-10-04'),
(27, 4, 'Cuffie Kids', 'Cuffie per bambini', 24.99, 0.00, '2025-10-05'),
(28, 4, 'Cuffie Wireless', 'Cuffie wireless', 89.99, 0.08, '2025-10-06'),
(29, 4, 'Cuffie Gaming', 'Cuffie gaming con microfono', 109.99, 0.10, '2025-10-07'),
(30, 4, 'Cuffie USB', 'Cuffie USB', 49.99, 0.04, '2025-10-08'),
(31, 4, 'Cuffie Bluetooth', 'Cuffie bluetooth', 79.99, 0.07, '2025-10-09'),
(32, 4, 'Cuffie Noise Cancelling', 'Cuffie con riduzione rumore', 149.99, 0.12, '2025-10-10'),
(33, 4, 'Cuffie Sport Pro', 'Cuffie sportive impermeabili', 99.99, 0.09, '2025-10-11'),
(34, 4, 'Cuffie Travel Pro', 'Cuffie pieghevoli compatte', 44.99, 0.00, '2025-10-12'),
(35, 4, 'Cuffie Bass Max', 'Cuffie con bassi extra', 69.99, 0.07, '2025-10-13'),
(36, 4, 'Cuffie Kids Color', 'Cuffie per bambini colorate', 29.99, 0.00, '2025-10-14'),
(37, 4, 'Cuffie Studio Lite', 'Cuffie professionali leggere', 119.99, 0.05, '2025-10-15'),
(38, 4, 'Cuffie Wireless Pro', 'Cuffie wireless con autonomia estesa', 99.99, 0.08, '2025-10-16'),
(39, 4, 'Cuffie Gaming RGB', 'Cuffie gaming con LED RGB', 119.99, 0.10, '2025-10-17'),
(40, 4, 'Cuffie USB C', 'Cuffie USB-C', 59.99, 0.04, '2025-10-18'),
(41, 4, 'Cuffie Bluetooth Max', 'Cuffie bluetooth premium', 129.99, 0.07, '2025-10-19'),
(42, 4, 'Cuffie Noise Cancelling Pro', 'Cuffie con riduzione rumore avanzata', 159.99, 0.12, '2025-10-20');
(43, 4, 'Cuffie Studio Pro', 'Cuffie professionali wireless', 139.99, 0.00, '2025-10-21'),
(44, 4, 'Cuffie Sport Max', 'Cuffie bluetooth sportive impermeabili', 79.99, 0.10, '2025-10-22'),
(45, 4, 'Cuffie Travel Ultra', 'Cuffie pieghevoli con microfono', 49.99, 0.00, '2025-10-23'),
(46, 4, 'Cuffie Bass Ultra', 'Cuffie con bassi ultra', 79.99, 0.08, '2025-10-24'),
(47, 4, 'Cuffie Kids Pro', 'Cuffie per bambini con limitatore volume', 34.99, 0.00, '2025-10-25'),
(48, 4, 'Cuffie Wireless Max', 'Cuffie wireless con autonomia estesa', 109.99, 0.09, '2025-10-26'),
(49, 4, 'Cuffie Gaming Pro', 'Cuffie gaming surround', 129.99, 0.11, '2025-10-27'),
(50, 4, 'Cuffie USB Pro', 'Cuffie USB professionali', 59.99, 0.05, '2025-10-28'),
(51, 4, 'Cuffie Bluetooth Pro', 'Cuffie bluetooth compatibili con smartphone', 89.99, 0.07, '2025-10-29'),
(52, 4, 'Cuffie Noise Cancelling Max', 'Cuffie con riduzione rumore premium', 169.99, 0.13, '2025-10-30'),
(53, 4, 'Cuffie Sport S', 'Cuffie sportive leggere', 59.99, 0.08, '2025-10-31'),
(54, 4, 'Cuffie Travel Pro', 'Cuffie pieghevoli wireless', 54.99, 0.00, '2025-11-01'),
(55, 4, 'Cuffie Bass Max', 'Cuffie con bassi potenziati', 89.99, 0.09, '2025-11-02'),
(56, 4, 'Cuffie Kids Color', 'Cuffie per bambini colorate', 39.99, 0.00, '2025-11-03'),
(57, 4, 'Cuffie Studio Air', 'Cuffie professionali leggere wireless', 129.99, 0.06, '2025-11-04'),
(58, 4, 'Cuffie Wireless S', 'Cuffie wireless compatte', 79.99, 0.08, '2025-11-05'),
(59, 4, 'Cuffie Gaming RGB', 'Cuffie gaming con LED RGB', 139.99, 0.12, '2025-11-06'),
(60, 4, 'Cuffie USB C Pro', 'Cuffie USB-C professionali', 69.99, 0.04, '2025-11-07'),
(61, 4, 'Cuffie Bluetooth Max S', 'Cuffie bluetooth premium compatte', 139.99, 0.09, '2025-11-08'),
(62, 4, 'Cuffie Noise Cancelling Ultra', 'Cuffie con riduzione rumore ultra', 179.99, 0.14, '2025-11-09');
