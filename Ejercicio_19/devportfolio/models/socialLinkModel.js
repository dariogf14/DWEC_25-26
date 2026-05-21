const db=require('../config/db');
async function getByUserId(userId){const [r]=await db.query('SELECT * FROM social_links WHERE user_id=? ORDER BY id DESC',[userId]);return r;}
async function create(userId,d){await db.query('INSERT INTO social_links (platform,url,user_id) VALUES (?,?,?)',[d.platform,d.url,userId]);}
async function remove(id,userId){const [r]=await db.query('DELETE FROM social_links WHERE id=? AND user_id=?',[id,userId]);return r.affectedRows>0;}
module.exports={getByUserId,create,remove};
