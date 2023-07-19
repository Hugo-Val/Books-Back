const { Router } = require('express');

const { agregaLibro } = require('../controllers/agregaLibro');

const router = Router();


router.post('/agregaLibro',agregaLibro );

router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});

module.exports = router;