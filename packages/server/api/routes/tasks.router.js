/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const tasksController = require('../controllers/tasks.controller');

/**
 * @swagger
 * /task:
 *  get:
 *    tags:
 *    - task
 *    summary: Get all tasks
 *    description:
 *      Will return all task.
 *    produces: application/json
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', (req, res, next) => {
  tasksController
    .getTasks()
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /tasks/{ID}:
 *  get:
 *    tags:
 *    - tasks
 *    summary: Get task by ID
 *    description:
 *      Will return single task with a matching ID.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the task to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/:id', (req, res, next) => {
  tasksController
    .getTaskById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /tasks:
 *  post:
 *    tags:
 *    - tasks
 *    summary: Create a task
 *    description:
 *      Will create a task.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: task
 *        description: The task to create.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *          properties:
 *            title:
 *              type: string
 *    responses:
 *      201:
 *        description: tasks created
 *      5XX:
 *        description: Unexpected error.
 */
router.post('/', (req, res) => {
  tasksController
    .createTask(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

/**
 * @swagger
 * /tasks/{ID}:
 *  patch:
 *    tags:
 *    - tasks
 *    summary: Create an task
 *    description:
 *      Will create an task.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the task to patch.
 *      - in: body
 *        name: task
 *        description: The task to create.
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *    responses:
 *      200:
 *        description: task was patched
 *      5XX:
 *        description: Unexpected error.
 */
router.patch('/:id', (req, res) => {
  tasksController
    .editTask(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);

      res.status(400).send('Bad request').end();
    });
});

/**
 * @swagger
 * /tasks/{ID}:
 *  delete:
 *    tags:
 *    - tasks
 *    summary: Delete an task
 *    description:
 *      Will delete a task with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the task to delete.
 *    responses:
 *      200:
 *        description: task deleted
 *      5XX:
 *        description: Unexpected error.
 */
router.delete('/:id', (req, res) => {
  tasksController
    .deleteTask(req.params.id, req)
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
