const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", requireAuth, async (req, res) => {
  const userId = req.session.user.id;

  const [[user]] = await pool.query(
    "SELECT id, username, email, bio, photo FROM users WHERE id=?",
    [userId]
  );

  const [links] = await pool.query(
    "SELECT id, platform, url FROM social_links WHERE user_id=? ORDER BY id DESC",
    [userId]
  );

  const [projects] = await pool.query(
    "SELECT id, title, description, repo_url, live_url FROM projects WHERE user_id=? ORDER BY id DESC",
    [userId]
  );

  res.render("dashboard", { user, links, projects });
});

router.post("/dashboard/profile", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const { email, bio, photo } = req.body;

  await pool.query(
    "UPDATE users SET email=?, bio=?, photo=? WHERE id=?",
    [email, bio, photo, userId]
  );
  res.redirect("/dashboard");
});

router.post("/dashboard/social-links", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const { platform, url } = req.body;

  await pool.query(
    "INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)",
    [platform, url, userId]
  );
  res.redirect("/dashboard");
});

router.post("/dashboard/social-links/:id/delete", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const linkId = req.params.id;

  const [result] = await pool.query(
    "DELETE FROM social_links WHERE id=? AND user_id=?",
    [linkId, userId]
  );

  if (result.affectedRows === 0) return res.status(403).send("No autorizado");
  res.redirect("/dashboard");
});

router.post("/dashboard/projects", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const { title, description, repo_url, live_url } = req.body;

  await pool.query(
    "INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, repo_url, live_url, userId]
  );
  res.redirect("/dashboard");
});

router.get("/dashboard/projects/:id/edit", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const projectId = req.params.id;

  const [rows] = await pool.query(
    "SELECT id, title, description, repo_url, live_url FROM projects WHERE id=? AND user_id=?",
    [projectId, userId]
  );
  if (rows.length === 0) return res.status(403).send("No autorizado");

  res.render("project_edit", { project: rows[0] });
});

router.post("/dashboard/projects/:id/edit", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const projectId = req.params.id;
  const { title, description, repo_url, live_url } = req.body;

  const [result] = await pool.query(
    "UPDATE projects SET title=?, description=?, repo_url=?, live_url=? WHERE id=? AND user_id=?",
    [title, description, repo_url, live_url, projectId, userId]
  );

  if (result.affectedRows === 0) return res.status(403).send("No autorizado");
  res.redirect("/dashboard");
});

router.post("/dashboard/projects/:id/delete", requireAuth, async (req, res) => {
  const userId = req.session.user.id;
  const projectId = req.params.id;

  const [result] = await pool.query(
    "DELETE FROM projects WHERE id=? AND user_id=?",
    [projectId, userId]
  );

  if (result.affectedRows === 0) return res.status(403).send("No autorizado");
  res.redirect("/dashboard");
});

module.exports = router;