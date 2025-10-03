import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNo, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User Already Exists");
    }
    if (password.length < 6) {
      return res.status(400).json("Password must be 6 Characters");
    }
    if (mobileNo.length < 10) {
      return res.status(400).json("mobileNo  must be 10 digits");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobileNo,
      password: hashPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`SignUp error,${error}`);
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User  does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`SignUp In error,${error}`);
  }
};

export const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerify = false;
    await user.save();

    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Send OTP error: ${error}` });
  }
};

export const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired otp" });
    }
    user.isOtpVerify = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: `verify OTP error: ${error}` });
  }
};



export const resetPassword = async () => {
  try {
    const {email,newPassword} = req.body
    const user = await User.findOne({email})
    if(!user || !user.isOtpVerify){
    return res.status(400).json({ message: "otp verification required" });
    }
    const hashPassword = await bcrypt.hash(newPassword,10)
    user.password = hashPassword;
    user.isOtpVerify=false;
    await user.save()
      return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
      return res.status(500).json({ message: `reset password error: ${error}` });
  }
}