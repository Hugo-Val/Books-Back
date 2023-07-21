const { Usuario } = require("../../../models/usuario");
const { TipoUsuarios } = require("../../../models/tipoUsuario");

const getUsuarioPorEmail = async (email) => {
  const usuario = await Usuario.findOne({
    where: { email },
    include: [
      {
        model: TipoUsuarios,
        attributes: ["rol"]
      }
    ]
  });

  return usuario;
};

module.exports = { 
  getUsuarioPorEmail
};
