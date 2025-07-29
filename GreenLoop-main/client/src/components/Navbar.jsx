"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Home, Package, RotateCcw, LogOut } from "lucide-react"
import instance from "../axiosConfig.js"
import "./AuthForm.css"
import Logo from "../components/assets/logo.svg"

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
            <img src={Logo} alt="GreenLoop Logo" className="logo" />

          <div className="flex items-center gap-15">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navb${isActive ? ' active' : ''}`}>

                  {item.label}
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 logout"
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
