import { Router } from 'express';
import UserController from '../controllers/userController';
import HabitController from '../controllers/habitController';
import FriendController from '../controllers/friendController'
import { Habit } from '../models/User';
const router: Router = Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/createhabit', HabitController.createHabit);
router.get('/allhabits', HabitController.allHabits);
router.post('/updatehabit', HabitController.updateHabit);
router.get('/friends', FriendController.allFriends)
router.post('/friends', FriendController.addFriend)
router.get('/friendhabits', HabitController.friendHabits)
router.get('/viewhabit', HabitController.viewHabit)

router.get('/friendrequest', FriendController.friendRequest)
router.post('/friendrequest', FriendController.requestAction)


export default router;
