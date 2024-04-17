import mongoose from 'mongoose';

let connected = false;

async function connectDB() {
	mongoose.set('strictQuery', true);
	if (connected) {
		console.log('MongoDB is already connected...');
		return;
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		connected = true;
		console.log('MongoDB is connected...');
	} catch (error) {
		console.log(error);
	}
}

export default connectDB;
