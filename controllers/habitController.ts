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
};
export default HabitController;
