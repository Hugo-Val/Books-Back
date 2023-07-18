const server = require('./src/app');
const { conn } = require('./src/db');
require("dotenv").config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
}
);