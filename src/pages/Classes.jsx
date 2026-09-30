import { useState } from "react"

const Classes = () => {

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "JSS 1",
    },
    {
      id: 2,
      name: "JSS 2",
    },
    {
      id: 3,
      name: "JSS 3",
    },
    {
      id: 4,
      name: "SSS 1",
    },
    {
      id: 5,
      name: "SSS 2",
    },
    {
      id: 6,
      name: "SSS 3",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
  })

  const [editingId, setEditingId] = useState(null)

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.name === "") {
      alert("Please enter the class name")
      return
    }

    if (editingId === null) {

      const newClass = {
        id: classes.length + 1,
        name: formData.name,
      }

      setClasses([...classes, newClass])

    } else {

      const updatedClasses = classes.map((schoolClass) => {
        if (schoolClass.id === editingId) {
          return {
            ...schoolClass,
            name: formData.name,
          }
        }

        return schoolClass
      })

      setClasses(updatedClasses)
    }

    setFormData({
      name: "",
    })

    setEditingId(null)
  }


  const handleEdit = (schoolClass) => {
    setFormData({
      name: schoolClass.name
    })

    setEditingId(schoolClass.id)
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    )

    if (confirmDelete) {
      const updatedClasses = classes.filter((schoolClass) => {
        return schoolClass.id !== id
      })

      setClasses(updatedClasses)
    }
  }




  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Classes</h1>
      <p className="text-gray-500 mt-1">Manage school classes and subjects</p>
      <form onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-8 w-full md:max-w-2xl"
      >
        <div className="mt-4">
          <label className="block mb-2 font-medium text-gray-700">Class Name</label>

          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter class name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Update Class" : "Add Class"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                ID
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Class
              </th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {classes.map((schoolClass) => (
              <tr
                key={schoolClass.id}
                className="border-t border-gray-200"
              >
                <td className="px-4 md:px-6 py-4 text-gray-700">
                  {schoolClass.id}
                </td>

                <td className="px-4 md:px-6 py-4 text-gray-700">
                  {schoolClass.name}
                </td>

                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(schoolClass)}
                    className="text-blue-600 mr-4">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(schoolClass.id)}
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

export default Classes