import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI).then(() => {
      console.log("Database connected Successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
