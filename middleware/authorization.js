import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authorizeAdmin = async (req, res, next) => {
	const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

	const user = await User.findById(decoded.user._id);

	if (user.isAdmin) {
		next();
	} else {
		res.status(403).json({ error: 'Unathorized' });
	}
};

export const authorizeUser = async (req, res, next) => {
	const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

	try {
		const user = await User.findById(decoded.user._id);
		if (user) {
			next();
		} else {
			res.status(403).json({ error: 'Unathorized' });
		}
	} catch (error) {
		console.log(error.message);
	}
};
