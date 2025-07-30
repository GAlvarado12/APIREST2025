module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define("departamento", {
        nombre: {
            type: Sequelize.STRING
        },
        ubicacion: {
            type: Sequelize.STRING
        },
    });
    return Departamento;
};