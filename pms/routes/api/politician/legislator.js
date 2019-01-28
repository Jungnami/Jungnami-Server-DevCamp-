const express = require('express');
const router = express.Router();

router.get('/page/:code', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;