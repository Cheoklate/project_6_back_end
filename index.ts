// import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoutes';
// import cookieParser from 'cookie-parser'

mongoose.connect('mongodb://127.0.0.1:27017/project6', () => {
	console.log('connected to mongodb');
});

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://track-abit-front.herokuapp.com';

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_URL,
	})
);
// app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.use(router);

const PORT = process.env.PORT || 3004;
app.listen(PORT);

// const httpServer = createServer(app);
