const { Libro, Genero } = require('../db.js');

async function obtenerLibros(req, res) {
  const pagina = parseInt(req.query.pagina) || 1;
  const porPagina = parseInt(req.query.limite) || 8;
  // Cálculo de los índices para la paginación
  const offset = (pagina - 1) * porPagina;
  try {
    // Realizar la consulta con Sequelize usando las opciones limit y offset para la paginación
    const { rows, count } = await Libro.findAndCountAll({
      limit: porPagina,
      offset,
    });
    // rows contiene los resultados de la consulta, que es un array de libros
    // count contiene el total de libros encontrados en la consulta sin aplicar la paginación
    res.json({     
      paginaActual: pagina,
      librosPorPagina: porPagina,
      totalLibros: count,
      libros: rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros.' });
  }
}

module.exports = { obtenerLibros };
