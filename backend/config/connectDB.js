import mongoose from "mongoose";

const connectDB = async () => {
try {
    const db = process.env.DB_URL
    await mongoose.connect(db)
    console.log("Database is connected");
} catch (error) {
    console.log(error.message);
    process.exit(1)
}
}

export default connectDB