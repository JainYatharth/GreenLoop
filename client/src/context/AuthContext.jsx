"use client"

import { createContext, useState, useEffect } from "react"
import instance from "../axiosConfig"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verifyToken()
  }, [])

  const verifyToken = async () => {
    try {
      const response = await instance.get("/api/auth/verify-token")
      if (response.data.success) {
        setUser(response.data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Token verification failed:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
