import "./AuthForm.css"
// 1. Import your SVG (adjust the path)
import Logo from "../components/assets/logo.svg"

const AuthNavbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* 2. Render your logo instead of the text */}
            <img src={Logo} alt="GreenLoop Logo" className="logo" />
          </div>
          <div className="text-xl marg text-gray-600">
            Sustainable Returns Management
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthNavbar
