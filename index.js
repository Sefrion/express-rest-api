import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import users from './routes/usersRoutes.js';
import cookieParser from 'cookie-parser';
import { authorizeUser } from './middleware/authorization.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({ credentials: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', authorizeUser, (req, res) => {
	res.status(200).send(`Welcome authorized user`);
});

app.use('/api/users', users);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running on port ${PORT}`);
});
