

const StatCard = ({ title, value }) => {


  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">      <p className="text-slate-500">{title}</p>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
        {value}
      </h2>    </div>
  )
}

export default StatCard