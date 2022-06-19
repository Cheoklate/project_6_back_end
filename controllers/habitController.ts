import { Response, Request } from 'express';
import mongoose from 'mongoose';
import {Habit, User} from '../models/User';


const HabitController = {
	// getHabit: async (req: Request, res: Response) => {
	// 	try {
	// 		const data = await Habit.find({});
	// 		console.log(data);
	// 		return res.status(200).json(data);
	// 	} catch (err) {
	// 		return res.status(500).json({ message: 'Internal Server Error' });
	// 	}
	// },
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
				reminderTime
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
			}).save()

			console.log(newHabit._id, 'new habit')

			const assignUserHabit = await User.findByIdAndUpdate(userId, {$push: {
							userHabits: {
								usersHabits_id: newHabit._id,
								reminders:{
									reminderFrequencyNumber,
									reminderFrequencyUnit,
									reminderTime
								},
				}}})

				
				console.log( 'assign user habit')
			
			return res.status(201).json(assignUserHabit);
		} catch (err) {

			console.log(err,'err')
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	},
};
export default HabitController;
