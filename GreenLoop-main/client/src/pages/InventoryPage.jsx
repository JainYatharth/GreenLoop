"use client"

import { useState, useEffect } from "react"
import { Package, Shirt, Home, Gamepad2, ShoppingCart, Filter, Loader2 } from "lucide-react"
import InventoryCard from "../components/InventoryCard"
import InventoryTable from "../components/InventoryTable"
import Navbar from "../components/Navbar"
import instance from "../axiosConfig"

const InventoryPage = () => {
  const [categories, setCategories] = useState([])
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [conditionFilter, setConditionFilter] = useState("all")
  const [routeFilter, setRouteFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [categoryItems, setCategoryItems] = useState({})
  const [loadingItems, setLoadingItems] = useState({})
  const [error, setError] = useState(null)

  // Hardcoded categories with icons and colors
  const hardcodedCategories = [
    { id: "electronics", name: "Electronics", icon: Package, color: "from-blue-500 to-blue-600" },
    { id: "clothing", name: "Clothing", icon: Shirt, color: "from-pink-500 to-pink-600" },
    { id: "home-kitchen", name: "Home & Kitchen", icon: Home, color: "from-green-500 to-green-600" },
    { id: "toys", name: "Toys", icon: Gamepad2, color: "from-yellow-500 to-yellow-600" },
    { id: "groceries", name: "Groceries", icon: ShoppingCart, color: "from-orange-500 to-orange-600" },
  ]

  useEffect(() => {
    fetchCategoriesSummary()
  }, [])

  const fetchCategoriesSummary = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch data for all categories
      const categoryPromises = hardcodedCategories.map(async (category) => {
        try {
          const response = await instance.get(`/api/inventory/categories/${category.id}/items`)
          const items = response.data

          const totalItems = items.length
          const resaleEligible = items.filter(
            (item) => item.route?.toLowerCase() === "resale" || item.condition?.toLowerCase() === "good",
          ).length

          return {
            ...category,
            totalItems,
            resaleEligible,
          }
        } catch (error) {
          console.error(`Error fetching data for ${category.name}:`, error)
          return {
            ...category,
            totalItems: 0,
            resaleEligible: 0,
          }
        }
      })

      const categoriesWithData = await Promise.all(categoryPromises)
      setCategories(categoriesWithData)
    } catch (error) {
      console.error("Error fetching categories summary:", error)
      setError("Failed to load inventory data")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategoryItems = async (categoryId) => {
    try {
      setLoadingItems((prev) => ({ ...prev, [categoryId]: true }))
      const params = new URLSearchParams()
      if (conditionFilter !== "all") params.append("condition", conditionFilter)
      if (routeFilter !== "all") params.append("route", routeFilter)

      const response = await instance.get(`/api/inventory/categories/${categoryId}/items?${params}`)
      setCategoryItems((prev) => ({ ...prev, [categoryId]: response.data }))
    } catch (error) {
      console.error("Error fetching category items:", error)
    } finally {
      setLoadingItems((prev) => ({ ...prev, [categoryId]: false }))
    }
  }

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
      fetchCategoryItems(categoryId)
    }
  }

  // Refetch items when filters change
  useEffect(() => {
    if (expandedCategory) {
      fetchCategoryItems(expandedCategory)
    }
  }, [conditionFilter, routeFilter, expandedCategory])

  const handleUpdateRoute = async (itemId, newRoute) => {
    try {
      await instance.put(`/api/inventory/items/${itemId}/route`, { route: newRoute })
      // Refresh the current category items
      if (expandedCategory) {
        fetchCategoryItems(expandedCategory)
      }
      // Refresh categories summary to update stats
      fetchCategoriesSummary()
    } catch (error) {
      console.error("Error updating route:", error)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            <span className="text-gray-600">Loading inventory data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={fetchCategoriesSummary}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Page Title */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 h-14 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="txt font-bold text-white">Inventory Tracker</h1>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mar space-y-5">
          <div className="flex  items-center gap-4">
            <Filter className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent"
              >
                <option value="all">All Conditions</option>
                <option value="good">Good</option>
                <option value="moderate">Moderate</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Route</label>
              <select
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent"
              >
                <option value="all">All Routes</option>
                <option value="resale">Resale</option>
                <option value="refurbish">Refurbish</option>
                <option value="donate">Donate</option>
                <option value="recycle">Recycle</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <InventoryCard
              key={category.id}
              category={category}
              isExpanded={expandedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        {/* Expanded Table */}
        {expandedCategory && (
          <div className="mb-8">
            {categories
              .filter((cat) => cat.id === expandedCategory)
              .map((category) => (
                <InventoryTable
                  key={category.id}
                  category={category}
                  items={categoryItems[expandedCategory] || []}
                  loading={loadingItems[expandedCategory]}
                  onClose={() => setExpandedCategory(null)}
                  onUpdateRoute={handleUpdateRoute}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InventoryPage
