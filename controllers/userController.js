import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export async function createUser(req, res) {
	const { name, email, password } = req.body;

	const user = { name, email, password };

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' });
		}

		bcrypt.hash(password, saltRounds, async function (err, hash) {
			if (err) {
				throw new Error(err);
			}

			user.password = hash;

			const createdUser = await User.create(user);

			const token = jwt.sign({ createdUser }, process.env.JWT_SECRET, {
				expiresIn: '2h'
			});
			res.cookie('token', token, {
				httpOnly: true
			});
			res.status(201).json(createdUser);
		});
	} catch (error) {
		console.error('Error:' + error.message);
	}
}

export async function signInUser(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: 'User does not exist' });
		}

		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				const token = jwt.sign({ user }, process.env.JWT_SECRET, {
					expiresIn: '2h'
				});
				res.cookie('token', token, {
					httpOnly: true
				});
				res.status(200).json({ message: 'User is logged in' });
			} else {
				res.status(400).json({ error: 'Wrong credentials' });
			}
		});
	} catch (error) {
		console.log(error.message);
	}
}

export async function getUsers(req, res) {
	const users = await User.find();
	res.status(200).json(users);
}
