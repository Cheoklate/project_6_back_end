import { Response, Request } from 'express';
import mongoose from 'mongoose';
import {Habit, User} from '../models/User';
import moment from 'moment'

const FriendController = {
	allFriends: async (req: Request, res: Response) => {
		try {
			const {userId} = req.query;
			const user = await User.findById(userId);
			const userFriends = user.userFriends

			console.log(userFriends)

			
			return res.status(200).json(userFriends);
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
		addFriend: async (req: Request, res: Response) => {
			console.log(req.body, 'request')
		try {
			const {
				userId,
				userName,

				friendUserName
			} = req.body;
			
			if (!friendUserName)
				return res.status(400).json({ message: 'Missing data' });
			
			const findFriend = await User.findOne({userName: friendUserName}).exec()
			console.log(findFriend, 'new findFriend')

			// return null if no friend
			if(!findFriend) 
				return res.status(201).json({message: 'no such user'})
			

			const checkIfFriends = await User.findOne({
				_id: userId,
				'userFriends.userName': friendUserName},
				'userFriends.userName'
			).exec()
			console.log('alr friends', JSON.stringify(checkIfFriends))

			if(checkIfFriends)
				return res.status(201).json({message: 'alr friends'})

			const checkIfReqSent = await User.findOne({
				_id: userId,
				'friendRequestSent.userName': friendUserName},
				'friendRequestSent.userName'
			).exec()
			console.log('req alr sent', JSON.stringify(checkIfReqSent))

			if(checkIfReqSent)
				return res.status(201).json({message: 'request alr sent'})

			const sendRequest = await User.findByIdAndUpdate(userId, {
				$push: {
					friendRequestSent: {
						_id: findFriend._id,
						userName: friendUserName
					}
				}
			}).exec()

			const receiveRequest = await User.findByIdAndUpdate(findFriend._id,{
				$push: {
							friendRequestReceived: {
								_id: userId,
								userName: userName
							}
						}
			}).exec()
				console.log(sendRequest, receiveRequest, 'received')
		
		if(sendRequest && receiveRequest)
			return res.status(201).json(findFriend)
			
		} catch (err) {
			console.log(err,'err')
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	},
		friendRequest: async (req: Request, res: Response) => {
		try {
				const {userId} = req.query;
				const user = await User.findById(userId);
				const friendRequest = user.friendRequestReceived

				console.log(friendRequest, 'friend request')

			return res.status(200).json(friendRequest);
		} catch (err){
			console.log(err, 'err')
			return res.status(500).json({message: 'Internal Server Error', err})
		}
	}
};
export default FriendController;
