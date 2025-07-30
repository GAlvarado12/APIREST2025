const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "Nombre no puede estar vacío." });
    return;
  }

  const data = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cargo: req.body.cargo,
    salario: req.body.salario
  };

  Empleado.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Empleado.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Empleado.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Empleado.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Empleado actualizado correctamente." });
      } else {
        res.send({ message: `No se pudo actualizar el Empleado con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Empleado.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Empleado eliminado correctamente." });
      } else {
        res.send({ message: `No se pudo eliminar el Empleado con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Empleado.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} empleados eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};
