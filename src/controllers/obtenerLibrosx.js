const { Libro, Genero} = require('../db.js');

async function obtenerLibros(req, res) {
 const page = parseInt(req.query.pagina) || 1;
 const perPage = parseInt(req.query.limite) || 4;

 // Cálculo de los índices para la paginación
 const startIndex = (page - 1) * perPage;
 const endIndex = startIndex + perPage;

 const {  rows } = await Libro.findAll({
  limite : perPage,
});

//let todos = [];
 let { todos, count }= await Libro.findAndCountAll({totallibros:count});



 // Obtener los productos correspondientes a la página actual
 // const paginatedLibros = todos.slice(startIndex, endIndex);
 // res.json(paginatedLibros);
 res.json(todos);

}
module.exports = { obtenerLibros };