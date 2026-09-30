import { useState } from "react"


const Subjects = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
    },
    {
      id: 2,
      name: "English",
    },
    {
      id: 3,
      name: "Physics",
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    name: "",
  })

  const [searchTerm, setSearchTerm] = useState("")

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.name === "") {
      alert("Please enter a subject name")
      return
    }

    if (formData.id === null) {
      const newSubject = {
        id: subjects.length + 1,
        name: formData.name,
      }

      setSubjects([...subjects, newSubject])
    } else {
      const updatedSubjects = subjects.map((subject) => {
        if (subject.id === formData.id) {
          return {
            ...subject,
            name: formData.name,
          }
        }

        return subject
      })

      setSubjects(updatedSubjects)
    }

    setFormData({
      id: null,
      name: "",
    })
  }

  const handleEdit = (subject) => {
    setFormData({
      id: subject.id,
      name: subject.name,
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    )

    if (confirmDelete) {
      const updatedSubjects = subjects.filter((subject) => {
        return subject.id !== id
      })

      setSubjects(updatedSubjects)
    }
  }

  const filteredSubjects = subjects.filter((subject) => {
    if (
      searchTerm !== "" &&
      !subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Subjects</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl"
      >
        <h2 className="text-lg font-semibold mb-4">Add Subject</h2>

        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Subject name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          {formData.id === null ? "Save Subject" : "Update Subject"}
        </button>

        {formData.id !== null && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                id: null,
                name: "",
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
        placeholder="Search subjects..."
        className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 mt-6"
      />

      <div className="mt-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white p-4 rounded-lg mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <span>{subject.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(subject)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(subject.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Subjects