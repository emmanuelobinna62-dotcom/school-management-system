import { useState } from "react"

const Assignments = ({ students }) => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      studentId: 1,
      title: "Algebra Homework",
      subject: "Mathematics",
      description: "Solve questions 1 to 10 on algebraic expressions.",
      class: "JSS 2",
      dueDate: "2026-09-15",
    },
    {
      id: 2,
      studentId: 2,
      title: "Essay Writing",
      subject: "English",
      description: "Solve questions 1 to 10 on algebraic expressions.",
      class: "SSS 1",
      dueDate: "2026-09-17",
    },
    {
      id: 3,
      studentId: 3,
      title: "Motion and Forces",
      subject: "Physics",
      description: "Solve questions 1 to 10 on algebraic expressions.",
      class: "JSS 3",
      dueDate: "2026-09-20",
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    studentId: null,
    title: "",
    subject: "",
    class: "",
    description: "",
    dueDate: "",
  })

  const [selectedClass, setSelectedClass] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // functions

  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    })
  }

  const handleSubjectChange = (e) => {
    setFormData({
      ...formData,
      subject: e.target.value,
    })
  }


  const handleDueDateChange = (e) => {
    setFormData({
      ...formData,
      dueDate: e.target.value,
    })
  }

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.studentId === null ||
      formData.title === "" ||
      formData.subject === "" ||
      formData.class === "" ||
      formData.dueDate === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    if (formData.id === null) {
      const newAssignment = {
        id: assignments.length + 1,
        studentId: formData.studentId,
        title: formData.title,
        subject: formData.subject,
        class: formData.class,
        description: formData.description,
        dueDate: formData.dueDate,
      }

      setAssignments([...assignments, newAssignment])
    } else {
      const updatedAssignments = assignments.map((assignment) => {
        if (assignment.id === formData.id) {
          return {
            ...assignment,
            studentId: formData.studentId,
            title: formData.title,
            subject: formData.subject,
            class: formData.class,
            description: formData.description,
            dueDate: formData.dueDate,
          }
        }

        return assignment
      })

      setAssignments(updatedAssignments)
    }

    setFormData({
      id: null,
      studentId: null,
      title: "",
      subject: "",
      class: "",
      description: "",
      dueDate: "",
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    )

    if (confirmDelete) {
      const updatedAssignments = assignments.filter((assignment) => {
        return assignment.id !== id
      })

      setAssignments(updatedAssignments)
    }
  }

  const handleEdit = (assignment) => {
    setFormData({
      id: assignment.id,
      studentId: assignment.studentId,
      title: assignment.title,
      subject: assignment.subject,
      class: assignment.class,
      description: assignment.description,
      dueDate: assignment.dueDate,
    })
  }

  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedClass !== "" && assignment.class !== selectedClass) {
      return false
    }

    if (
      searchTerm !== "" &&
      !assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Assignments</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Add Assignment</h2>

        <input
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Assignment title"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <select
          value={formData.subject}
          onChange={handleSubjectChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        >
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>

        <select
          value={formData.studentId || ""}
          onChange={(e) => {
            const selectedStudent = students.find((student) => {
              return student.id === Number(e.target.value)
            })

            if (selectedStudent) {
              setFormData({
                ...formData,
                studentId: selectedStudent.id,
                class: selectedStudent.class,
              })
            } else {
              setFormData({
                ...formData,
                studentId: null,
                class: "",
              })
            }
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <textarea
          value={formData.description}
          onChange={handleDescriptionChange}
          placeholder="Assignment description"
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        ></textarea>

        <input
          type="text"
          value={formData.class}
          readOnly
          placeholder="Class"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-100"
        />

        <input
          type="date"
          value={formData.dueDate}
          onChange={handleDueDateChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg">
          {formData.id === null ? "Save Assignment" : "Update Assignment"}
        </button>

        {formData.id !== null && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                id: null,
                studentId: null,
                title: "",
                subject: "",
                class: "",
                description: "",
                dueDate: "",
              })
            }
            className="w-full sm:w-auto bg-gray-500 text-white px-5 py-3 rounded-lg mt-3 sm:mt-0 sm:ml-2"
          >
            Cancel
          </button>
        )}



      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search assignments..."
        className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 mt-6"
      />

      <div className="bg-white rounded-xl shadow-sm mt-6 overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr>
              <th className="px-4 md:px-6 py-4 text-left">Student</th>
              <th className="px-4 md:px-6 py-4 text-left">Title</th>
              <th className="px-4 md:px-6 py-4 text-left">Subject</th>
              <th className="px-4 md:px-6 py-4 text-left">Description</th>
              <th className="px-4 md:px-6 py-4 text-left">Class</th>
              <th className="px-4 md:px-6 py-4 text-left">Due Date</th>
              <th className="px-4 md:px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map((assignment) => (
              <tr key={assignment.id} className="border-t border-gray-200">
                <td className="p-4">
                  {students.find((student) => {
                    return student.id === assignment.studentId
                  })?.name}
                </td>
                <td className="p-4">{assignment.title}</td>
                <td className="p-4">{assignment.subject}</td>
                <td className="p-4 text-gray-600 max-w-xs">{assignment.description}</td>
                <td className="p-4">{assignment.class}</td>
                <td className="p-4">{assignment.dueDate}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(assignment)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                  >
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

export default Assignments