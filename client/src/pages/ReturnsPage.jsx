"use client"
import ReturnForm from "../components/ReturnForm.jsx"

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 flex w-full">GreenLoopX</h1>
            </div>
    
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Welcome</span>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  
                </div>
              </div>
            
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main>
        <ReturnForm />
      </main>
    </div>
  )
}

export default ReturnsPage
