import { useState } from "react"


const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "School Reopening",
      message: "School resumes on Monday, September 7.",
      date: "September 5, 2026",
    },
    {
      id: 2,
      title: "Parents Meeting",
      message: "There will be a parents meeting on Friday.",
      date: "September 6, 2026",
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    message: "",
    date: "",
  })

  const [searchTerm, setSearchTerm] = useState("")

  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    })
  }

  const handleMessageChange = (e) => {
    setFormData({
      ...formData,
      message: e.target.value,
    })
  }

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.title === "" ||
      formData.message === "" ||
      formData.date === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    if (formData.id === null) {
      const newAnnouncement = {
        id: announcements.length + 1,
        title: formData.title,
        message: formData.message,
        date: formData.date,
      }

      setAnnouncements([...announcements, newAnnouncement])
    } else {
      const updatedAnnouncements = announcements.map((announcement) => {
        if (announcement.id === formData.id) {
          return {
            ...announcement,
            title: formData.title,
            message: formData.message,
            date: formData.date,
          }
        }

        return announcement
      })

      setAnnouncements(updatedAnnouncements)
    }

    setFormData({
      id: null,
      title: "",
      message: "",
      date: "",
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    )

    if (confirmDelete) {
      const updatedAnnouncements = announcements.filter((announcement) => {
        return announcement.id !== id
      })

      setAnnouncements(updatedAnnouncements)
    }
  }

  const handleEdit = (announcement) => {
    setFormData({
      id: announcement.id,
      title: announcement.title,
      message: announcement.message,
      date: announcement.date,
    })
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (
      searchTerm !== "" &&
      !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })


  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Announcements</h1>
      <p className="text-gray-600 mt-2">
        Manage school announcements and notifications
      </p>

      {/* Announcement form  */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id === null ? "Add Announcement" : "Edit Announcement"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Announcement title"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="date"
            value={formData.date}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <textarea
            value={formData.message}
            onChange={handleMessageChange}
            placeholder="Announcement message"
            className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2"
            rows="4"
          ></textarea>

        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg mt-4"
        >
          {formData.id === null ? "Add Announcement" : "Update Announcement"}
        </button>
        {formData.id !== null && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                id: null,
                title: "",
                message: "",
                date: "",
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
        placeholder="Search announcements..."
        className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 mt-6"
      />

      <p className="mt-4 text-gray-600">
        Showing {filteredAnnouncements.length} announcements
      </p>



      <div className="mt-6">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white p-4 md:p-6 rounded-lg mb-4"
          >
            <h2 className="text-lg font-semibold">
              {announcement.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {announcement.message}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {announcement.date}
            </p>

            <div className="flex gap-2">



              <button
                onClick={() => handleEdit(announcement)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg mt-3"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(announcement.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg mt-3"
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

export default Announcements