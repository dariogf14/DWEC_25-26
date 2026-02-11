const db = require("../db");

exports.formulario = async (req, res, next) => {
  try {
    const libroId = Number(req.params.libro_id);

    const [libros] = await db.query(
      "SELECT id, titulo, autor, estado FROM libros WHERE id=?",
      [libroId]
    );
    if (libros.length === 0) return res.status(404).send("Libro no encontrado");

    const libro = libros[0];
    if (libro.estado !== "Disponible") {
      return res.status(400).send("El libro no está disponible para préstamo");
    }

    res.render("prestamo_form", { libro });
  } catch (e) {
    next(e);
  }
};

exports.nuevo = async (req, res, next) => {
  try {
    const libroId = Number(req.body.libro_id);
    const nombre = (req.body.nombre_prestatario || "").trim();
    const fechaPrestamo = req.body.fecha_prestamo;
    const fechaDevolucion = req.body.fecha_devolucion;

    if (!libroId || !nombre || !fechaPrestamo || !fechaDevolucion) {
      return res.status(400).send("Faltan datos del préstamo");
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [libros] = await conn.query(
        "SELECT estado FROM libros WHERE id=? FOR UPDATE",
        [libroId]
      );
      if (libros.length === 0) {
        await conn.rollback();
        return res.status(404).send("Libro no encontrado");
      }
      if (libros[0].estado !== "Disponible") {
        await conn.rollback();
        return res.status(400).send("Libro no disponible");
      }

      await conn.query(
        `INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega)
         VALUES (?, ?, ?, ?, NULL)`,
        [libroId, nombre, fechaPrestamo, fechaDevolucion]
      );

      await conn.query("UPDATE libros SET estado='Prestado' WHERE id=?", [libroId]);

      await conn.commit();
      res.redirect(`/libro/${libroId}`);
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (e) {
    next(e);
  }
};

exports.devolver = async (req, res, next) => {
  try {
    const libroId = Number(req.params.libro_id);

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [prest] = await conn.query(
        `SELECT id FROM prestamos
         WHERE libro_id=? AND fecha_entrega IS NULL
         ORDER BY id DESC LIMIT 1
         FOR UPDATE`,
        [libroId]
      );

      if (prest.length === 0) {
        await conn.rollback();
        return res.status(400).send("No hay préstamo activo para este libro");
      }

      await conn.query(
        "UPDATE prestamos SET fecha_entrega = CURDATE() WHERE id=?",
        [prest[0].id]
      );

      await conn.query("UPDATE libros SET estado='Disponible' WHERE id=?", [libroId]);

      await conn.commit();
      res.redirect(`/libro/${libroId}`);
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (e) {
    next(e);
  }
};

exports.porUsuario = async (req, res, next) => {
  try {
    const nombre = (req.query.nombre || "").trim();
    if (!nombre) return res.status(400).send("Falta ?nombre=...");

    const [rows] = await db.query(
      `SELECT l.id, l.titulo, l.autor, p.fecha_devolucion
       FROM prestamos p
       JOIN libros l ON l.id = p.libro_id
       WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL
       ORDER BY p.fecha_devolucion ASC`,
      [nombre]
    );

    res.render("prestamos_usuario", { nombre, rows });
  } catch (e) {
    next(e);
  }
};