import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import bcrypt from 'bcrypt';

dotenv.config();

const hash = bcrypt.hashSync('123', 10);

mongoose.connect('mongodb://127.0.0.1:27017/project6', () => {
	console.log('connected to mongodb');
});

const userSeeds = [
	{
		firstName: 'Gregory',
		lastName: 'Cheok',
		username: 'Cheoklate',
		email: 'gcheok88@gmail.com',
		password: hash,
		userFriends: [{ userName: 'GracetheDragon' }, { userName: 'Smdewi' }],
		habits: [
			{
				habitName: 'test habit',
				habitDesc: '123',
				isPublic: true,
				frequencyUnit: 'daily',
				frequencyNumber: 0,
				sharedWith: [{ userName: 'dewi' }],
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
		firstName: 'Grace',
		lastName: 'Koh',
		username: 'GracetheDragon',
		email: 'gracethedragon@hotmail.com',
		password: hash,
		userFriends: [{ userName: 'Cheoklate' }, { userName: 'Smdewi' }],
	},
	{
		firstName: 'Sri',
		lastName: 'Mulyanidewi',
		username: 'dewi',
		email: 'smdewi2020@gmail.com',
		password: hash,
		userFriends: [{ userName: 'GracetheDragon' }, { userName: 'Cheoklate' }],
	},
];

const runSeeder = async () => {
	console.log('test');
	// delete all existing records in the DB
	await User.deleteMany({});
	// delete all existing habits in the DB
	// await Habits.deleteMany({});
	// inserts seed data
	const users = await User.insertMany(userSeeds);
	console.log('Inserted userSeeds. This is the result: ', users);
	// find all names in the db
	const allNames = await User.find().select('username');
	console.log('All the users in our app', allNames);
	// get all the userIds
	const userIds = allNames.map((el: { _id: any }) => el._id);
	console.log('All the userIds in our app', userIds);
};

runSeeder().then(() => {
	mongoose.connection.close();
});
