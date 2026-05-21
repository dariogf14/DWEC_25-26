DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca;

CREATE TABLE libros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  estado ENUM('Disponible', 'Prestado') NOT NULL DEFAULT 'Disponible'
);

CREATE TABLE prestamos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  libro_id INT NOT NULL,
  nombre_prestatario VARCHAR(255) NOT NULL,
  fecha_prestamo DATE NOT NULL,
  fecha_devolucion DATE NOT NULL,
  fecha_entrega DATE NULL,
  CONSTRAINT fk_prestamos_libros
    FOREIGN KEY (libro_id)
    REFERENCES libros(id)
    ON DELETE CASCADE
);
