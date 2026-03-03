CREATE TABLE members (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),               
    email VARCHAR(255) NOT NULL UNIQUE,   
    status VARCHAR(55) NOT NULL DEFAULT 'pending',
    password VARCHAR(255) NOT NULL,       
    is_admin BOOLEAN DEFAULT FALSE,
    is_staff BOOLEAN DEFAULT FALSE
);

CREATE TABLE plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(255) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    duration INTEGER NOT NULL
);

CREATE TABLE subscription (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    plan_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES members(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES plans(plan_id) ON DELETE SET NULL
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    check_in_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_user FOREIGN KEY (user_id) REFERENCES members(user_id) ON DELETE CASCADE
);

CREATE TABLE equipments (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(255) NOT NULL,
    equipment_availability VARCHAR(255) NOT NULL 
);



/* =========================================================
   TESTING CREDENTIALS
   All Users Password: 123456
   Hash: $2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi
   =========================================================
*/

-- 1. Insert Gym Plans (Required for Revenue & Subscriptions)
INSERT INTO plans (plan_id, plan_name, price, duration) VALUES 
(1, 'Basic Monthly', 29.99, 30),
(2, 'Quarterly Pro', 75.00, 90),
(3, 'Annual Elite', 250.00, 365);

-- 2. Insert 10 Members (Admins, Staff, and Regular Members)
INSERT INTO members (user_id, user_name, email, password, is_admin, is_staff, status) VALUES 
(1, 'Admin User', 'admin@gym.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 1, 1, 'active'),
(2, 'Staff Member', 'staff@gym.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 1, 'active'),
(3, 'Nitin Kamboj', 'nitin@gym.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active'),
(4, 'John Doe', 'john@example.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active'),
(5, 'Jane Smith', 'jane@example.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active'),
(6, 'Mike Tyson', 'mike@boxing.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'inactive'),
(7, 'Sarah Connor', 'sarah@future.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active'),
(8, 'Bruce Wayne', 'bruce@waynecorp.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active'),
(9, 'Peter Parker', 'spidey@dailybugle.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'pending'),
(10, 'Clark Kent', 'super@dailyplanet.com', '$2b$10$jB4wgZrYhDQ2fK1TP526lO5mSB7TPucaF6fTF.6nb1cJI/HMqFlfi', 0, 0, 'active');

-- 3. Insert Subscriptions (Links Members to Plans)
INSERT INTO subscription (user_id, plan_id, start_date, end_date) VALUES 
(3, 3, '2026-01-01', '2027-01-01'), -- Nitin has Annual Plan
(4, 1, '2026-02-15', '2026-03-15'), -- John has Monthly
(5, 2, '2026-01-10', '2026-04-10'), -- Jane has Quarterly
(8, 3, '2026-02-20', '2027-02-20'); -- Bruce has Annual

-- 4. Insert Attendance/History (For the History feature)
INSERT INTO attendance (user_id, check_in_time) VALUES 
(3, NOW()),
(3, '2026-02-27 09:00:00'),
(4, '2026-02-28 10:30:00'),
(8, '2026-02-28 06:00:00');

-- 5. Insert Gym Equipments (For Member home view)
INSERT INTO equipments (equipment_name, equipment_availability) VALUES 
('Treadmill Matrix T5x', 'Available'),
('Power Rack', 'Available'),
('Dumbbell Set (5kg - 50kg)', 'Available'),
('Leg Press Machine', 'Available'),
('Stationary Bike', 'Maintenance');