const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!los problemas se guardan en esta tabla con relación al ticket
  sequelize.define(
    "problems",
    {
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      problema: {
        type: DataTypes.TEXT,
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
