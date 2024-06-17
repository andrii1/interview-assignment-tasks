/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getTasks = async (token) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    await knex('tasks')
      .select('tasks.id', 'tasks.title', 'tasks.description')
      .where({ id: taskId, user_id: user.id });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

const createTask = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('tasks').insert({
      title: body.title,
      description: body.description,
      user_id: user.id,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

const editTask = async (token, taskId, updatedTask) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    if (!taskId) {
      throw new HttpError('taskId should be a number', 400);
    }
    await knex('tasks').where({ id: taskId, user_id: user.id }).update({
      title: updatedTask.title,
      description: updatedTask.description,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

const deleteTask = async (token, taskId) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    if (!taskId) {
      throw new HttpError('taskId should be a number', 400);
    }
    await knex('tasks').where({ id: taskId, user_id: user.id }).del();
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getTasks,
  deleteTask,
  createTask,
  editTask,
};
