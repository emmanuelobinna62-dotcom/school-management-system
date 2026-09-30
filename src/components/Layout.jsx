import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout