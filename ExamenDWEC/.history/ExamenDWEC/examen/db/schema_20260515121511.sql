 # Script SQL
 
-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS misseries;
USE misseries;

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 2. Tabla de Series (Catálogo Local)
CREATE TABLE IF NOT EXISTS series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tvmaze_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    platform VARCHAR(100),
    image_url VARCHAR(255),
    api_score DECIMAL(3,1) DEFAULT NULL   
) ENGINE=InnoDB;

-- 3. Tabla de Relación (Usuario <-> Serie + Valoración)
CREATE TABLE IF NOT EXISTS user_series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    series_id INT NOT NULL,
    status ENUM('pendiente', 'viendo', 'completada') DEFAULT 'pending',
    rating INT DEFAULT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_series FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_series (user_id, series_id)
) ENGINE=InnoDB;

-- INSERCIÓN DE SEMILLA: 5 Usuarios iniciales
INSERT INTO users (username, email) VALUES 
('Ana García', 'ana.garcia@examen.com'),
('Carlos Ruiz', 'carlos.ruiz@examen.com'),
('Elena Belmonte', 'elena.b@examen.com'),
('David Soria', 'd.soria@examen.com'),
('Lucía Méndez', 'lucia.mendez@examen.com');