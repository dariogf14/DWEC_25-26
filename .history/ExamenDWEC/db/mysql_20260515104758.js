import mysql from 'mysql2/promise'; 

  

export const db = mysql.createPool({ 

    host:     process.env.DB_HOST, 

    user:     process.env.DB_USER, 

    password: process.env.DB_PASS, 

    database: process.env.DB_NAME, 

    port:     parseInt(process.env.DB_PORT) || 3306, 

    waitForConnections: true, 

    connectionLimit: 10, 

}); 

try { 

    const conn = await db.getConnection(); 

    console.log('✅ MySQL conectado'); 

    conn.release(); 

} catch (error) { 

    console.error('❌ Error conectando a MySQL:', error.message); 

} 