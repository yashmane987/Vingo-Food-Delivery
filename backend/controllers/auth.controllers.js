import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

 export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNo, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User Already Exists");
    }
    if (password.length > 6) {
      return res.status(400).json("Password must be 6 Characters");
    }
    if (mobileNo.lenth < 10) {
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
    })

    return  res.status(201).json(user)
  } catch (error) {
    return res.status(500).json(`SignUp error,${error}`)
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message:"User  does not exists"});
    }
    
     const isMatch = await bcrypt.compare(password,user.password)

     if(!isMatch){
     return res.status(400).json({message:"Incorrect Password"});
     }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return  res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(`SignUp In error,${error}`)
  }
};

export const signOut = async (req,res) => {
 try {
   res.clearCookie("token")
  return res.status({meassage:"Logout is succesful"})
 } catch (error) {
   return res.status(500).json(`SignOut error,${error}`)
 }
}


