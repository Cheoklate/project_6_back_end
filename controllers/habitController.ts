import { Response, Request } from 'express';
import Habit from '../models/Habit';

const HabitController = {
	getHabit: async (req: Request, res: Response) => {
		try {
			const data = await Habit.find({});
			console.log(data);
			return res.status(200).json(data);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
		createHabit: async (req: Request, res: Response) => {
		try {
			const {
				name,
				description,
				frequencyUnit,
				frequencyNumber,
			} = req.body;

			if (!name || !description || !frequencyUnit || !frequencyNumber)
				return res.status(400).json({ message: 'Missing data' });

			const newHabit = await new Habit({
					name,
					description,
					frequencyUnit,
					frequencyNumber,
			}).save();

			return res.status(201).json(newHabit);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};
export default HabitController;
