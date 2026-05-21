const db = require('../config/db');

async function getHistorialByLibroId(libroId) {
  const [rows] = await db.query(`
    SELECT id, libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega
    FROM prestamos
    WHERE libro_id = ?
    ORDER BY fecha_prestamo DESC
  `, [libroId]);

  return rows;
}

async function getActivoByLibroId(libroId) {
  const [rows] = await db.query(`
    SELECT id, libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega
    FROM prestamos
    WHERE libro_id = ?
      AND fecha_entrega IS NULL
    ORDER BY fecha_prestamo DESC
    LIMIT 1
  `, [libroId]);

  return rows[0];
}

async function getActivosByUsuario(nombre) {
  const [rows] = await db.query(`
    SELECT
      l.id AS libro_id,
      l.titulo,
      l.autor,
      p.nombre_prestatario,
      p.fecha_devolucion
    FROM prestamos p
    INNER JOIN libros l ON l.id = p.libro_id
    WHERE p.fecha_entrega IS NULL
      AND p.nombre_prestatario = ?
    ORDER BY p.fecha_devolucion ASC
  `, [nombre]);

  return rows;
}

async function crearPrestamo({ libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion }, connection = db) {
  const [result] = await connection.query(`
    INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega)
    VALUES (?, ?, ?, ?, NULL)
  `, [libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion]);

  return result.insertId;
}

async function registrarEntrega(prestamoId, connection = db) {
  await connection.query(`
    UPDATE prestamos
    SET fecha_entrega = CURDATE()
    WHERE id = ?
  `, [prestamoId]);
}

module.exports = {
  getHistorialByLibroId,
  getActivoByLibroId,
  getActivosByUsuario,
  crearPrestamo,
  registrarEntrega
};
