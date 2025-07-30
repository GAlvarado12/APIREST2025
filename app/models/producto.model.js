module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DECIMAL
        },
    });
    return Producto;
};