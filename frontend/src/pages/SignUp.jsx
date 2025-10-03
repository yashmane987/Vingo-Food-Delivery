import axios from "axios";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const[fullName,setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[mobileNo,setMobileNo]=useState("");
  const[password,setPassword]=useState("");   

  const handleSignUp=async()=>{
    try {
      const result =await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName,email,mobileNo,password,role
      },{withCredentials:true});
      console.log(result)
    } catch (error) {
      console.log("Error while signup ",error);
    }
  }
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded xl shadow-lg w-full max-w-md p-8 border[1px] `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 `}
          style={{ color: primaryColor }}
        >
          EatUp
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* fullName */}

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Full Name"
            style={{ border: `1px solid ${borderColor}`  }} onChange={(e)=>setFullName(e.target.value) }
             value={fullName}  />
        </div>

        {/* Email */}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter Your Email here"
            style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value) } value={email}
          />
        </div>
        {/* mobile */}

        <div className="mb-4">
          <label
            htmlFor="mobileNo"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile Number
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Mobile Number"
            style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setMobileNo(e.target.value) } value={mobileNo} 
          />
        </div>

        {/* Password */}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password{" "}
          </label>
          <div className="relative">
            <input
              type={!showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter Your Password"
              style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value) } value={password}
            />
            {/* role */}

            <div className="mb-4 mt-4">
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-1"
              >
                Role
              </label>
              <div className="flex gap-2">
                {["user", "owener", "deliveryBoy"].map((r) => (
                  <button
                    className="flex-1 border rounded-lg px-3 py-2 text-center font-medium  transition-colors cursor-pointer"
                    onClick={() => setRole(r)}
                    style={
                      role == r
                        ? { backgroundColor: primaryColor, color: "#fff" }
                        : {
                            border: `1px solid ${primaryColor}`,
                            color: primaryColor,
                          }
                    }
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="absolute right-3 cursor-pointer top-[14px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {" "}
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
       onClick={handleSignUp} >
          Sign Up
        </button>
        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 text-black hover:bg-[#f7f7f7] cursor-pointer' style={{border:`1px solid ${borderColor}`}}>
< FcGoogle size={20}/>
<span>Sign Up with Google</span>
        </button>
        <p className="text-center mt-6 cursor-pointer" onClick={()=>navigate('/signin')}>Already have an account ? <span className="text-[#ff4d2d]">Sign In</span></p>
      </div>
    </div>
  );
};

export default SignUp;
