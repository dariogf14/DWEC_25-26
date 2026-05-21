const db = require('../config/db');

async function getAll() {
  const [rows] = await db.query(`
    SELECT id, nombre, apellidos, localidad, imagen
    FROM alumno
    ORDER BY id DESC
  `);
  return rows;
}

async function getById(id) {
  const [rows] = await db.query(`
    SELECT id, nombre, apellidos, localidad, imagen
    FROM alumno
    WHERE id = ?
  `, [id]);
  return rows[0];
}

async function create({ nombre, apellidos, localidad, imagen }) {
  await db.query(`
    INSERT INTO alumno (nombre, apellidos, localidad, imagen)
    VALUES (?, ?, ?, ?)
  `, [nombre, apellidos, localidad, imagen]);
}

async function remove(id) {
  const [result] = await db.query(`
    DELETE FROM alumno
    WHERE id = ?
  `, [id]);
  return result.affectedRows > 0;
}

module.exports = { getAll, getById, create, remove };
