import Return from "../models/returnModel.js"

// Category mapping
const categoryMapping = {
  electronics: "Electronics",
  clothing: "Clothing",
  "home-kitchen": "Home & Kitchen",
  toys: "Toys",
  groceries: "Grocery",
}

// GET /api/inventory/categories/:categoryId/items
export const getCategoryItems = async (req, res) => {
  try {
    const { categoryId } = req.params
    const { condition, route } = req.query

    // Map frontend category ID to backend category name
    const categoryName = categoryMapping[categoryId] || categoryId

    const query = { category: categoryName }

    if (condition && condition !== "all") {
      query.condition = new RegExp(`^${condition}$`, "i")
    }

    if (route && route !== "all") {
      query.routeTo = new RegExp(`^${route}$`, "i")
    }

    const items = await Return.find(query).sort({ createdAt: -1 }).lean()

    // Transform data to match frontend expectations
    const transformedItems = items.map((item) => ({
      id: item._id,
      productName: item.productName,
      productId: item.productId,
      condition: item.condition,
      route: item.routeTo,
      routeTo: item.routeTo,
      date: item.date || item.createdAt,
      createdAt: item.createdAt,
      category: item.category,
    }))

    res.json(transformedItems)
  } catch (error) {
    console.error("Error fetching inventory items:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message,
    })
  }
}

// PUT /api/inventory/items/:itemId/route
export const updateItemRoute = async (req, res) => {
  try {
    const { itemId } = req.params
    const { route } = req.body

    if (!route) {
      return res.status(400).json({ success: false, message: "Route is required" })
    }

    const allowedRoutes = ["Resale", "Refurbish", "Recycle", "Donate", "Discard"]
    if (!allowedRoutes.includes(route)) {
      return res.status(400).json({ success: false, message: "Invalid route" })
    }

    const item = await Return.findByIdAndUpdate(itemId, { routeTo: route }, { new: true })

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" })
    }

    res.json({ success: true, message: "Route updated successfully", item })
  } catch (error) {
    console.error("Error updating item route:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update route",
      error: error.message,
    })
  }
}
