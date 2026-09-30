import { useState } from "react"


const Exams = ({ students }) => {

  const [results, setResults] = useState([
    {
      id: 1,
      studentId: 1,
      class: "JSS 1",
      subject: "Mathematics",
      score: 85,
    },
    {
      id: 2,
      studentId: 2,
      class: "JSS 1",
      subject: "English",
      score: 72,
    },
    {
      id: 3,
      studentId: 3,
      class: "JSS 2",
      subject: "Physics",
      score: 90,
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    studentId: null,
    studentName: "",
    class: "",
    subject: "",
    score: "",
  })

  const [selectedClass, setSelectedClass] = useState("")

  const handleEdit = (result) => {
    setFormData({
      id: result.id,
      studentId: result.studentId,
      class: result.class,
      subject: result.subject,
      score: result.score,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.studentId === null ||
      formData.subject === "" ||
      formData.class === "" ||
      formData.score === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    if (formData.id === null) {

      const newResult = {
        id: results.length + 1,
        studentId: formData.studentId,
        class: formData.class,
        subject: formData.subject,
        score: formData.score,
      }

      setResults([...results, newResult])

    } else {

      const updatedResults = results.map((result) => {
        if (result.id === formData.id) {
          return {
            ...result,
            studentId: formData.studentId,
            class: formData.class,
            subject: formData.subject,
            score: formData.score,
          }
        }

        return result
      })

      setResults(updatedResults)
    }

    setFormData({
      id: null,
      studentId: null,
      class: "",
      subject: "",
      score: "",
    })
  }


  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    )

    if (confirmDelete) {
      const updatedResults = results.filter((result) => {
        return result.id !== id
      })

      setResults(updatedResults)
    }
  }

  const handleCancel = () => {
    setFormData({
      id: null,
      studentId: null,
      class: "",
      subject: "",
      score: "",
    })
  }

  const filteredResults = results.filter((result) => {
    if (selectedClass !== "" && result.class !== selectedClass) {
      return false
    }

    return true
  })


  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Exams & Results
      </h1>

      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-full max-w-2xl mt-6 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Classes</option>
        <option value="JSS 1">JSS 1</option>
        <option value="JSS 2">JSS 2</option>
        <option value="JSS 3">JSS 3</option>
        <option value="SSS 1">SSS 1</option>
        <option value="SSS 2">SSS 2</option>
        <option value="SSS 3">SSS 3</option>
      </select>

      <p className="text-gray-500 mt-1">
        Manage student examination results
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-8 w-full md:max-w-2xl"
      >
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={formData.class}
          readOnly
          placeholder="Class"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-100"
        />

        <input
          type="text"
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
          placeholder="Subject"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          min="0"
          max="100"
          value={formData.score}
          onChange={(e) =>
            setFormData({
              ...formData,
              score: e.target.value,
            })
          }
          placeholder="Score"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"

          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"        >
          Save Result
        </button>

        <button
          type="button" onClick={handleCancel}
          className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300"        >
          Cancel
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-x-auto">

        <table className="w-full min-w-175 text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 text-gray-700">Student</th>
              <th className="text-left p-4 text-gray-700">Class</th>
              <th className="text-left p-4 text-gray-700">Subject</th>
              <th className="text-left p-4 text-gray-700">Score</th>
              <th className="text-left p-4 text-gray-700">Grade</th>
              <th className="text-left p-4 text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((result) => {

              let grade = ""

              if (result.score >= 70) {
                grade = "A"
              } else if (result.score >= 60) {
                grade = "B"
              } else if (result.score >= 50) {
                grade = "C"
              } else {
                grade = "F"
              }

              return (
                <tr key={result.id} className="border-t border-gray-200">

                  <td className="p-4 text-gray-800">
                    {students.find((student) => {
                      return student.id === result.studentId
                    })?.name}
                  </td>
                  <td className="p-4 text-gray-600">
                    {result.class}
                  </td>

                  <td className="p-4 text-gray-600">
                    {result.subject}
                  </td>



                  <td className="p-4 text-gray-600">
                    {result.score}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${grade === "A"
                        ? "bg-green-100 text-green-700"
                        : grade === "B"
                          ? "bg-blue-100 text-blue-700"
                          : grade === "C"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {grade}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">

                    <button
                      onClick={() => handleEdit(result)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(result.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            })}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Exams