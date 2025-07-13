"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Home, Package, RotateCcw, LogOut } from "lucide-react"

const Navbar = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      // Call logout API to invalidate token on server
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage and redirect regardless of API call result
      localStorage.removeItem("token")
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
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-900">GreenLoopX</h1>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
