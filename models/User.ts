import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
	{
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
	},
	{ timestamps: true }
);
export default model('User', userSchema);
