const { Router } = require('express');

const { agregaLibro } = require('../controllers/agregaLibro.js');

const { obtenerLibros } = require('../controllers/obtenerLibros.js');

const router = Router();

router.post('/agregaLibro',agregaLibro );
router.get('/obtenerLibros', obtenerLibros);

router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});

module.exports = router;