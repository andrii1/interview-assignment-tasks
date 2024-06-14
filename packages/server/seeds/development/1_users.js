// TODO: This is a sample seed file for demonstration. Remove before adding real ones.

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'test@gmail.com',
        },
        {
          email: 'test2@gmail.com',
        },
      ]);
    });
};
