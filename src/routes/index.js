const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => { res.send('¡Bienvenido a la API!');});

module.exports = router;