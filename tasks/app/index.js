const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const cors  = require('cors');
const { tasksList } = require('./api');

const StartServer = async() => {

    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    databaseConnection();
    tasksList(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();