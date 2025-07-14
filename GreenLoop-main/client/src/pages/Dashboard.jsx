"use client"

import ImpactDashboard from "../components/ImpactDashboard"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="h-[calc(100vh-4rem)]">
        <ImpactDashboard />
      </main>
    </div>
  )
}

export default Dashboard
