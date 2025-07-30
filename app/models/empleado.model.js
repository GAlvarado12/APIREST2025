module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        cargo: {
            type: Sequelize.STRING
        },
        salario: {
            type: Sequelize.DECIMAL
        },
    });
    return Empleado;
};
