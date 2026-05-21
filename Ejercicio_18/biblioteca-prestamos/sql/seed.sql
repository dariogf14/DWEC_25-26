USE biblioteca;

INSERT INTO libros (id, titulo, autor, isbn, estado) VALUES
(1, 'Cien años de soledad', 'Gabriel García Márquez', '978-84-376-0494-7', 'Disponible'),
(2, 'Dune', 'Frank Herbert', '978-84-450-7473-8', 'Prestado'),
(3, 'El Señor de los Anillos', 'J.R.R. Tolkien', '978-84-450-7179-9', 'Disponible'),
(4, 'Sapiens: De animales a dioses', 'Yuval Noah Harari', '978-84-9992-622-2', 'Disponible'),
(5, 'Steve Jobs', 'Walter Isaacson', '978-84-9989-422-7', 'Prestado'),
(6, 'Clean Code', 'Robert C. Martin', '978-0-13-235088-4', 'Disponible'),
(7, 'La sombra del viento', 'Carlos Ruiz Zafón', '978-84-08-05793-0', 'Disponible'),
(8, 'Meditaciones', 'Marco Aurelio', '978-84-249-3679-0', 'Prestado'),
(9, 'Veinte poemas de amor y una canción desesperada', 'Pablo Neruda', '978-84-9759-335-3', 'Disponible'),
(10, 'Watchmen', 'Alan Moore', '978-84-8431-772-5', 'Prestado');

INSERT INTO prestamos (id, libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega) VALUES
(1, 2, 'Ana García', '2026-01-15', '2026-02-15', NULL),
(2, 5, 'Carlos Rodríguez', '2026-01-10', '2026-02-10', NULL),
(3, 8, 'Beatriz López', '2026-01-20', '2026-02-20', NULL),
(4, 10, 'David Martínez', '2025-12-28', '2026-01-28', NULL),
(5, 1, 'Elena Fernández', '2025-11-01', '2025-12-01', '2025-11-28'),
(6, 3, 'Ana García', '2025-10-05', '2025-11-05', '2025-11-02'),
(7, 4, 'Carlos Rodríguez', '2025-09-15', '2025-10-15', '2025-10-15'),
(8, 6, 'Beatriz López', '2025-08-20', '2025-09-20', '2025-09-18'),
(9, 7, 'David Martínez', '2025-07-30', '2025-08-30', '2025-08-25'),
(10, 9, 'Elena Fernández', '2025-06-10', '2025-07-10', '2025-07-09'),
(11, 1, 'Carlos Rodríguez', '2025-05-01', '2025-06-01', '2025-05-30'),
(12, 2, 'Beatriz López', '2025-04-02', '2025-05-02', '2025-04-28'),
(13, 3, 'David Martínez', '2025-03-03', '2025-04-03', '2025-04-01'),
(14, 4, 'Elena Fernández', '2025-02-04', '2025-03-04', '2025-03-04'),
(15, 5, 'Ana García', '2025-01-05', '2025-02-05', '2025-02-03'),
(16, 1, 'David Martínez', '2024-12-01', '2025-01-01', '2024-12-29'),
(17, 7, 'Ana García', '2024-11-11', '2024-12-11', '2024-12-10'),
(18, 8, 'Carlos Rodríguez', '2024-10-10', '2024-11-10', '2024-11-09'),
(19, 9, 'Beatriz López', '2024-09-09', '2024-10-09', '2024-10-01'),
(20, 10, 'Elena Fernández', '2024-08-08', '2024-09-08', '2024-09-01'),
(21, 2, 'Carlos Rodríguez', '2024-07-07', '2024-08-07', '2024-08-07'),
(22, 3, 'Ana García', '2024-06-06', '2024-07-06', '2024-06-29'),
(23, 6, 'David Martínez', '2024-05-05', '2024-06-05', '2024-06-01'),
(24, 4, 'Beatriz López', '2024-04-04', '2024-05-04', '2024-05-04'),
(25, 1, 'Elena Fernández', '2024-03-03', '2024-04-03', '2024-04-02'),
(26, 5, 'David Martínez', '2024-02-02', '2024-03-02', '2024-02-28'),
(27, 7, 'Carlos Rodríguez', '2024-01-01', '2024-02-01', '2024-01-25'),
(28, 8, 'Ana García', '2025-12-01', '2026-01-01', '2025-12-30'),
(29, 10, 'Beatriz López', '2025-09-01', '2025-10-01', '2025-09-28'),
(30, 6, 'Elena Fernández', '2025-08-01', '2025-09-01', '2025-08-31');

ALTER TABLE libros AUTO_INCREMENT = 11;
ALTER TABLE prestamos AUTO_INCREMENT = 31;
