module.exports = app => {
  const empleados = require("../controllers/empleado.controller.js");
  const router = require("express").Router();

  router.post("/create", empleados.create);
  router.get("/", empleados.findAll);
  router.get("/:id", empleados.findOne);
  router.put("/update/:id", empleados.update);
  router.delete("/delete/:id", empleados.delete);
  router.delete("/delete", empleados.deleteAll);

  app.use("/api/empleado", router);
};
