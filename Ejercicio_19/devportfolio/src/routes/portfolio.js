const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/portfolio/:username", async (req, res) => {
  const { username } = req.params;

  const [users] = await pool.query(
    "SELECT id, username, bio, email, photo FROM users WHERE username=?",
    [username]
  );
  if (users.length === 0) return res.status(404).send("Usuario no encontrado");

  const user = users[0];
  const [links] = await pool.query(
    "SELECT id, platform, url FROM social_links WHERE user_id=? ORDER BY id DESC",
    [user.id]
  );
  const [projects] = await pool.query(
    "SELECT id, title, description, repo_url, live_url FROM projects WHERE user_id=? ORDER BY id DESC",
    [user.id]
  );

  const isOwner = req.session.user && req.session.user.id === user.id;
  res.render("portfolio", { user, links, projects, isOwner });
});

module.exports = router;