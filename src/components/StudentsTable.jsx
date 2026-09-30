import { Link } from "react-router-dom"

const StudentTable = ({ students, handleDelete, handleEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm mt-8 overflow-x-auto">

      <table className="w-full min-w-max text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 md:px-6 py-4">ID</th>
            <th className="px-4 md:px-6 py-4">Name</th>
            <th className="px-4 md:px-6 py-4">Class</th>
            <th className="px-4 md:px-6 py-4">Gender</th>
            <th className="px-4 md:px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">


              <td className="px-4 md:px-6 py-4">
                {student.id}
              </td>

              <td className="px-4 md:px-6 py-4 font-medium">
                {student.name}
              </td>

              <td className="px-4 md:px-6 py-4">
                {student.class}
              </td>

              <td className="px-4 md:px-6 py-4">
                {student.gender}
              </td>

              <td className="px-4 md:px-6 py-4 whitespace-nowrap">

                <button
                  onClick={() => handleEdit(student)}
                  className="text-blue-600 mr-4">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-600">
                  Delete
                </button>

                <Link
                  to={`/students/${student.id}`}
                  className="text-green-600 ml-4"
                >
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable