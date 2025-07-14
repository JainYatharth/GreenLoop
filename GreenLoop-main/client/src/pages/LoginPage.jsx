"use client"

import AuthForm from "../components/AuthForm"
import AuthNavbar from "../components/AuthNavbar"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import leftimg from "../components/assets/auth-left.avif"
import "../components/AuthForm.css"
const LoginPage = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAuthSuccess = (user) => {
    setUser(user)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthNavbar />
      <link href="'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'" rel="stylesheet" />
      <div className="flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl lcard  w-full max-w-6xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Section - Image and Slogan */}
            <div className="relative w-full min-h-[300px] lg:min-h-full">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${leftimg})`
              }}
            />
            
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900/70 to-emerald-800/90" />
            
            {/* Content Overlay */}
            <div className="relative h-full z-10 flex flex-col justify-center items-center text-center">
              
              
              {/* Main Slogan */}
              <h1 className="text-5xl ltext lg:text-5xl font-bold text-white leading-tight">
                Close the Loop
                <p className="text-xl lg:text-2xl text-gray-200 font-medium">
                <span className="relative">
                  Open New Possibilities.
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded-full"></span>
                </span>
              </p>
              </h1>
              
              {/* Subtext with Green Underline */}
              
            </div>
              
              
            </div>

            {/* Right Section - Form */}
            <div className="flex items-center justify-center p-12">
              <div className="w-full max-w-md">
                <AuthForm onAuthSuccess={handleAuthSuccess} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
