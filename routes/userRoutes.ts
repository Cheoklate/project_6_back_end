import { Router } from 'express';
import UserController from '../controllers/userController';
import HabitController from '../controllers/habitController';
const router: Router = Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/createhabit', HabitController.createHabit);

export default router;
