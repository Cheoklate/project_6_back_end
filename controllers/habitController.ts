import e, { Response, Request } from 'express';
import mongoose from 'mongoose';
import { Habit, User } from '../models/User';
import moment from 'moment';

const HabitController = {
	allHabits: async (req: Request, res: Response) => {
		try {
			const { userId } = req.query;
			const user = await User.findById(userId);
			const userHabitDetails = user.userHabits;

			console.log(userHabitDetails);

			return res.status(200).json(userHabitDetails);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	createHabit: async (req: Request, res: Response) => {
		console.log(req.body, 'request');
		try {
			const {
				userId,
				habitName,
				habitDesc,
				isPublic,
				frequencyUnit,
				frequencyNumber,
				reminderFrequencyUnit,
				reminderFrequencyNumber,
				reminderTime,
				reminderMethod,
				reminderMethodContact,
			} = req.body;

			if (!habitName || !habitDesc || !frequencyUnit)
				return res.status(400).json({ message: 'Missing data' });

			const newHabit = await new Habit({
				_id: new mongoose.Types.ObjectId(),
				habitName,
				habitDesc,
				isPublic,
				frequencyUnit,
				frequencyNumber,
				sharedWith: [{ userId }],
			}).save();

			console.log(newHabit._id, 'new habit');

			const assignUserHabit = await User.findByIdAndUpdate(userId, {
				$push: {
					userHabits: {
						userHabits_id: newHabit._id,
						habitName,
						reminders: {
							reminderMethod,
							reminderMethodContact,
							reminderFrequencyUnit,
							reminderFrequencyNumber,
							reminderTime,
						},
						habitAction: [],
						habitStreak: {
							totalCompleted: 0,
							completedCount: 0,
							streakCount: 0,
							numberSkips: 0,
						},
					},
				},
			});

			console.log('assign user habit');

			return res.status(201).json(assignUserHabit);
		} catch (err) {
			console.log(err, 'err');
			return res.status(500).json({ message: 'Internal Server Error', err });
		}
	},
	updateHabit: async (req: Request, res: Response) => {
		console.log(req.body, 'request');
		try {
			const { userId, habitId, action } = req.body;
			const results = await User.findOne(
				{ _id: userId },
				{ 'userHabits.userHabits_id': habitId }
			);
			const checkIfExists = await User.findOne(
				{
					_id: userId,
					'userHabits.userHabits_id': habitId,
					'userHabits.habitAction.date': moment(new Date()).format(
						'YYYY-MM-DD'
					),
				},
				'userHabits.habitAction.date'
			).exec();
			console.log('exists', JSON.stringify(checkIfExists));

			if (checkIfExists) {
				await User.updateOne(
					{
						_id: userId,
						'userHabits.userHabits_id': habitId,
						'userHabits.habitAction.date': moment(new Date()).format(
							'YYYY-MM-DD'
						),
					},
					{
						$set: {
							'userHabits.$.habitAction': {
								action: action,
								date: moment(new Date()).format('YYYY-MM-DD'),
							},
						},
					}
				);
				console.log('updated current days field');
			} else {
				const newAction = await User.updateOne(
					{ _id: userId, 'userHabits.userHabits_id': habitId },
					{
						$push: {
							'userHabits.$.habitAction': {
								action: action,
								date: moment(new Date()).format('YYYY-MM-DD'),
							},
						},
					}
				);
				console.log('new Action', newAction);
			}
		} catch (err) {
			console.log(err, 'err');
			return res.status(500).json({ message: 'Internal Server Error', err });
		}
	},
};

export default HabitController;
