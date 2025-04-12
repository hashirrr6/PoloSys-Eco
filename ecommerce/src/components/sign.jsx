import React from "react";
import SignupImg from "../assets/signin.png"; // You might want to use a different image
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Target } from "lucide-react";

const SignUp = () => {
  const Navigate=useNavigate()
  const [password, setPassword] = useState('');
    const [email,setEmail]=useState("")
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

const validate=()=>{
  if(email&&password){
  if(password===confirmPassword){
    alert("Succesfully Created")
    setTimeout(() => {
      Navigate("/login")
      
    }, 2000);
  }else{
    alert("Password Miss match")
    setPassword("");
    setConfirmPassword("");
  }
}else {
  alert("Please fill in all fields");
}
}


  return (
    <div className="flex min-h-screen items-center justify-center p-8 ">
      <div
        className="grid w-full h-180  max-w-6xl grid-cols-1 overflow-hidden rounded-3xl shadow-lg md:grid-cols-2"
        style={{
          boxShadow: `
            0 -4px 6px -1px rgba(0, 0, 0, 0.1),
            0 10px 15px -3px rgba(0, 0, 0, 0.1)
          `
        }}
      >
        {/* Left Column - Form */}
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <motion.img
                src={Logo}
                alt="Logo"
                className="w-38 h-15 filter invert sepia saturate-[4000%] hue-rotate-[-20deg] brightness-[0.6]"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            </div>

            <h1 className="mb-6 text-center text-3xl font-bold text-red-900">Create Account</h1>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-md bg-red-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                  className="w-full rounded-md bg-red-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md bg-red-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {password && (
                  <span
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={togglePassword}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                )}
              </div>

              <div className="relative w-full mt-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full rounded-md bg-red-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {confirmPassword && (
                  <span
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </span>
                )}
              </div>


              <button className="w-full rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={validate}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center space-x-4">
              <button className="rounded-full p-2 text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </button>

              <button className="rounded-full p-2 text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
                </svg>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-red-600">
              Already have an account? <Link to="/login" className="font-medium text-red-600 hover:text-red-900 hover:underline">Log in</Link>
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="h-full w-full">
          <img
            src={SignupImg}
            alt="Signup visual"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;