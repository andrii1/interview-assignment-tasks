const express = require('express');

const router = express.Router({ mergeParams: true });

const usersController = require('../controllers/users.controller');

router.post('/', (req, res, next) => {
  usersController
    .createUsers(req.body)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
