import StatCard from "../components/StatCard"
import RecentStudents from "../components/RecentStudents"

const stats = [
  {
    title: "Students",
    value: "1,250",
  },
  {
    title: "Teachers",
    value: "48",
  },
  {
    title: "Classes",
    value: "32",
  },
  {
    title: "Attendance",
    value: "94%",
  },
]

const Dashboard = ({ students }) => {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">        Dashboard
      </h1>

      <p className="mt-1 md:mt-2 text-slate-600">        Welcome back, Admin
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">        {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
      </div>

      <div className="mt-6">
        <RecentStudents />
      </div>
    </div>
  )
}

export default Dashboard