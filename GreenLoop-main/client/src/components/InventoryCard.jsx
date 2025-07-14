"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

const InventoryCard = ({ category, isExpanded, onClick }) => {
  const IconComponent = category.icon

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        isExpanded ? " shadow-lg" : ""
      }`}
    >
      {/* Gradient Header
      <div className={`h-2 bg-gradient-to-r ${category.color} rounded-t-lg`}></div> */}

      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-10`}>
              <IconComponent className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-teal-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Items</span>
            <span className="font-semibold text-gray-900">{category.totalItems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Resale Eligible</span>
            <span className="font-semibold text-green-600">{category.resaleEligible}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Resale Rate</span>
              <span>{Math.round((category.resaleEligible / category.totalItems) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${(category.resaleEligible / category.totalItems) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryCard
