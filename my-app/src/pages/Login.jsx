import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from "../../context/AuthContext";
 // Adjust the path if needed

const Login = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [personalEmail, setPersonalEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

const {login}=useContext(AuthContext)


  const onSubmitHandler = (event) => {
    event.preventDefault()

    // Data shaped as per MongoDB schema
    const userData = {
      email: personalEmail,
      fullName,
      password,
      bio,
      profilePic,
    }

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

login(currState==="Sign up" ? "signup" : "login", {
      fullName, email: personalEmail, password, bio})

    if (currState === 'Sign up' && isDataSubmitted) {
      console.log("Sign Up Data Submitted:", userData)
      // send userData to backend
    } else {
      console.log("Login Data:", { email: personalEmail, password })
      // send login data to backend
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      {/* Left Logo */}
      <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)]' />

      {/* Form */}
      <div>
        <form 
          onSubmit={onSubmitHandler}
          className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'
        >
          <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          </h2>

          {/* Full Name */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none"
            />
          )}

          {/* Email & Password */}
          {!isDataSubmitted && (
            <>
              <input
                onChange={(e) => setPersonalEmail(e.target.value)}
                value={personalEmail}
                type="email"
                placeholder="Email Address"
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="p-2 border border-gray-500 rounded-md focus:outline-none"
              />
            </>
          )}

          {/* Bio and Profile Pic (after first submit) */}

{/* Bio and Profile Pic (after first submit) */}
{currState === "Sign up" && isDataSubmitted && (
  <>
    <textarea
      onChange={(e) => setBio(e.target.value)}
      value={bio}
      rows={3}
      placeholder="Short Bio"
      required
      className='p-2 border border-gray-500 rounded-md focus:outline-none'
    />

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfilePic(imageUrl); // You can send this URL to preview, or handle uploading
        }
      }}
      required
      className='p-2 border border-gray-500 rounded-md focus:outline-none text-white file:bg-violet-600 file:border-0 file:px-4 file:py-2 file:rounded-md file:text-white'
    />
  </>
)}

          
          {/* Submit */}
          <button
            type='submit'
            className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
          >
            {currState === "Sign up" ? (isDataSubmitted ? "Finish Signup" : "Next") : "Login Now"}
          </button>

          {/* Terms */}
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          {/* Switch Auth Mode */}
          <div className='text-sm text-gray-600'>
            {currState === "Sign up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login")
                    setIsDataSubmitted(false)
                  }}
                  className='font-medium text-violet-500 cursor-pointer'
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Sign up")
                    setIsDataSubmitted(false)
                  }}
                  className='font-medium text-violet-500 cursor-pointer'
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
