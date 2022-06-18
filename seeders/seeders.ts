import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {User} from '../models/User';
import {Habit} from '../models/User'
import bcrypt from 'bcrypt';

dotenv.config();

const hash = bcrypt.hashSync('123', 10);

mongoose.connect('mongodb://127.0.0.1:27017/project6', () => {
	console.log('connected to mongodb');
});

const habitSeeds = [
		{
			_id: '62aae3416434f773dcfa9bd4',
			habitName: 'test habit',
			habitDesc: '123',
			isPublic: true,
			frequencyUnit: 'daily',
			frequencyNumber: 0,
			sharedWith: [{ usersSharedWith_id: { _id: '62aae7c2fd55155e96803269' } }],
		},
	];
const userSeeds = [
	{
		_id: '62aaf10473badbb263ba660b',
		firstName: 'Gregory',
		lastName: 'Cheok',
		userName: 'Cheoklate',
		email: 'gcheok88@gmail.com',
		password: hash,
		userFriends: [{ userName: 'GracetheDragon' }, { userName: 'Smdewi' }],
		userHabits: [
			{
				userHabits_id: { _id: '62aae3416434f773dcfa9bd4' },
				habitAction: [
					{ action: 'Done', date: new Date('2014-01-22T14:56:59.301Z') },
				],
				habitStreak: [
					{
						totalCompleted: 1,
						completedCount: 2,
						streakCount: 1,
						numberSkips: 0,
					},
				],
				reminders: [
					{
						reminderMethod: 'telegram',
						reminderMethodContact: 'cheoklate',
						reminderFrequencyUnit: 'daily',
						reminderFrequencyNumber: 0,
						reminderTime: '00:00:00',
					},
				],
			},
		],
	},
	{
		_id: '62aae7c2fd55155e96803269',
		firstName: 'Grace',
		lastName: 'Koh',
		userName: 'GracetheDragon',
		email: 'gracethedragon@hotmail.com',
		password: hash,
		userFriends: [{ userName: 'Cheoklate' }, { userName: 'Smdewi' }],
	},
	{
		_id: '62aae68f0fc6103849280b25',
		firstName: 'Sri',
		lastName: 'Mulyanidewi',
		userName: 'dewi',
		email: 'smdewi2020@gmail.com',
		password: hash,
		userFriends: [{ userName: 'GracetheDragon' }, { userName: 'Cheoklate' }],
	},
	
];

const runSeeder = async () => {
	console.log('test');
	// delete all existing records in the DB
	await User.deleteMany({});
	await Habit.deleteMany({})
	// delete all existing habits in the DB
	// await Habits.deleteMany({});
	// inserts seed data
	const users = await User.insertMany(userSeeds);
	const habits = await Habit.insertMany(habitSeeds)
	console.log('Inserted userSeeds. This is the result: ', users);
	console.log('Inserted habitSeeds. This is the result: ', habits);
	// find all names in the db
	const allNames = await User.find().select('userName');
	const allHabits = await Habit.find().select('habitName')
	console.log('All the users in our app', allNames);
	console.log('All the users in our app', allHabits)
	// get all the userIds
	const userIds = allNames.map((el: { _id: any }) => el._id);
	const habitIds = allHabits.map((el: { _id: any }) => el._id);
	console.log('All the userIds in our app', userIds);
	console.log('All the userIds in our app', habitIds)
};

runSeeder().then(() => {
	mongoose.connection.close();
});
