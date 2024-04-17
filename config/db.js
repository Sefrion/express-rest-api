import mongoose from 'mongoose';

async function connectDB() {
	mongoose.set('strictQuery', true);
	if (mongoose.connection) {
		console.log('MongoDB is already connected...');
		return;
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB is connected...');
	} catch (error) {
		console.log(error);
	}
}

export default connectDB;
