import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  if (mongoose.connection.readyState === mongoose.STATES.connected) return;
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "spaceplan_Admin" });
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw new Error("Error connecting to DataBase");
  }
};

export default connectToDB;
