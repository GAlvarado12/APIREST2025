const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({ message: "Nombre no puede estar vacío." });
    return;
  }

  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio
  };

  Producto.create(data)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Producto.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Producto.findByPk(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Producto.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Producto actualizado correctamente." });
      } else {
        res.send({ message: `No se pudo actualizar el Producto con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Producto.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Producto eliminado correctamente." });
      } else {
        res.send({ message: `No se pudo eliminar el Producto con id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Producto.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} productos eliminados.` }))
    .catch(err => res.status(500).send({ message: err.message }));
};