
const students = [
  {
    id: 1,
    name: "John Doe",
    class: "JSS 2",
    gender: "Male",
  },
  {
    id: 2,
    name: "Sarah Williams",
    class: "SS 1",
    gender: "Female",
  },
  {
    id: 3,
    name: "Michael Johnson",
    class: "JSS 3",
    gender: "Male",
  },
  {
    id: 4,
    name: "Grace Anderson",
    class: "SS 2",
    gender: "Female",
  },
]


const RecentStudents = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm mt-8 p-4 md:p-6">      <h2 className="text-xl font-semibold text-slate-900">
      Recent Students
    </h2>

      <div className="mt-4 md:mt-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between border-b py-4 gap-4"          >
            <div className="min-w-0">
              <p className="font-medium text-slate-900 truncate">                {student.name}
              </p>

              <p className="text-sm text-slate-500">
                {student.class}
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {student.gender}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentStudents