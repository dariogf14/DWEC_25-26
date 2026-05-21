const db=require('../config/db');
async function getAll(){const [r]=await db.query('SELECT id,username,bio,email,photo FROM users ORDER BY username ASC');return r;}
async function getById(id){const [r]=await db.query('SELECT id,username,password,bio,email,photo FROM users WHERE id=?',[id]);return r[0];}
async function getByUsername(username){const [r]=await db.query('SELECT id,username,password,bio,email,photo FROM users WHERE username=?',[username]);return r[0];}
async function getByEmail(email){const [r]=await db.query('SELECT id,username,password,bio,email,photo FROM users WHERE email=?',[email]);return r[0];}
async function create({username,email,password}){const [r]=await db.query('INSERT INTO users (username,email,password,bio,photo) VALUES (?, ?, ?, "", "")',[username,email,password]);return r.insertId;}
async function updateProfile(id,{bio,email,photo}){await db.query('UPDATE users SET bio=?,email=?,photo=? WHERE id=?',[bio,email,photo,id]);}
module.exports={getAll,getById,getByUsername,getByEmail,create,updateProfile};
