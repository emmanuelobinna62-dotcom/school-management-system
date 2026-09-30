import { useState } from "react"
import StudentTable from "../components/StudentsTable"





const Students = ({ students, setStudents }) => {





  const [formData, setFormData] = useState({
    name: "",
    class: "",
    gender: "",
  })

  const [editingId, setEditingId] = useState(null)





  // functions
  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value
    })
  }

  const handleClassChange = (event) => {
    setFormData({
      ...formData,
      class: event.target.value,
    })
  }

  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.name === "" ||
      formData.class === "" ||
      formData.gender === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    if (editingId === null) {

      const newStudent = {
        id: students.length > 0 ? Math.max(...students.map((student) => student.id)) + 1 : 1,
        name: formData.name,
        class: formData.class,
        gender: formData.gender,
        attendancePresent: 0,
        attendanceAbsent: 0,
        results: [],
        fees: {
          total: 0,
          paid: 0,
        },
        assignments: [],
      }

      setStudents([...students, newStudent])

    } else {

      const updatedStudents = students.map((student) => {
        if (student.id === editingId) {
          return {
            ...student,
            name: formData.name,
            class: formData.class,
            gender: formData.gender,
          }
        }

        return student
      })

      setStudents(updatedStudents)
    }

    setFormData({
      name: "",
      class: "",
      gender: "",
    })

    setEditingId(null)
  }


  // Delete function

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    )

    if (confirmDelete) {
      const updatedStudents = students.filter((student) => {
        return student.id !== id
      })

      setStudents(updatedStudents)
    }
  }

  // Edit function

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      class: student.class,
      gender: student.gender,

    })

    setEditingId(student.id)
  }


  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">      <h1 className="text-2xl font-bold text-gray-800">
      Students
    </h1>

      <p className="text-gray-500 mt-1">
        Manage school students
      </p>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-8 w-full md:max-w-xl">

        <h2 className="text-lg font-semibold text-slate-900">
          {editingId === null ? "Add Student" : "Edit Student"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {editingId === null
            ? "Enter the student's information below."
            : "Update the student's information below."}
        </p>

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-400" />
        </div>



        <div className="mt-5 md:mt-4">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Class
          </label>

          <select
            value={formData.class}
            onChange={handleClassChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="">Select Class</option>
            <option value="JSS1">JSS 1</option>
            <option value="JSS2">JSS 2</option>
            <option value="JSS3">JSS 3</option>
            <option value="SSS1">SSS 1</option>
            <option value="SSS2">SSS 2</option>
            <option value="SSS3">SSS 3</option>
          </select>
        </div>

        <div className="mt-5 md:mt-4">
          <label
            className="block mb-2 text-sm font-medium text-slate-700">
            Gender
          </label>

          <select
            value={formData.gender}
            onChange={handleGenderChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-800"        >
          {editingId === null ? "Add Student" : "Update Student"}
        </button>
      </form>

      <StudentTable
        students={students}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default Students