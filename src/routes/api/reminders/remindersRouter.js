const { MongoClient } = require('mongodb');
const { mongoUri } = require('../../../config/config.json');
const db = new MongoClient(mongoUri).db('database')
const { Router } = require('express');
const remindersRouter = Router();

remindersRouter.get('/:userId/', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await db.collection('users').findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist!'
            });
        }
        let reminders = [];
        await user.reminders.forEach(async reminderId => {
            const reminder = await db.collection('reminders').findOne({ _id: reminderId })
            if (!reminder) { return; }
            reminders.push({
                id         : reminder._id,
                userId     : reminder.userId,
                createdAt  : reminder.createdAt,
                title      : reminder.title,
                description: reminder.description,
                delay      : reminder.delay
            });
        });
        setTimeout(() => {
            return res.json({
                count: reminders.length,
                reminders: reminders
            });
        }, 100);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

remindersRouter.delete('/:reminderId/delete', async (req, res) => {
    const { reminderId } = req.params;
    try {
        const reminder = await db.collection('reminders').findOne({ _id: reminderId });
        await db.collection('reminders').findOneAndDelete({ _id: reminderId });
        await db.collection('users').findOneAndUpdate(
            { _id: reminder.userId },
            { '$pull': { reminders: reminderId } }
        );
        return res.status(200).json({
            message: 'Deleted!'
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

module.exports = remindersRouter;