import { useState } from "react"


const Teachers = () => {

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Mr. John Smith",
      subject: "Mathematics",
      phone: "08012345678",
    },
    {
      id: 2,
      name: "Mrs. Sarah James",
      subject: "English",
      phone: "08123456789",
    },
    {
      id: 3,
      name: "Mr. David Paul",
      subject: "Physics",
      phone: "09012345678",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    phone: "",
  })

  const [editingId, setEditingId] = useState(null)




  const handleNameChange = (event) => {
    setFormData({
      ...formData, name: event.target.value
    })
  }

  const handlesubjectChange = (event) => {
    setFormData({
      ...formData, subject: event.target.value
    })
  }

  const handlephoneChange = (event) => {
    setFormData({
      ...formData, phone: event.target.value
    })
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    if (formData.name === "") {
      alert("Please enter the teacher's name")
      return
    }

    if (formData.subject === "") {
      alert("Please enter the teacher's subject")
      return
    }

    if (formData.phone === "") {
      alert("Please enter the teacher's Phone number")
      return
    }



    if (editingId === null) {

      const newTeacher = {
        id: teachers.length > 0
          ? Math.max(...teachers.map((teacher) => teacher.id)) + 1
          : 1,
        name: formData.name,
        subject: formData.subject,
        phone: formData.phone,
      }

      setTeachers([...teachers, newTeacher])

    } else {

      const updatedTeachers = teachers.map((teacher) => {
        if (teacher.id === editingId) {
          return {
            ...teacher,
            name: formData.name,
            subject: formData.subject,
            phone: formData.phone,
          }
        }

        return teacher
      })

      setTeachers(updatedTeachers)
    }

    setFormData({
      name: "",
      subject: "",
      phone: "",
    })

    setEditingId(null)
  }

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    )

    if (confirmDelete) {
      const updatedTeachers = teachers.filter((teacher) => {
        return teacher.id !== id
      })

      setTeachers(updatedTeachers)
    }
  }

  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      phone: teacher.phone,
    })

    setEditingId(teacher.id)
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">        Teachers
      </h1>

      <p className="mt-2 text-slate-600">
        Manage all teachers in the school.
      </p>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-8 w-full md:max-w-xl"
      >

        <div>
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">
            Subject
          </label>

          <input
            type="text"
            value={formData.subject}
            onChange={handlesubjectChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            value={formData.phone}
            onChange={handlephoneChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-lg"        >
          {editingId === null ? "Add Teacher" : "Update Teacher"}
        </button>

      </form>



      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-x-auto">
        <table className="w-full min-w-max text-left">

          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 md:px-6 py-4">ID</th>
              <th className="px-4 md:px-6 py-4">Name</th>
              <th className="px-4 md:px-6 py-4">Subject</th>
              <th className="px-4 md:px-6 py-4">Phone</th>
              <th className="px-4 md:px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-t">

                <td className="px-4 md:px-6 py-4">
                  {teacher.id}
                </td>

                <td className="px-4 md:px-6 py-4 font-medium">
                  {teacher.name}
                </td>

                <td className="px-4 md:px-6 py-4">
                  {teacher.subject}
                </td>

                <td className="px-4 md:px-6 py-4">
                  {teacher.phone}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 mr-4">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="text-red-600">
                    Delete
                  </button>


                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default Teachers