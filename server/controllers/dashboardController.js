import Return from "../models/returnModel.js"

export const getDashboardData = async (req, res) => {
  try {
    const returns = await Return.find().lean()

    // Transform data to match frontend expectations
    const transformedData = returns.map((item) => ({
      id: item._id,
      productName: item.productName,
      productId: item.productId,
      category: item.category,
      productCategory: item.category,
      condition: item.condition,
      route: item.routeTo,
      routeTo: item.routeTo,
      returnReason: item.returnReason,
      date: item.date || item.createdAt,
      createdAt: item.createdAt,
    }))

    res.json(transformedData)
  } catch (error) {
    console.error("Dashboard data fetch failed:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    })
  }
}
