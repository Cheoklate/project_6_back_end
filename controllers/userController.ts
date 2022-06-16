import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
import { Response, Request } from 'express';
import User from '../models/User';
import bcryptConfig from '../config/bcrypt';


const UserController = {
	login: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			if (!email || !password)
				return res.status(400).json({ message: 'Missing Data' });

			const user = await User.findOne({ email }).exec();

			if (!user)
				return res.status(401).json({ message: 'Email or Password is Wrong!' });

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid)
				return res.status(401).json({ message: 'Email or Password is Wrong!' });
				
				return res.status(200).json({
					_id: user._id,
					username: user.username,
				email: user.email,
			});
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	signup: async (req: Request, res: Response) => {
		const userFriends = [];
		try {
			const {
				firstName,
				lastName,
				userName,
				email,
				password: passwordBody,
				userFriends,
			} = req.body;

			if (!firstName || !lastName || !userName || !email || !passwordBody)
				return res.status(400).json({ message: 'Missing data' });

			const isUserExists = await User.findOne({ email }).exec();

			if (isUserExists)
				return res.status(401).json({ message: 'User Already Exists' });

			const password = await bcrypt.hash(passwordBody, bcryptConfig.salt);
			// const access_token = crypto.randomBytes(30).toString("hex");

			const newUser = await new User({
				firstName,
				lastName,
				userName,
				email,
				password,
				userFriends,
			}).save();

			return res.status(201).json(newUser);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};
export default UserController;
