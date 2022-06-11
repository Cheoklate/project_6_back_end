import { model, Schema } from 'mongoose';

const friendSchema: Schema = new Schema({
	userName: String,
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
	},
	{ timestamps: true }
);
export default model('User', userSchema);
