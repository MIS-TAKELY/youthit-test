import { FaBell, FaUserCircle } from "react-icons/fa"

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-gray-600 text-3xl" />
          <span className="hidden md:block text-gray-700">Admin</span>
        </div>
      </div>
    </div>
  )
}

export default Header