"use client"

import AuthForm from "../components/AuthForm"
import AuthNavbar from "../components/AuthNavbar"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAuthSuccess = (user) => {
    setUser(user)
    navigate("/dashboard")
  }

  return (
    <div>
      <AuthNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900">
        <div className="bg-white px-10 py-8 rounded-xl shadow-lg w-full max-w-md">
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
