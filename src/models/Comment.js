const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "comments",
    {
      idticket: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      iduser: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
