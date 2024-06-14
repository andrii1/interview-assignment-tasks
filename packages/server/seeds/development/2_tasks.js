// TODO: This is a sample seed file for demonstration. Remove before adding real ones.

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          title: 'buy milk',
          description: '1 liter of milk',
          user_id: '1',
        },
        {
          title: 'buy bread',
          description: 'Dark bread',
          user_id: '1',
        },
      ]);
    });
};
