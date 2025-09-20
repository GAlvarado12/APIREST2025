// Cargar variables de entorno
require('dotenv').config();

// Importar módulos principales
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configurar CORS
const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// Parsear solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar base de datos
const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("✓ Base de datos sincronizada correctamente.");
});

// Importar rutas existentes
require("./app/routes/cliente.route.js")(app);
require("./app/routes/empleado.route.js")(app);
require("./app/routes/proveedor.route.js")(app);
require("./app/routes/departamento.route.js")(app);
require("./app/routes/producto.route.js")(app);
require("./app/routes/user.route.js")(app);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// Iniciar servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}.`);
});
