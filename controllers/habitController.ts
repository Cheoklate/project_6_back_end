import { Response, Request } from 'express';
import mongoose from 'mongoose';
import {Habit, User} from '../models/User';
import moment from 'moment'

const HabitController = {
	allHabits: async (req: Request, res: Response) => {
		try {
			const {userId} = req.query;
			const user = await User.findById(userId);
			const userHabitDetails = user.userHabits

			console.log(userHabitDetails)

			
			return res.status(200).json(userHabitDetails);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
		createHabit: async (req: Request, res: Response) => {
			console.log(req.body, 'request')
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
				reminderMethodContact
			} = req.body;

			if (!habitName || !habitDesc || !frequencyUnit
				)
				return res.status(400).json({ message: 'Missing data' });
			
			const newHabit = await new Habit({
				_id: new mongoose.Types.ObjectId(),
				habitName,
				habitDesc,
				isPublic,
				frequencyUnit,
				frequencyNumber,
				sharedWith:[{userId}]
			}).save()

			console.log(newHabit._id, 'new habit')

			const assignUserHabit = await User.findByIdAndUpdate(userId, {$push: {
							userHabits: {
								userHabits_id: newHabit._id,
								habitName,
								reminders:{
									reminderMethod, 
									reminderMethodContact,
									reminderFrequencyUnit,
									reminderFrequencyNumber,
									reminderTime
									},
								habitAction: [],
								habitStreak:{
										totalCompleted: 0,
										completedCount: 0,
										streakCount: 0,
										numberSkips: 0,
								}
				}}})
				
				console.log( 'assign user habit')
			
			return res.status(201).json(assignUserHabit);
		} catch (err) {

			console.log(err,'err')
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	},
	updateHabit: async (req: Request, res: Response) => {
			console.log(req.body, 'request')
		try {
			const {userId, habitId, action} = req.body
			// const results = await User.findOne({"_id": userId}, {"userHabits.userHabits_id": habitId})
			
			// const checkExists = await User.find(
			// 	{_id: userId,  
			// 	"userHabits.userHabits_id": habitId,
			// 	}, { "habitName" :1,
			// 	"userHabits.userHabits_id.habitAction":1 }).lean()

			// 	console.log(checkExists, ' check')
		


					// console.log(results, 'check')
					const results = await User.updateOne({_id: userId, "userHabits.userHabits_id": habitId},
					{$push: {'userHabits.$.habitAction': {action: action, date: moment(new Date()).format('YYYY-MM-DD')}}}
					)
					console.log('results', results)
				} catch (err) {
			console.log(err,'err')
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	}
};
export default HabitController;
