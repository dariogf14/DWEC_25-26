require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();

// Conectar DB
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/autores", require("./routes/autores"));
app.use("/api/libros", require("./routes/libros"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});