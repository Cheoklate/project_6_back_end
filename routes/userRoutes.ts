import { Router } from 'express';
import UserController from '../controllers/userController';
import HabitController from '../controllers/habitController';
const router: Router = Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/createhabit', HabitController.createHabit);
router.get('/allhabits', HabitController.allHabits);router.post('/updatehabit', HabitController.updateHabit);

export default router;
