"use client"

import { useState } from "react"
import { X, Edit3, Check, Loader2 } from "lucide-react"
import "./AuthForm.css"
const InventoryTable = ({ category, items, loading, onClose, onUpdateRoute }) => {
  const [editingItem, setEditingItem] = useState(null)
  const [editRoute, setEditRoute] = useState("")
  const [updating, setUpdating] = useState({})

  const getConditionBadge = (condition) => {
    const badges = {
      Good: "bg-green-100 text-green-800 border-green-200",
      Moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Damaged: "bg-red-100 text-red-800 border-red-200",
    }
    return badges[condition] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getRouteBadge = (route) => {
    const badges = {
      Resale: "bg-purple-100 text-purple-800 border-purple-200",
      Refurbish: "bg-blue-100 text-blue-800 border-blue-200",
      Donate: "bg-green-100 text-green-800 border-green-200",
      Recycle: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return badges[route] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleEditRoute = (item) => {
    setEditingItem(item.id)
    setEditRoute(item.route)
  }

  const handleSaveRoute = async (itemId) => {
    try {
      setUpdating((prev) => ({ ...prev, [itemId]: true }))
      await onUpdateRoute(itemId, editRoute)
      setEditingItem(null)
      setEditRoute("")
    } catch (error) {
      console.error("Failed to update route:", error)
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  return (
    <div className="bg-white tab rounded-lg shadow-sm border overflow-hidden animate-in slide-in-from-top-2 duration-300">
      {/* Table Header */}
      <div className={`h-10 bg-gradient-to-r ${category.color} px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <category.icon className="w-5 h-5 text-white" />
          <h3 className=" text-white">{category.name} - Recent Items</h3>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="px-6 py-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-gray-500">Loading items...</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">No items match the current filters</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">ID: {item.productId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getConditionBadge(item.condition)}`}
                    >
                      {item.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem === item.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={editRoute}
                          onChange={(e) => setEditRoute(e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          disabled={updating[item.id]}
                        >
                          <option value="Resale">Resale</option>
                          <option value="Refurbish">Refurbish</option>
                          <option value="Donate">Donate</option>
                          <option value="Recycle">Recycle</option>
                        </select>
                        <button
                          onClick={() => handleSaveRoute(item.id)}
                          disabled={updating[item.id]}
                          className="text-green-600 hover:text-green-800 p-1 disabled:opacity-50"
                        >
                          {updating[item.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          disabled={updating[item.id]}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRouteBadge(item.route)}`}
                      >
                        {item.route}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditRoute(item)}
                        disabled={updating[item.id] || editingItem === item.id}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors disabled:opacity-50"
                        title="Edit Route"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Footer */}
      {!loading && items.length > 0 && (
        <div className="bg-gray-50 px-6 py-3 border-t">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Showing {items.length} items</span>
            <span>Last updated: {formatDate(new Date().toISOString())}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryTable
