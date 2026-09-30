import { NavLink } from "react-router-dom"

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Students",
    path: "/students",
  },
  {
    name: "Teachers",
    path: "/teachers",
  },
  {
    name: "Classes",
    path: "/classes",
  },
  {
    name: "Attendance",
    path: "/attendance",
  },
]

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 min-h-0 md:min-h-screen bg-slate-900 text-white p-4 md:p-6">
      <h1 className="text-xl font-bold mb-6 md:mb-8">
       BayField School Management System
      </h1>

      <nav className="flex gap-2 overflow-x-auto md:flex-col md:space-y-2 md:gap-0">
        {menuItems.map((menuItem) => (
          <NavLink
            key={menuItem.name}
            to={menuItem.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {menuItem.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar