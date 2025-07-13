"use client"

import { useState } from "react"
import axios from "../axiosConfig"
import mail from "./assets/mail.png"
import nam from "./assets/name.png"
import pass from "./assets/password.png"
import "./AuthForm.css"

const AuthForm = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login"
      const payload = isSignup ? { email, password, name } : { email, password }

      const res = await axios.post(endpoint, payload)

      const { token, user } = res.data
      localStorage.setItem("token", token)
      onAuthSuccess(user)
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="text-center mb-6 head">
        <h2 className="underline underline-offset-4">{isSignup ? "Sign Up" : "Log In"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div className="inputs">
            <div className="input">
              <img src={nam || "/placeholder.svg"} alt="Name icon" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                className="w-full"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="inputs">
          <div className="input">
            <img src={mail || "/placeholder.svg"} alt="Mail icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={pass || "/placeholder.svg"} alt="Password icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <div className="button-container">
          <button type="submit" className="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {isSignup ? "Signing Up..." : "Logging In..."}
              </div>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </form>

      <p className="text-sm mt-4 text-center text-blue-500">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => setIsSignup(!isSignup)}
          disabled={loading}
        >
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  )
}

export default AuthForm
