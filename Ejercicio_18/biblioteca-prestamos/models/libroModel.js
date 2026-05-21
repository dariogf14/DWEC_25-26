const db = require('../config/db');

async function getAll() {
  const [rows] = await db.query(`
    SELECT id, titulo, autor, isbn, estado
    FROM libros
    ORDER BY titulo ASC
  `);

  return rows;
}

async function getById(id) {
  const [rows] = await db.query(`
    SELECT id, titulo, autor, isbn, estado
    FROM libros
    WHERE id = ?
  `, [id]);

  return rows[0];
}

async function getPrestados() {
  const [rows] = await db.query(`
    SELECT
      l.id AS libro_id,
      l.titulo,
      l.autor,
      p.nombre_prestatario,
      p.fecha_devolucion
    FROM libros l
    INNER JOIN prestamos p ON p.libro_id = l.id
    WHERE l.estado = 'Prestado'
      AND p.fecha_entrega IS NULL
    ORDER BY p.fecha_devolucion ASC
  `);

  return rows;
}

async function getVencidos() {
  const [rows] = await db.query(`
    SELECT
      l.id AS libro_id,
      l.titulo,
      l.autor,
      p.nombre_prestatario,
      p.fecha_prestamo,
      p.fecha_devolucion
    FROM libros l
    INNER JOIN prestamos p ON p.libro_id = l.id
    WHERE l.estado = 'Prestado'
      AND p.fecha_entrega IS NULL
      AND p.fecha_devolucion < CURDATE()
    ORDER BY p.fecha_devolucion ASC
  `);

  return rows;
}

async function updateEstado(id, estado, connection = db) {
  await connection.query(`
    UPDATE libros
    SET estado = ?
    WHERE id = ?
  `, [estado, id]);
}

module.exports = {
  getAll,
  getById,
  getPrestados,
  getVencidos,
  updateEstado
};
