import { useState } from "react"


const Parents = ({ students }) => {

  const [parents, setParents] = useState([
    {
      id: 1,
      studentId: 1,
      name: "Michael Sneidjer",
      phone: "08012345678",
      email: "michael@example.com",
      student: "John Sneidjer",
    },
    {
      id: 2,
      studentId: 2,
      name: "James Williams",
      phone: "08098765432",
      email: "james@example.com",
      student: "Sarah Wlliams",
    },
    {
      id: 3,
      studentId: 3,
      name: "David Johnson",
      phone: "08055555555",
      email: "david@example.com",
      student: "Michael Paul",
    },
    {
      id: 4,
      studentId: 4,
      name: "Laurett Anderson",
      phone: "08055555555",
      email: "laurett@example.com",
      student: "Grace Anderson",
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    studentId: null,
    name: "",
    phone: "",
    email: "",
    student: "",
  })
  const [searchTerm, setSearchTerm] = useState("")


  // functions

  const handleStudentChange = (e) => {
    const selectedStudent = students.find((student) => {
      return student.id === Number(e.target.value)
    })

    if (selectedStudent) {
      setFormData({
        ...formData,
        studentId: selectedStudent.id,
        student: selectedStudent.name,
      })
    } else {
      setFormData({
        ...formData,
        studentId: null,
        student: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.email === "" ||
      formData.studentId === null
    ) {
      alert("Please fill in all fields")
      return
    }

    if (formData.id === null) {
      const newParent = {
        id: parents.length + 1,
        studentId: formData.studentId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        student: formData.student,
      }

      setParents([...parents, newParent])
    } else {
      const updatedParents = parents.map((parent) => {
        if (parent.id === formData.id) {
          return {
            ...parent,
            studentId: formData.studentId,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            student: formData.student,
          }
        }

        return parent
      })

      setParents(updatedParents)
    }


    setFormData({
      id: null,
      studentId: null,
      name: "",
      phone: "",
      email: "",
      student: "",
    })
  }

  const handleEdit = (parent) => {
    setFormData({
      id: parent.id,
      studentId: parent.studentId,
      name: parent.name,
      phone: parent.phone,
      email: parent.email,
      student: parent.student,
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this parent?"
    )

    if (confirmDelete) {
      const updatedParents = parents.filter((parent) => {
        return parent.id !== id
      })

      setParents(updatedParents)
    }
  }

  const filteredParents = parents.filter((parent) => {
    if (
      searchTerm !== "" &&
      !parent.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })



  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Parents</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl"
      >
        <h2 className="text-lg font-semibold mb-4">Add Parent</h2>

        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          placeholder="Parent name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          placeholder="Phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <select
          value={formData.studentId || ""}
          onChange={handleStudentChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg"        >
          {formData.id === null ? "Save Parent" : "Update Parent"}
        </button>

        {/* Cancel button */}

        {formData.id !== null && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                id: null,
                studentId: null,
                name: "",
                phone: "",
                email: "",
                student: "",
              })
            }
            className="w-full sm:w-auto bg-gray-500 text-white px-5 py-3 rounded-lg mt-3 sm:mt-0 sm:ml-2"          >
            Cancel
          </button>
        )}
      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search parents..."
        className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 mt-6"
      />

      <div className="mt-6">
        {filteredParents.map((parent) => (
          <div
            key={parent.id}
            className="bg-white p-4 rounded-lg mb-3"
          >
            <p className="font-semibold">{parent.name}</p>
            <p className="text-gray-600">{parent.phone}</p>
            <p className="text-gray-600 wrap-break-word">{parent.email}</p>            <p className="text-gray-600"> Student: {parent.student}</p>

            {/* Edit and Delete  */}
            <button
              onClick={() => handleEdit(parent)}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg mt-2 mr-2"            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(parent.id)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Parents