import "./AuthForm.css"
const AuthNavbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between px-6 py-4 items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">GreenLoop</h1>
          </div>
          <div  className="text-sm navtext text-gray-600">Sustainable Returns Management</div>
        </div>
      </div>
    </header>
  )
}

export default AuthNavbar
