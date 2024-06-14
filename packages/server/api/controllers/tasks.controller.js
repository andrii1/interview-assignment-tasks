/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getTasks = async () => {
  return knex('tasks').select('tasks.id', 'tasks.title', 'tasks.description');
};

const getTaskById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const tasks = await knex('tasks')
      .select('tasks.id as id', 'title')
      .where({ id });
    if (tasks.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return tasks;
  } catch (error) {
    return error.message;
  }
};

const editTask = async (taskId, updatedTask) => {
  if (!taskId) {
    throw new HttpError('taskId should be a number', 400);
  }

  await knex('tasks').where({ id: taskId }).update({
    title: updatedTask.title,
    description: updatedTask.description,
  });

  return {
    successful: true,
  };
};

const deleteTask = async (taskId) => {
  return knex('tasks').where({ id: taskId }).del();
};

const createTask = async (body) => {
  await knex('tasks').insert({
    title: body.title,
    description: body.description,
  });

  return {
    successful: true,
  };
};

module.exports = {
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
};
