const { Usuario } = require("../../../models/usuario")
const { TipoUsuarios } = require("../../../models/tipoUsuario")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { getUsuarioPorEmail } = require("../get/getUsuarioPorEmail");
const { getUsuarioPorId } = require("../get/getUsuarioPorId");


const postCrearUsuario = async (name, password, email, nickname, picture, tipo) => {
    if (!name || name === "") throw new Error("El usuario debe tener un nombre");
    if (!password || password === "") throw new Error("El usuario debe tener una contraseña");
    if (!email || email === "") throw new Error("El usuario debe tener un correo electrónico");
    if (!nickname || nickname === "") throw new Error("El usuario debe tener un nickname");
    if (!picture || picture === "") throw new Error("El usuario debe tener una foto");
    if (!tipo || tipo === "") throw new Error("El usuario debe tener un tipo");

    const usuarioYaListado = await getUsuarioPorEmail(email);

    if (usuarioYaListado) {
        throw new Error("Ya existe un usuario con el mismo correo electrónico.")
    }

    // Creación del usuario
    const usuario = await Usuario.create({
        idusuario: uuidv4(),
        name,
        password: await bcrypt.hash(password, 10),
        email,
        nickname,
        picture,
        rol,
        // totalReviews: 0.0
    });

    // Vinculación con el tipo de usuario (userType)
    const tipoUsuario = await TipoUsuarios.findOne({ where: { rol: tipo } });
    if (tipoUsuario) {
        console.log("----->tipo", tipoUsuario.tipo);
        await usuario.setTipoUsuarios(tipoUsuario);
        let usuarioFinal = await usuario.save();
        sendEmail(usuarioFinal.email);
        console.log("final:", usuarioFinal);

        let formatoDeUsuario = await getUsuarioPorId(usuarioFinal.id);

        if (formatoDeUsuario) { // Verificación de que el usuario se creó correctamente
            return formatoDeUsuario;
        } else {
            throw new Error("Error al crear el usuario.")
        }

    } else {
        throw new Error("El tipo proporcionado no es válido, debe ser admin, cliente u organización")
    }
};

// Exportando la función si es necesario
module.exports = {
    postCrearUsuario
};
