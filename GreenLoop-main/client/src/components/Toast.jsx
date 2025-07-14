"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

const Toast = ({ message, type = "success", isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"
  const Icon = type === "success" ? CheckCircle : XCircle

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
