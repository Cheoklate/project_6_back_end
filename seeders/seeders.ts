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
			habitName: 'Eat veg',
			habitDesc: '123',
			isPublic: true,
			frequencyUnit: 'daily',
			frequencyNumber: 1,
			sharedWith: [{ usersSharedWith_id: { _id: '62aaf10473badbb263ba660b' } }],
		},
		{
			_id: '62b910da4494a643554dc64e',
			habitName: 'Drink water',
			habitDesc: '8 cups',
			isPublic: true,
			frequencyUnit: 'weekly',
			frequencyNumber: 3,
			sharedWith: [{ usersSharedWith_id: { _id: '62aaf10473badbb263ba660b' } }],
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
		userFriends: [{ userName: 'GracetheDragon' }],
		userHabits: [
			{
				userHabits_id: { _id: '62aae3416434f773dcfa9bd4' },
				habitName: 'Eat veg',
				habitStartDate: new Date('2022-06-20T14:56:59.301Z'),
				isPublic: true,
				frequencyUnit: 'daily',
				frequencyNumber: 1,
				habitAction: [
					{ action: 'done', date: new Date('2022-06-21T00:00:00.000Z') },
					{ action: 'done', date: new Date('2022-06-22T00:00:00.000Z') },
					{ action: 'undone', date: new Date('2022-06-23T00:00:00.000Z') },
					{ action: 'undone', date: new Date('2022-06-24T00:00:00.000Z') },
					{ action: 'done', date: new Date('2022-06-25T00:00:00.000Z') },
					{ action: 'done', date: new Date('2022-06-26T00:00:00.000Z') },
					
				],
				habitStreak: 
					{
						totalExpectedCount: 1,
						completedCount: 0,
						streakCount: 3,
						achievementRate: 0,
						lastUpdated: new Date('2022-06-26T00:00:00.000Z'),
					},
				reminders: 
					{
						reminderMethod: 'telegram',
						reminderMethodContact: 'cheoklate',
						reminderFrequencyUnit: 'daily',
						reminderFrequencyNumber: 0,
						reminderTime: '00:00:00',
					},
			},
			{
				userHabits_id: {_id: '62b910da4494a643554dc64e', },
				habitName: 'Drink water',
				habitStartDate: new Date('2022-06-15T14:56:59.301Z'),
				isPublic: true,
				frequencyUnit: 'weekly',
				frequencyNumber: 3,
				habitAction: [
					
					{ action: 'done', date:  new Date('2022-06-16T00:00:00.000Z') },
					{ action: 'done', date:  new Date('2022-06-17T00:00:00.000Z') },
					{ action: 'done', date:  new Date('2022-06-18T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-19T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-20T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-21T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-22T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-23T00:00:00.000Z') },
					{ action: 'undone', date:  new Date('2022-06-24T00:00:00.000Z') },
					{ action: 'done', date:  new Date('2022-06-25T00:00:00.000Z') },
					{ action: 'done', date:  new Date('2022-06-26T00:00:00.000Z') },
					
				],
				habitStreak: 
					{
						totalExpectedCount: 3,
						completedCount: 2,
						streakCount: 1,
						achievementRate: 2/3,
						lastUpdated: new Date('2022-06-26T00:00:00.000Z'),
					},
				reminders: 
					{
						reminderMethod: 'telegram',
						reminderMethodContact: 'cheoklate',
						reminderFrequencyUnit: 'daily',
						reminderFrequencyNumber: 0,
						reminderTime: '00:00:00',
					},
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
		userFriends: [{ userName: 'Cheoklate' }, { userName: 'dewi' }],
		userHabits: [
			{
				userHabits_id: { _id: '62aae3416434f773dcfa9bd4' },
				habitName: 'Eat veg',
				habitStartDate: new Date('2022-06-25T14:56:59.301Z'),
				isPublic: true,
				frequencyUnit: 'daily',
				frequencyNumber: 1,
				habitAction: [
					{ action: 'done', date: new Date('2022-06-25T00:00:00.000Z') },
					{ action: 'undone', date: new Date('2022-06-26T00:00:00.000Z') },
					
				],
				habitStreak: 
					{
						totalExpectedCount: 1,
						completedCount: 0,
						streakCount: 0,
						achievementRate: 0,
						lastUpdated: new Date('2022-06-26T00:00:00.000Z'),
					},
				reminders: 
					{
						reminderMethod: 'telegram',
						reminderMethodContact: 'gracethedragon`',
						reminderFrequencyUnit: 'daily',
						reminderFrequencyNumber: 0,
						reminderTime: '00:00:00',
					},
			},]
	},
	{
		_id: '62aae68f0fc6103849280b25',
		firstName: 'Sri',
		lastName: 'Mulyanidewi',
		userName: 'dewi',
		email: 'smdewi2020@gmail.com',
		password: hash,
		userFriends: [{ userName: 'GracetheDragon' }],
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
