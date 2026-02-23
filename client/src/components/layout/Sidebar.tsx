import { NavLink } from "react-router-dom"
import { FaHome, FaBoxOpen, FaUsers } from "react-icons/fa"

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
    { name: "Users", icon: <FaUsers />, path: "/dashboard/users" },
  ]
  
  return (
    <div className="w-64 bg-white h-screen shadow-md p-5 flex flex-col">
      <h1 className="text-xl font-bold text-indigo-600 mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-100 transition ${
                isActive ? "bg-indigo-100 font-semibold" : "text-gray-700"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar