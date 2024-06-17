/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const tasksController = require('../controllers/tasks.controller');

router.get('/', (req, res, next) => {
  const { token } = req.headers;
  tasksController
    .getTasks(token)
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  tasksController
    .getTaskById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  const { token } = req.headers;
  tasksController
    .createTask(token, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res) => {
  const { token } = req.headers;
  tasksController
    .editTask(token, req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

router.delete('/:id', (req, res) => {
  const { token } = req.headers;
  tasksController
    .deleteTask(token, req.params.id)
    .then((result) => {
      // If result is equal to 0, then that means the task id does not exist
      if (result === 0) {
        res.status(404).send('The task ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
});

module.exports = router;
