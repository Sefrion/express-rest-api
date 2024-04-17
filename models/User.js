import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', UserSchema);

export default User;
