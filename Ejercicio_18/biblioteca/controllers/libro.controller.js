const db = require("../db");

exports.detalle = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const [libros] = await db.query(
      "SELECT id, titulo, autor, isbn, estado FROM libros WHERE id = ?",
      [id]
    );
    if (libros.length === 0) return res.status(404).send("Libro no encontrado");
    const libro = libros[0];

    const [historial] = await db.query(
      `SELECT id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega
       FROM prestamos
       WHERE libro_id = ?
       ORDER BY fecha_prestamo DESC, id DESC`,
      [id]
    );

    const [activos] = await db.query(
      `SELECT id, nombre_prestatario, fecha_prestamo, fecha_devolucion
       FROM prestamos
       WHERE libro_id = ? AND fecha_entrega IS NULL
       ORDER BY id DESC
       LIMIT 1`,
      [id]
    );
    const prestamoActivo = activos[0] || null;

    res.render("libro_detalle", { libro, historial, prestamoActivo });
  } catch (err) {
    next(err);
  }
};