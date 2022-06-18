import { Response, Request } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';


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
			
			const newHabit = await User.findByIdAndUpdate({_id:userId}, {$push: {
						habits: {
								habitName,
								habitDesc,
								isPublic,
								frequencyUnit,
								frequencyNumber,
							}
					},}).exec();

			console.log(newHabit)
			return res.status(201).json(newHabit);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	},
};
export default HabitController;
