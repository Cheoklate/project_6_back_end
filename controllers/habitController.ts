import e, { Response, Request } from 'express';
import mongoose from 'mongoose';
import { Habit, User } from '../models/User';
import moment from 'moment';
import resetStreakData from './test';

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
						habitStartDate: moment(moment(new Date()).format("YYYY-MM-DD")),
						reminders: {
							reminderMethod,
							reminderMethodContact,
							reminderFrequencyUnit,
							reminderFrequencyNumber,
							reminderTime,
						},
						habitAction: [],
						habitStreak: {
							totalExpectedCount: frequencyNumber,
							completedCount: 0,
							streakCount: 0,
							achievementRate: 0,
							lastUpdated: moment(moment(new Date()).format("YYYY-MM-DD"))
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
		// check if action already exists
			const checkIfExists = await User.findOne(
				{
					_id: userId,
					'userHabits.userHabits_id': habitId,
					'userHabits.habitAction.date': moment(new Date()).format(
						'YYYY-MM-DD'
					),
				},
				'userHabits.habitAction.date userHabits.habitStreak'
			).exec();
			console.log('exists', JSON.stringify(checkIfExists));
			
			if (checkIfExists) {
				// habitDetails = JSON.parse(JSON.stringify(checkIfExists)).userHabits[0]
				// habitStreakDetails = JSON.parse(JSON.stringify(checkIfExists)).userHabits[0].habitStreak
				// console.log(habitDetails,'habit')

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
			// set streak Info
			const getHabitFrequency =  await Habit.findById(habitId,'frequencyUnit')
			const frequencyUnit = JSON.parse(JSON.stringify(getHabitFrequency)).frequencyUnit

			console.log(frequencyUnit, 'habit frequency')
			const getHabitDetails = User.findOne({_id: userId},
				{	
					userHabits:{
						$elemMatch:{
							userHabits_id:habitId
						}
					}
			}).then((res)=>{
				console.log('getHabitDetails', JSON.parse(JSON.stringify(res)).userHabits[0]);

				let habitDetails = JSON.parse(JSON.stringify(res)).userHabits[0]

				if(action==='done'){
					habitDetails.habitStreak.completedCount += 1
					habitDetails.habitStreak.achievementRate = habitDetails.habitStreak.completedCount / habitDetails.habitStreak.totalExpectedCount
				}
				console.log(habitDetails, 'before')
				resetStreakData(frequencyUnit, habitDetails)
				console.log(habitDetails, 'after')
			})
			

// // update streak count p1
// 			if (action === 'done') {

// 				const achievementRate = (habitStreakDetails.completedCount + 1)/ habitStreakDetails.totalExpectedCount
				
// 				console.log(achievementRate, habitStreakDetails.completedCount,habitStreakDetails.totalExpectedCount, 'achievement rate')

// 				const updateStreak = await User.findOneAndUpdate({ _id: userId, 'userHabits.userHabits_id': habitId },
// 				{$inc: {'userHabits.$.habitStreak.completedCount' :1},
// 				$set: {
// 					'userHabits.$.habitStreak.achievementRate': achievementRate
// 				}}).exec()
// 				console.log(JSON.stringify(updateStreak), 'updatestreak')
				
// 			}
		} catch (err) {
			console.log(err, 'err');
			return res.status(500).json({ message: 'Internal Server Error', err });
		}
	},
	viewHabit: async (req: Request, res: Response) => {
		console.log(req.query, 'request');
		try{
			const {userId, habitId} = req.query;
			if (!habitId || !userId )
				return res.status(400).json({ message: 'Missing data' });
				
			const viewHabitDetails = await User.findOne({_id:userId, 'userHabits.userHabits_id': habitId},'userHabits')

			console.log(viewHabitDetails, 'viewhabitdetails')
			return res.status(201).json(viewHabitDetails)
		}catch (err){
			console.log(err,'err')
		}
	}
};

export default HabitController;
