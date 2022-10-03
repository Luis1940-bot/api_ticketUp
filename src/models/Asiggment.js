const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!permite armar relaciones para asignar quien debe realizar las acciones resolutivas
  sequelize.define(
    "asiggments",
    {
      idasignador: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      asignados: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idticket: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      integrity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
