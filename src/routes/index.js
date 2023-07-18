const { Router } = require('express');

// Import all the routers;
// const exampleRouter = require('./example.js');

const  getAll  = require('./GetAll.js');


const router = Router();

// Configure router;

// router.use('/example', exampleRouter);

router.use(getAll);


module.exports = router;