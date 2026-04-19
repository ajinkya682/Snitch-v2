import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, address, profileImage } =
      req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({
      $or: [email, phone],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profileImageUrl = "";
    if (req.file) {
      const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: `user_${email.split("@")[0]}_${Date.now()}`,
        folder: "ClothMart_users",
      });
      profileImageUrl = file.url;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      address,
      profileImage: profileImageUrl,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        address: newUser.address,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default { register };
