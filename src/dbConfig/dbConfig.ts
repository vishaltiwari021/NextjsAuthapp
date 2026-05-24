import mongoose from "mongoose";

export async function connect() {
    try {
        await  mongoose.connect(process.env.MONGO_URI as string);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connection established successfully');
        });
        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1); // Exit the process with an error code
        });
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
        process.exit(1);
        
    }
    
}