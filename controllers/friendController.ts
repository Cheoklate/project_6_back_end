import { Response, Request } from 'express';
import mongoose from 'mongoose';
import {Habit, User} from '../models/User';
import moment from 'moment'

const FriendController = {
	allFriends: async (req: Request, res: Response) => {
		try {
			const {userId} = req.query;
			const user = await User.findById(userId);
			const userFriends = user.userFriends

			console.log(userFriends)

			
			return res.status(200).json(userFriends);
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
	
};
export default FriendController;
