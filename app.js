const express = require('express');
const app = express();

const port = 4000;

app.get("/", (req,res) => {
    res.json({
        message: "App running correctly"
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

