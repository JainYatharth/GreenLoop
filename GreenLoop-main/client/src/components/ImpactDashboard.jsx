"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Leaf, Recycle, RotateCcw, ShoppingBag, Heart, Loader2, Target } from "lucide-react"
import instance from "../axiosConfig"
import "./AuthForm.css"

const ImpactDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // CO₂ multipliers (kg saved per item) - hardcoded as requested
  const co2Multipliers = {
    resale: 2,
    refurbish: 1.5,
    recycle: 1,
    donate: 0.5,
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
        acc[category] = { resale: 0, refurbish: 0, recycle: 0, donate: 0 }
      }
      const route = (item.route || item.routeTo || "").toLowerCase()
      if (route === "resale") acc[category].resale++
      else if (route === "refurbish") acc[category].refurbish++
      else if (route === "recycle") acc[category].recycle++
      else if (route === "donate") acc[category].donate++
      return acc
    }, {})

    // Convert categoryData object to array
    const categoryArray = Object.keys(categoryData).map((key) => ({ category: key, ...categoryData[key] }))

    // Calculate distribution totals
    const distributionData = categoryArray.reduce(
      (acc, category) => {
        acc.resale += category.resale
        acc.refurbish += category.refurbish
        acc.recycle += category.recycle
        acc.donate += category.donate
        return acc
      },
      { resale: 0, refurbish: 0, recycle: 0, donate: 0 },
    )

    // Calculate CO₂ saved by category
    const co2Data = categoryArray.map((category) => ({
      category: category.category,
      co2Saved: (
        category.resale * co2Multipliers.resale +
        category.refurbish * co2Multipliers.refurbish +
        category.recycle * co2Multipliers.recycle +
        category.donate * co2Multipliers.donate
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
      donate: totalProcessed > 0 ? ((distributionData.donate / totalProcessed) * 100).toFixed(1) : 0,
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
      { name: "Donate", value: dashboardData.distributionData.donate, color: "#ef4444", icon: Heart },
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
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <span className="text-gray-600 text-lg">Loading dashboard data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={fetchDashboardData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-600">No data available</div>
      </div>
    )
  }

  return (
    <div className="h-full p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-11 h-full">
        {/* Welcome Card - Top Left (Large) */}
        <div className="col-span-8 cardm row-span-5 bg-gradient-to-br from-green-300 to-teal-300 rounded-2xl p-8 text-white relative overflow-hidden">
          <div
            className="absolute  inset-0 opacity-80 bg-cover bg-center"
            style={{ backgroundImage: "url('https://media.istockphoto.com/id/469538141/photo/plant-sprouting-from-the-dirt-with-a-blurred-background.jpg?s=612x612&w=0&k=20&c=uc-WaLHzRlsrBsHrTVO4fEqRqPjkh-MHtlGLj-QWI64=')",
              backgroundPosition: "center -85%"
             }}
          ></div>

          <div className="relative leaf z-10">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8" />
              <h1 className="font-bold">Impact Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-170 stat">
              <div>
                <div className="text-7xl font-bold">{dashboardData.totalItems}</div>
                <div className="text-green-200">Items Processed</div>
              </div>
              <div>
                <div className="text-7xl font-bold">{dashboardData.totalCo2Saved.toFixed(1)} kg</div>
                <div className="text-green-200">CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card - Top Right */}
        <div className="col-span-4 cardm row-span-5 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-80 bg-cover bg-center"
            style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1675127366598-f6c344e5233b?q=80&w=1116&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 leaf h-6" />
              <h1 className="text-xl font-semibold">This Month</h1>
            </div>
            <div className="space-y-4">
              <div className="statm">
                <div className="text-4xl font-bold">{dashboardData.percentages.resale}%</div>
                <div className="text-blue-200 text-xl text-sm">Resale Rate</div>
              </div>
              <div className="statm">
                <div className="text-4xl font-bold">{Math.round(dashboardData.totalCo2Saved / 4.6)}</div>
                <div className="text-blue-200 text-xl text-sm">Car-free Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Chart - Middle Left */}
        <div className="col-span-6 cardm row-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl text-gray-900 mb-6">Return Outcomes Distribution</h3>
          <div className="flex items-center gap-6 h-full">
            <div className="flex-1">
              <ResponsiveContainer width="110%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
            <div className="flex-1 space-y-3">
              {pieData.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="p-2 rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                      <IconComponent className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-xl text-gray-900">{item.name}</div>
                      <div className="text-m text-gray-500">{item.value} items</div>
                    </div>
                    <div className="font-bold text-xl text-gray-900">{dashboardData.percentages[item.name.toLowerCase()]}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CO₂ Chart - Middle Right */}
        <div className="col-span-6 cardm row-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">CO₂ Saved by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboardData.co2Data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: "CO₂ Saved(kg)", angle: -90, position: "insideLeft", offset: 10,style: { textAnchor: 'middle'} }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="co2Saved" fill="#10b981" radius={[4, 4, 0, 0]} name="co2Saved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Environmental Impact Summary - Bottom */}
        <div className="col-span-12  row-span-1 bg-teal-50 rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center h-full justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Total Environmental Impact</h4>
                <p className="text-gray-600">Making a difference through sustainable returns processing</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImpactDashboard
