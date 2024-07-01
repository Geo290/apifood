const express = require('express');
const morgan = require('morgan');
const router = require('./routes/food.routes.js');
const routerUser = require('./routes/user.routes.js')
const { run, stop } = require('./config/db.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 4000;

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/food', router);
app.use('/api/v1/users', routerUser);

// connect to DB
run().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('SIGTERM', () => { stop(server); });
    process.on('SIGINT', () => { stop(server); });

}).catch(console.error);