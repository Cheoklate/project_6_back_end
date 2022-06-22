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
			} = req.body;

			if (!userName)
				return res.status(400).json({ message: 'Missing data' });
			
			const findFriend = await User.findOne({userName})
			console.log(findFriend, 'new findFriend')

			// return null if no friend
			if(!findFriend) 
				return res.status(201).json({message:'no such user'});

			const checkRequest = await User.findById(userId, 'friendRequestSent userFriends')
			
			console.log(checkRequest,'checkreq')

			//check if user is already in friends
			checkRequest.userFriends.forEach((friend: { userName: string; }) => {
				if(friend.userName === userName)
					console.log('already friends')
					res.status(201).json({message: 'already friends'})
					return
			})
					//check if request had already been sent
			checkRequest.friendRequestSent.forEach((friend: { userName: string; }) =>{
				if(friend.userName === userName)
					console.log('already sent')
					res.status(201).json({message: 'already sent'})
					return 
			})
				//send friend request
				const sendRequest = await User.findById(userId, {
					$push: {
						friendRequestSent: {
							_id: findFriend._id,
							userName: findFriend.userName
						}
					}
				})
				//update request received
				const receiveRequest = await User.findById(findFriend._id,{
					$push: {
							friendRequestReceived: {
								_id: userId
							}
						}
				})
				console.log(sendRequest, receiveRequest, 'received')
				return res.status(201).json(findFriend);	
		} catch (err) {
			console.log(err,'err')
			return res.status(500).json({ message: 'Internal Server Error' , err});
		}
	},
	
};
export default FriendController;
