import { useState } from "react"

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState("All Classes")

  const [selectedDay, setSelectedDay] = useState("All Days")

  const [formData, setFormData] = useState({
    id: null,
    day: "",
    subject: "",
    teacher: "",
    class: "",
    time: "",
  })
  const [timetable, setTimetable] = useState([
    {
      id: 1,
      day: "Monday",
      subject: "Mathematics",
      teacher: "John Smith",
      class: "JSS 1",
      time: "8:00 AM - 9:00 AM",
    },
    {
      id: 2,
      day: "Monday",
      subject: "English",
      teacher: "Sarah James",
      class: "JSS 1",
      time: "9:00 AM - 10:00 AM",
    },
    {
      id: 3,
      day: "Tuesday",
      subject: "Physics",
      teacher: "David Paul",
      class: "JSS 1",
      time: "8:00 AM - 9:00 AM",
    },
    {
      id: 4,
      day: "Tuesday",
      subject: "English",
      teacher: "Sarah James",
      class: "JSS 2",
      time: "9:00 AM - 10:00 AM",
    },
    {
      id: 5,
      day: "Wednesday",
      subject: "Mathematics",
      teacher: "John Smith",
      class: "JSS 3",
      time: "8:00 AM - 9:00 AM",
    },
    {
      id: 6,
      day: "Thursday",
      subject: "Physics",
      teacher: "David Paul",
      class: "SSS 1",
      time: "10:00 AM - 11:00 AM",
    },
  ])

  const filteredTimetable = timetable.filter((item) => {
    if (
      selectedClass !== "All Classes" &&
      item.class !== selectedClass
    ) {
      return false
    }

    if (
      selectedDay !== "All Days" &&
      item.day !== selectedDay
    ) {
      return false
    }

    return true
  })

  const handleDayChange = (e) => {
    setFormData({
      ...formData,
      day: e.target.value,
    })
  }

  const handleSubjectChange = (e) => {
    setFormData({
      ...formData,
      subject: e.target.value,
    })
  }

  const handleTeacherChange = (e) => {
    setFormData({
      ...formData,
      teacher: e.target.value,
    })
  }

  const handleClassChange = (e) => {
    setFormData({
      ...formData,
      class: e.target.value,
    })
  }

  const handleTimeChange = (e) => {
    setFormData({
      ...formData,
      time: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.day === "" ||
      formData.subject === "" ||
      formData.teacher === "" ||
      formData.class === "" ||
      formData.time === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    const newEntry = {
      id: timetable.length + 1,
      day: formData.day,
      subject: formData.subject,
      teacher: formData.teacher,
      class: formData.class,
      time: formData.time,
    }

    if (formData.id === null) {
      setTimetable([...timetable, newEntry])
    } else {
      const updatedTimetable = timetable.map((item) => {
        if (item.id === formData.id) {
          return {
            ...item,
            day: formData.day,
            subject: formData.subject,
            teacher: formData.teacher,
            class: formData.class,
            time: formData.time,
          }
        }

        return item
      })

      setTimetable(updatedTimetable)
    }


    setFormData({
      id: null,
      day: "",
      subject: "",
      teacher: "",
      class: "",
      time: "",
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this timetable entry?"
    )

    if (confirmDelete) {
      const updatedTimetable = timetable.filter((entry) => {
        return entry.id !== id
      })

      setTimetable(updatedTimetable)
    }
  }
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      day: item.day,
      subject: item.subject,
      teacher: item.teacher,
      class: item.class,
      time: item.time,
    })
  }


  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Timetable</h1>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-3 mt-6"
      >
        <option value="All Classes">All Classes</option>
        <option value="JSS 1">JSS 1</option>
        <option value="JSS 2">JSS 2</option>
        <option value="JSS 3">JSS 3</option>
        <option value="SSS 1">SSS 1</option>
        <option value="SSS 2">SSS 2</option>
        <option value="SSS 3">SSS 3</option>
      </select>

      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-3 mt-6 ml-2"
      >
        <option value="All Days">All Days</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-lg mt-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {formData.id === null ? "Add Timetable Entry" : "Edit Timetable Entry"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            value={formData.day}
            onChange={handleDayChange}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>

          <input
            type="text"
            value={formData.subject}
            onChange={handleSubjectChange}
            placeholder="Subject"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            value={formData.teacher}
            onChange={handleTeacherChange}
            placeholder="Teacher"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <select
            value={formData.class}
            onChange={handleClassChange}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">Select Class</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
            <option value="SSS 1">SSS 1</option>
            <option value="SSS 2">SSS 2</option>
            <option value="SSS 3">SSS 3</option>
          </select>

          <input
            type="text"
            value={formData.time}
            onChange={handleTimeChange}
            placeholder="Time (e.g. 8:00 AM - 9:00 AM)"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-4"
        >
          {formData.id === null ? "Add Timetable" : "Update Timetable"}
        </button>

        {formData.id !== null && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                id: null,
                day: "",
                subject: "",
                teacher: "",
                class: "",
                time: "",
              })
            }
            className="bg-gray-500 text-white px-5 py-3 rounded-lg mt-4 ml-2"
          >
            Cancel
          </button>
        )}



      </form>

      <p className="mt-4 text-gray-600">
        Showing {filteredTimetable.length} timetable entries
      </p>

      <div className="mt-6">
        {filteredTimetable.map((item) => (
          <div
            key={`${item.day}-${item.time}-${item.subject}`}
            className="bg-white p-4 rounded-lg mb-3"
          >
            <p className="font-semibold">
              {item.day} - {item.time}
            </p>

            <p className="text-gray-600">
              Subject: {item.subject}
            </p>

            <p className="text-gray-600">
              Teacher: {item.teacher}
            </p>

            <p className="text-gray-600">
              Class: {item.class}
            </p>

            <button
              onClick={() => handleEdit(item)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg mt-2 mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(item.id)}
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

export default Timetable