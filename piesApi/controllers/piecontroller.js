let express = require('express');
let router = express.Router();

router.get('/', (req, res) => res.send('I love pie!'))

module.exports = router;