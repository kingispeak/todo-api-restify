const Task = require('../models/Task');
const errors = require('restify-errors');

module.exports = server => {
    server.get('/tasks', (req, res, next) => {
        try {
          const tasks = [
            { id: 0, message: "First todo" },
            { id: 1, message: "Second todo" },
          ];
          res.send(tasks);
          next();
        } catch (err) {
          return next(new errors.InvalidContentError(err));
        }
      });

      server.get('/tasks/:id', (req, res, next) => {
        try {
          const task = { id: 0, message: "First todo" };
          res.send(task);
          next();
        } catch (err) {
          return next(
            new errors.ResourceNotFoundError(
              `There is no task with the id of ${req.params.id}`
            )
          );
        }
      });
}
