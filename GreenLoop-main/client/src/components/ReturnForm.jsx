"use client"

import { useState } from "react"
import { Package, Hash, Tag, MessageSquare, AlertCircle, Loader2 } from "lucide-react"
import instance from "../axiosConfig"
import Toast from "./Toast"
import "./ReturnForm.css"

const ReturnForm = () => {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    productCategory: "",
    returnReason: "",
    condition: "",
  })

  const categories = ["Grocery", "Electronics", "Home & Kitchen", "Toys", "Clothing"]
  const conditions = ["Good", "Moderate", "Damaged"]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required"
    }

    if (!formData.productId.trim()) {
      newErrors.productId = "Product ID is required"
    }

    if (!formData.productCategory) {
      newErrors.productCategory = "Product category is required"
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setToast({
        show: true,
        message: "Please fill in all required fields",
        type: "error",
      })
      return
    }

    setLoading(true)

    try {
      const submitData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      }

      const response = await instance.post("/api/return", submitData)

      if (response.data.success) {
        setToast({
          show: true,
          message: response.data.message || "Return submitted successfully!",
          type: "success",
        })

        // Reset form
        setFormData({
          productName: "",
          productId: "",
          productCategory: "",
          returnReason: "",
          condition: "",
        })
        setErrors({})
      } else {
        setToast({
          show: true,
          message: response.data.message || "Failed to submit return",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Error submitting return:", error)
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to submit return. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" })
  }

  return (
    <div className="min-h-screen  bg-gray-50">
      {/* Header */}
      <div className="mar bg-gradient-to-r from-teal-500 to-teal-700 h-14 flex items-center justify-center">
        <h1 className="txt text-white">Returns Intake Form</h1>
      </div>
      {/* Form Container - Centered with increased width */}
      <div className="flex form-card items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-20">
            {/* Product Name */}
            <div className="fields-grid">
              <div className="mar space-y-5">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-teal-600" />
                  <label className="text-xl text-gray-800">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-6 h-10 text-xl border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.productName
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-300 bg-white focus:border-teal-500 shadow-sm hover:shadow-md"
                    }`}
                  placeholder="Enter product name"
                />
                {errors.productName && (
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-base font-medium">{errors.productName}</span>
                  </div>
                )}
              </div>

              {/* Product ID */}
              <div className="mar space-y-5">
                <div className="flex items-center gap-4">
                  <Hash className="h-8 w-8 text-teal-600" />
                  <label className="text-xl text-gray-800">
                    Product ID <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  className={`w-full px-6 h-10 py-6 text-xl border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.productId
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-300 bg-white focus:border-teal-500 shadow-sm hover:shadow-md"
                    }`}
                  placeholder="Enter product ID"
                />
                {errors.productId && (
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-base font-medium">{errors.productId}</span>
                  </div>
                )}
              </div>
            </div>


            {/* Product Category */}
            <div className="mar space-y-5">
              <div className="flex items-center gap-4">
                <Tag className="h-8 w-8 text-teal-600" />
                <label className="text-xl text-gray-800">
                  Product Category <span className="text-red-500">*</span>
                </label>
              </div>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className={`w-full h-10 px-6 py-6 text-xl border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-200 bg-white ${errors.productCategory
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-300 focus:border-teal-500 shadow-sm hover:shadow-md"
                  }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.productCategory && (
                <div className="flex items-center gap-3 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-base font-medium">{errors.productCategory}</span>
                </div>
              )}
            </div>

            {/* Return Reason */}
            <div className="mar space-y-5">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-teal-600" />
                <label className="text-xl text-gray-800">Return Reason</label>
              </div>
              <textarea
                name="returnReason"
                value={formData.returnReason}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-6 py-6 text-xl border-2 border-gray-300 bg-white rounded-2xl focus:outline-none focus:ring-0 focus:border-teal-500 transition-all duration-200 resize-none shadow-sm hover:shadow-md"
                placeholder="Describe the reason for return (optional)"
              />
            </div>

            {/* Condition */}
            <div className="mar space-y-8">
              <div className="flex items-center gap-4 mar2">
                <AlertCircle className="h-8 w-8 text-teal-600" />
                <label className="text-xl text-gray-800">
                  Condition <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {conditions.map((condition) => (
                  <label
                    key={condition}
                    className={`flex h-7.5 items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${formData.condition === condition
                        ? "border-teal-500 bg-teal-50 text-teal-700 shadow-lg"
                        : "border-gray-300 bg-white hover:border-teal-300 hover:bg-teal-25 shadow-sm hover:shadow-md"
                      }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={condition}
                      checked={formData.condition === condition}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-[18px]">{condition}</span>
                  </label>
                ))}
              </div>
              {errors.condition && (
                <div className="flex items-center gap-3 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-base font-medium">{errors.condition}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-12 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-44 h-10 btn-submit flex justify-center txt2 items-center text-2xl font-bold text-white bg-teal-600 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200 shadow-lg hover:shadow-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-4 h-7 w-7" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={hideToast} />
    </div>
  )
}

export default ReturnForm
