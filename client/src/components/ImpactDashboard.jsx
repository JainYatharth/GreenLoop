"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Leaf, Recycle, RotateCcw, ShoppingBag, Trash2, Loader2 } from "lucide-react"
import instance from "../axiosConfig"

const ImpactDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // CO₂ multipliers (kg saved per item) - hardcoded as requested
  const co2Multipliers = {
    resale: 2,
    refurbish: 1.5,
    recycle: 1,
    discard: 0,
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await instance.get("/api/dashboard/data")

      // Process the raw data to calculate all dashboard metrics
      const processedData = processRawData(response.data)
      setDashboardData(processedData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const processRawData = (rawData) => {
    // Calculate totals
    const totalItems = rawData.length

    // Group by category and route
    const categoryData = rawData.reduce((acc, item) => {
      const category = item.category || item.productCategory
      if (!acc[category]) {
        acc[category] = { resale: 0, refurbish: 0, recycle: 0, discard: 0 }
      }
      const route = (item.route || item.routeTo || "").toLowerCase()
      if (route === "resale") acc[category].resale++
      else if (route === "refurbish") acc[category].refurbish++
      else if (route === "recycle") acc[category].recycle++
      else if (route === "discard") acc[category].discard++
      return acc
    }, {})

    // Convert to array format for charts
    const categoryArray = Object.entries(categoryData).map(([category, routes]) => ({
      category,
      ...routes,
    }))

    // Calculate distribution totals
    const distributionData = categoryArray.reduce(
      (acc, category) => {
        acc.resale += category.resale
        acc.refurbish += category.refurbish
        acc.recycle += category.recycle
        acc.discard += category.discard
        return acc
      },
      { resale: 0, refurbish: 0, recycle: 0, discard: 0 },
    )

    // Calculate CO₂ saved by category
    const co2Data = categoryArray.map((category) => ({
      category: category.category,
      co2Saved: (
        category.resale * co2Multipliers.resale +
        category.refurbish * co2Multipliers.refurbish +
        category.recycle * co2Multipliers.recycle +
        category.discard * co2Multipliers.discard
      ).toFixed(1),
    }))

    // Calculate total CO₂ saved
    const totalCo2Saved = co2Data.reduce((sum, item) => sum + Number.parseFloat(item.co2Saved), 0)

    // Calculate percentages
    const totalProcessed = Object.values(distributionData).reduce((sum, val) => sum + val, 0)
    const percentages = {
      resale: totalProcessed > 0 ? ((distributionData.resale / totalProcessed) * 100).toFixed(1) : 0,
      refurbish: totalProcessed > 0 ? ((distributionData.refurbish / totalProcessed) * 100).toFixed(1) : 0,
      recycle: totalProcessed > 0 ? ((distributionData.recycle / totalProcessed) * 100).toFixed(1) : 0,
      discard: totalProcessed > 0 ? ((distributionData.discard / totalProcessed) * 100).toFixed(1) : 0,
    }

    return {
      totalItems,
      categoryData: categoryArray,
      distributionData,
      co2Data,
      totalCo2Saved,
      percentages,
    }
  }

  // Prepare pie chart data
  const pieData = dashboardData
    ? [
        { name: "Resale", value: dashboardData.distributionData.resale, color: "#10b981", icon: ShoppingBag },
        { name: "Refurbish", value: dashboardData.distributionData.refurbish, color: "#3b82f6", icon: RotateCcw },
        { name: "Recycle", value: dashboardData.distributionData.recycle, color: "#f59e0b", icon: Recycle },
        { name: "Discard", value: dashboardData.distributionData.discard, color: "#ef4444", icon: Trash2 },
      ]
    : []

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            {payload[0].name}: <span className="font-semibold">{payload[0].value}</span>
            {payload[0].name === "co2Saved" ? " kg CO₂" : " items"}
          </p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex items-center justify-center min-h-96">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="text-gray-600 text-lg">Loading dashboard data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={fetchDashboardData}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex items-center justify-center min-h-96">
        <div className="text-gray-600">No data available</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Leaf className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Impact Dashboard</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Tracking our environmental impact through sustainable returns processing
        </p>
      </div>

      {/* Total Items Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Recycle className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Total Items Returned</h2>
            <p className="text-gray-600">Processed this month</p>
          </div>
        </div>
        <div className="text-6xl font-bold text-purple-600 mb-2">{dashboardData.totalItems}</div>
        <div className="text-lg text-gray-500">items processed sustainably</div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Return Outcomes Distribution</h3>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-2/3">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/3 space-y-3">
              {pieData.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="p-2 rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                      <IconComponent className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.value} items</div>
                    </div>
                    <div className="font-bold text-gray-900">{dashboardData.percentages[item.name.toLowerCase()]}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CO₂ Saved Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">CO₂ Saved by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.co2Data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: "CO₂ Saved (kg)", angle: -90, position: "insideLeft" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="co2Saved" fill="#10b981" radius={[4, 4, 0, 0]} name="co2Saved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sustainability Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Outcome Percentages */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">Resale</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{dashboardData.percentages.resale}%</div>
            <div className="text-sm text-gray-500">{dashboardData.distributionData.resale} items</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Refurbish</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{dashboardData.percentages.refurbish}%</div>
            <div className="text-sm text-gray-500">{dashboardData.distributionData.refurbish} items</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Recycle className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-900">Recycle</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{dashboardData.percentages.recycle}%</div>
            <div className="text-sm text-gray-500">{dashboardData.distributionData.recycle} items</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-900">Discard</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{dashboardData.percentages.discard}%</div>
            <div className="text-sm text-gray-500">{dashboardData.distributionData.discard} items</div>
          </div>
        </div>

        {/* Total CO₂ Impact */}
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h4 className="text-xl font-bold text-gray-900">Total Environmental Impact</h4>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">{dashboardData.totalCo2Saved.toFixed(1)} kg</div>
          <div className="text-lg text-gray-600 mb-4">CO₂ emissions saved this month</div>
          <div className="text-sm text-gray-500">
            Equivalent to removing a car from the road for {Math.round(dashboardData.totalCo2Saved / 4.6)} days*
          </div>
          <div className="text-xs text-gray-400 mt-2">*Based on average car emissions of 4.6 kg CO₂ per day</div>
        </div>
      </div>
    </div>
  )
}

export default ImpactDashboard
