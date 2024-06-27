const express = require('express');
const morgan = require('morgan');
const router = require('./routes/food.routes.js');

const app = express();

const port = 4000;

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1', router);

// == == == THIS IS CALLED WHITE LIST == == ==
app.use((req, res) => {
    res.status(404).json({message: 'route not found'});
})
// == == == == == == == == == == == == == == ==

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

