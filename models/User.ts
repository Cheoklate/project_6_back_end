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

const sharedWithSchema: Schema = new Schema({
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
	habitName: String,
	habitDesc: String,
	isPublic: Boolean,
	frequencyUnit: String,
	frequencyNumber: Number,
	sharedWith: [sharedWithSchema],
	habitAction: [habitActionSchema],
	habitStreak: [habitStreakSchema],
	reminders: [reminderSchema],
});

const userSchema: Schema = new Schema(
  {
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
		habits: [habitSchema],
  },
  { timestamps: true }
);
export default model('User', userSchema);
