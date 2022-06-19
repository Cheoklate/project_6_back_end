import { model, Schema } from 'mongoose';

const friendSchema: Schema = new Schema({
	userName: String,
});

const friendRequestSentSchema: Schema = new Schema({
	userName: String,
});

const friendRequestReceivedSchema: Schema = new Schema({
	userName: String,
});

const habitActionSchema: Schema = new Schema({
	action: String,
	date: Date,
});

const habitStreakSchema: Schema = new Schema({
	totalCompleted: Number,
	completedCount: Number,
	streakCount: Number,
	numberSkips: Number,
});

const reminderSchema: Schema = new Schema({
	reminderMethod: String,
	reminderMethodContact: String,
  reminderFrequencyUnit: String,
	reminderFrequencyNumber: Number,
	reminderTime: String,
});

const habitSchema: Schema = new Schema({
	_id: Schema.Types.ObjectId,
	habitName: String,
	habitDesc: String,
	isPublic: Boolean,
	frequencyUnit: String,
	frequencyNumber: Number,
	sharedWith:[{ 
		usersSharedWith_id: {
			type: Schema.Types.ObjectId,
			ref: 'User'}
		}]
});

const userSchema: Schema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		userName: String,
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			trim: true,
			match: /.+\@.+\..+/,
		},
		password: { type: String, required: true },
		userFriends: [friendSchema],
		friendRequestSent: [friendRequestSentSchema],
		friendRequestReceived: [friendRequestReceivedSchema],
		userHabits: [
			{
				_id: false,
				userHabits_id: {
					type: Schema.Types.ObjectId,
					ref: 'Habit',
				},
				habitAction: [habitActionSchema],
				habitStreak: habitStreakSchema,
				reminders: reminderSchema,
			},
		],
	},
	{ timestamps: true }
);
// const habitSchema: Schema = newSchema(
//   {}
// )

const Habit = model('Habit', habitSchema);
const User = model('User', userSchema);
// export default model('User', userSchema);

export {Habit, User}
