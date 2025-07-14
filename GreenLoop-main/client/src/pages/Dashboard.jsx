"use client"

import ImpactDashboard from "../components/ImpactDashboard"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <ImpactDashboard />
      </main>
    </div>
  )
}

export default Dashboard
