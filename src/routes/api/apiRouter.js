const { Router } = require('express');
const apiRouter = Router();

apiRouter.use('/reminders', require('./reminders/remindersRouter'));

module.exports = apiRouter;