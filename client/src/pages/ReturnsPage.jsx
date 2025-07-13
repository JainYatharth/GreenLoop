"use client"
import ReturnForm from "../components/ReturnForm.jsx"
import Navbar from "../components/Navbar"

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ReturnForm />
      </main>
    </div>
  )
}

export default ReturnsPage
