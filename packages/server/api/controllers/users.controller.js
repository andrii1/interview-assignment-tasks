const knex = require('../../config/db');

// post
const createUsers = async (body) => {
  try {
    await knex('users').insert({
      email: body.email,
      uid: body.uid,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUsers,
};
