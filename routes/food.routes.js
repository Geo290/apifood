const express = require('express');
const router = express.Router();

router.get('/food', (req, res) => {
    return res.json({message: "Loaded. No food"});
})

module.exports = router;