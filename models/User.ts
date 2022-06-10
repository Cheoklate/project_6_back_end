import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
	{
		firstName: String,
		lastName: String,
		username: String,
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			trim: true,
			match: /.+\@.+\..+/,
		},
		password: { type: String, required: true },
		userFriends: String,
	},
	{ timestamps: true }
);
export default model('User', userSchema);
