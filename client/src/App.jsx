import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ReturnsPage from "./pages/ReturnsPage.jsx"
import InventoryPage from "./pages/InventoryPage.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/return" element={<ReturnsPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  )
}

export default App
