const mongoose = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const saltRounds = 10;

const SignIn = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    contactNumber,
    profileImage,
    sellerDetails,
  } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password", hashedpassword);
    const userData = {
      name,
      email,
      userType,
      password: hashedpassword,
      contactNumber,
      profileImage,
    };
    if (userData.userType === "seller" && sellerDetails) {
      userData.sellerDetails = sellerDetails;
    }
    const user = await User.create(userData);
    console.log("User created Signed Successed ", user);
    return res.status(200).json({ msg: "User Signed In Successfully", user });
  } catch (error) {
    console.log("Error in sign in", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All Filed are required" });
  }
  try {
    const storeddata = await User.findOne({ email });
    if (!storeddata) {
      return res
        .status(401)
        .json({ msg: "User is not Registered with given Email" });
    }
    console.log("this is data with given email ", storeddata);
    const isValidPassowrd = await bcrypt.compare(password, storeddata.password);
    if (!isValidPassowrd) {
      return res.status(201).json({
        msg: "Password with Register Email is Not Correct(Invalid Passowrd)",
      });
    }

    // creating the Jwt token
    const token = jwt.sign(
      {
        _id: storeddata._id,
        email: storeddata.email,
        userType: storeddata.userType,
      },
      "Pikachu",
      {
        expiresIn: "2h",
      }
    );

    // now this jwt token is send to cookie at frontend so that it can access it
//     res.cookie("token", token ,{
//   httpOnly: true,
//   //secure: process.env.NODE_ENV === "production", // only in production
//   secure: false,
//  // sameSite: "None", // required for cross-origin requests
//   sameSite: "None",  // This enables cross-site cookie usage
//   path: "/",
//   maxAge: 2 * 60 * 60 * 1000 // 2 hours in ms — set expiration explicitly
// });


    // ✅ Set Cookie - updated for localhost dev
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // use true in production with HTTPS
      sameSite: "Lax", // "None" requires HTTPS
      path: "/",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });
    
    console.log("The Login is Successed", storeddata);
    return res
      .status(200)
      .json({ msg: "User Login SuccessFully", data: storeddata });
  } catch (error) {
    console.log("Error in Log in", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const result = await User.findById(id);
    console.log("Getting My Profile", result);
    return res.status(200).json({ msg: "Profile Fetched", user: result });
  } catch (error) {
    console.log("Error in Log in", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const UpdateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const update = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Prevent updates to password here
    if ("password" in update) {
      return res
        .status(400)
        .json({ msg: "Use change-password endpoint to update password" });
    }

    // Restrict sellerDetails update to sellers only
    if (update.sellerDetails && user.userType !== "seller") {
      return res
        .status(403)
        .json({ msg: "Only sellers can update seller details" });
    }

  // Safely apply updates
    user.name = update.name || user.name;
    user.contactNumber = update.contactNumber || user.contactNumber;
    user.profileImage = update.profileImage || user.profileImage;

    if (update.sellerDetails && user.userType === "seller") {
      user.sellerDetails = {
        ...user.sellerDetails,
        ...update.sellerDetails
      };
    }
    await user.save();
    const sanitizedUser = await User.findById(userId).select("-password");
    return res.status(200).json({ msg: "Profile updated", sanitizedUser });
  } catch (error) {
    console.log("Error in Log in", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// const LogOut=async(req,res)=>{
//   try {
//     res.clearCookie('token')
//   } catch (error) {
//     console.log("Error in logout", error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// }

const LogOut = async (req, res) => {
  try {
    // Clear cookie with consistent options
    res.clearCookie('token', {
      httpOnly: true,
     // secure: process.env.NODE_ENV === 'production', // Only secure in production
      // sameSite: 'strict',
sameSite: "Lax",
      secure: false,
      // sameSite: "None",  // This enables cross-site cookie usage
      path: '/',
    });

    // Send confirmation back to frontend
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { SignIn, LogIn, getMyProfile, UpdateMyProfile , LogOut};
