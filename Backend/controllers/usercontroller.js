import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    const file = req.file;
    if (!fullName || !email || !phoneNumber || !password || !role || !file) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    return res.status(201).json({
      message: `user ${fullName} registered successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    // check if email or password is missing
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    // check entered password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exists with current role.",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; //comes when cludinary set up

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication gives req.id
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found.",
        success: false,
      });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url; // Save the cloudinary url
        user.profile.resumeOriginalName = file.originalname; // Save the original file name
      }
    }
    await user.save();
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
