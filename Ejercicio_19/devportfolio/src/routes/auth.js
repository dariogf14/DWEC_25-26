const express = require("express");
const crypto = require("crypto");
const pool = require("../db");

const router = express.Router();

function md5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, md5(password)]
    );
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).send("Error registrando (username/email duplicado o datos inválidos).");
  }
});

router.get("/login", (req, res) => res.render("login"));
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query(
    "SELECT id, username, email, bio, photo FROM users WHERE username=? AND password=?",
    [username, md5(password)]
  );
  if (rows.length === 0) return res.status(401).send("Credenciales inválidas");

  req.session.user = rows[0];
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;