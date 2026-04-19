import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "store_owner"],
    default: "user",
  },
  phone: {
    type: String,
  },
  address: {
    type: Array,
  },
  profileImage: {
    type: String,
    required: [true, "Profile image is required"],
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
