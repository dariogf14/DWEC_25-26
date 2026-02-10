const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

fs.mkdirSync(path.join(__dirname, "logs"), { recursive: true });
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use("/", require("./routes/index.routes"));
// app.use("/", require("./routes/libro.routes"));
// app.use("/", require("./routes/prestamo.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));