import mongoose from 'mongoose';

export const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mern_app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Succesfully");
        
    } catch (error) {
        console.error("❌ MongoDB connection error:', error.message");
        process.exit(1);
    }
};