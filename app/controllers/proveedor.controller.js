const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "Nombre no puede estar vacío." });
    return;
  }

  const data = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono
  };

  Proveedor.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Proveedor.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Proveedor.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Proveedor.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Proveedor actualizado correctamente." });
      } else {
        res.send({ message: `No se pudo actualizar el Proveedor con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Proveedor.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Proveedor eliminado correctamente." });
      } else {
        res.send({ message: `No se pudo eliminar el Proveedor con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Proveedor.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} proveedores eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};
