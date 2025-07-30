const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "Nombre no puede estar vacío." });
    return;
  }

  const data = {
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion
  };

  Departamento.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Departamento.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Departamento.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Departamento.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Departamento actualizado correctamente." });
      } else {
        res.send({ message: `No se pudo actualizar el Departamento con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Departamento.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Departamento eliminado correctamente." });
      } else {
        res.send({ message: `No se pudo eliminar el Departamento con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Departamento.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} departamentos eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};