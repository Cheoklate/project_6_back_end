import { model, Schema } from 'mongoose';

const habitSchema: Schema = new Schema(
	{
		name: String,
		description: String,
		frequencyUnit: String,
		frequencyNumber: Number
		
	},
	{ timestamps: true }
);
export default model('Habit', habitSchema);
