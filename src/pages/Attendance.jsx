import { useState } from "react"

const Attendance = () => {

  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "John Doe",
      class: "JSS 1",
      date: "2026-09-05",
      status: "Present",
    },
    {
      id: 2,
      name: "Sarah James",
      class: "JSS 1",
      date: "2026-09-05",
      status: "Absent",
    },
    {
      id: 3,
      name: "David Paul",
      class: "JSS 2",
      date: "2026-09-06",
      status: "Present",
    },
  ])

  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const handleStatusChange = (id, status) => {
    const updatedAttendance = attendance.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          status: status,
        }
      }

      return student
    })

    setAttendance(updatedAttendance)

  }

  const filteredAttendance = attendance.filter((student) => {
    if (selectedClass !== "" && student.class !== selectedClass) {
      return false
    }

    if (selectedDate !== "" && student.date !== selectedDate) {
      return false
    }

    return true
  })


  const totalStudents = filteredAttendance.length

  const presentStudents = filteredAttendance.filter((student) => {
    return student.status === "Present"
  }).length

  const absentStudents = filteredAttendance.filter((student) => {
    return student.status === "Absent"
  }).length




  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Attendance</h1>
      <p className="text-gray-500 mt-1">Manage student attendance</p>
      <select
        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-3 mt-6 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedClass}
        onChange={(event) => setSelectedClass(event.target.value)}
      >
        <option value="">All Classes</option>
        <option value="JSS 1">JSS 1</option>
        <option value="JSS 2">JSS 2</option>
        <option value="JSS 3">JSS 3</option>
        <option value="SSS 1">SSS 1</option>
        <option value="SSS 2">SSS 2</option>
        <option value="SSS 3">SSS 3</option>
      </select>

      <select
        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="">All Dates</option>
        <option value="2026-09-05">September 5, 2026</option>
        <option value="2026-09-06">September 6, 2026</option>
      </select>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <p className="bg-white p-4 rounded-xl shadow-sm">
          Total Students: {totalStudents}
        </p>

        <p className="bg-white p-4 rounded-xl shadow-sm">
          Present: {presentStudents}
        </p>

        <p className="bg-white p-4 rounded-xl shadow-sm">
          Absent: {absentStudents}
        </p>
      </div>


      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden">
        {filteredAttendance.map((student) => (
          <div
            key={student.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-gray-200"
          >
            <p className="text-gray-700 wrap-break">
              {student.name} - {student.class} - {student.date} - {student.status}
            </p>

            <button
              onClick={() => handleStatusChange(student.id, "Present")}
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Present
            </button>

            <button
              onClick={() => handleStatusChange(student.id, "Absent")}
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Absent
            </button>

          </div>

        ))}


      </div>

    </div>
  )
}

export default Attendance