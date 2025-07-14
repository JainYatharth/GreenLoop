"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Home, Package, RotateCcw, LogOut } from "lucide-react"
import instance from "../axiosConfig.js"
import "./AuthForm.css"
const Navbar = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      // Call logout API to invalidate token on server
      await instance.post("/api/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear user state and redirect
      setUser(null)
      navigate("/")
    }
  }

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/return", label: "Returns", icon: RotateCcw },
    { path: "/inventory", label: "Inventory", icon: Package },
  ]

  return (
    <nav className="bg-white text-xl shadow-sm border-b">
      <div className="marg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">GreenLoop</h1>

          <div className="flex items-center gap-15">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex  gap-2 px-3 py-2 border-b-2 transition-all duration-200 ${isActive
                      ? " text-teal-700 font-semibold"
                      : "bg-grey-100 text-gray-600 hover:bg-gray-100 hover:text-teal-600"
                    }`}>

                  {item.label}
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
