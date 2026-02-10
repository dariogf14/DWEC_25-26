const db = require("../db");

exports.catalogo = async (req, res) => {
  const [libros] = await db.query("SELECT id, titulo, autor, estado FROM libros ORDER BY id");
  res.render("index", { libros });
};

exports.prestados = async (req, res) => {
  const [rows] = await db.query(`
    SELECT l.id, l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON p.libro_id = l.id
    WHERE l.estado='Prestado' AND p.fecha_entrega IS NULL
    ORDER BY p.fecha_devolucion ASC
  `);
  res.render("prestados", { rows });
};

exports.vencidos = async (req, res) => {
  const [rows] = await db.query(`
    SELECT l.id, l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON p.libro_id = l.id
    WHERE p.fecha_entrega IS NULL AND p.fecha_devolucion < CURDATE()
    ORDER BY p.fecha_devolucion ASC
  `);
  res.render("vencidos", { rows });
};