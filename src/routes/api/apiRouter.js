const { Router } = require('express');
const apiRouter = Router();

apiRouter.use('/reminders', require('./reminders/remindersRouter'));

apiRouter.get('/', (req, res) => res.sendStatus(200))

module.exports = apiRouter;