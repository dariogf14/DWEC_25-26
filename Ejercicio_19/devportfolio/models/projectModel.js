const db=require('../config/db');
async function getByUserId(userId){const [r]=await db.query('SELECT * FROM projects WHERE user_id=? ORDER BY id DESC',[userId]);return r;}
async function getByIdAndUserId(id,userId){const [r]=await db.query('SELECT * FROM projects WHERE id=? AND user_id=?',[id,userId]);return r[0];}
async function create(userId,d){await db.query('INSERT INTO projects (title,description,repo_url,live_url,user_id) VALUES (?,?,?,?,?)',[d.title,d.description,d.repo_url||'',d.live_url||'',userId]);}
async function update(id,userId,d){const [r]=await db.query('UPDATE projects SET title=?,description=?,repo_url=?,live_url=? WHERE id=? AND user_id=?',[d.title,d.description,d.repo_url||'',d.live_url||'',id,userId]);return r.affectedRows>0;}
async function remove(id,userId){const [r]=await db.query('DELETE FROM projects WHERE id=? AND user_id=?',[id,userId]);return r.affectedRows>0;}
module.exports={getByUserId,getByIdAndUserId,create,update,remove};
