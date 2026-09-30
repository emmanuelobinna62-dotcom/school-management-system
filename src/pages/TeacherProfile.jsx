


const TeacherProfile = () => {

  const teacher = {
    name: "John Smith",
    subject: "Mathematics",
    gender: "Male",
    phone: "08012345678",
    email: "john@example.com",
    address: "Lagos, Nigeria",
  }
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Teacher Profile</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {teacher.name}
        </h2>

        <p className="mb-2">
          <strong>Subject:</strong> {teacher.subject}
        </p>

        <p className="mb-2">
          <strong>Gender:</strong> {teacher.gender}
        </p>

        <p className="mb-2">
          <strong>Phone:</strong> {teacher.phone}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {teacher.email}
        </p>

        <p>
          <strong>Address:</strong> {teacher.address}
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Teaching Information
        </h2>

        <p className="mb-2">
          <strong>Subject:</strong> {teacher.subject}
        </p>

        <p className="mb-2">
          <strong>Classes:</strong> JSS 1, JSS 2
        </p>

        <p>
          <strong>Teacher ID:</strong> TCH001
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Assigned Classes
        </h2>

        <p className="mb-2">
          JSS 1
        </p>

        <p>
          JSS 2
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Schedule
        </h2>

        <p className="mb-2">
          <strong>Monday:</strong> 8:00 AM - 10:00 AM
        </p>

        <p className="mb-2">
          <strong>Wednesday:</strong> 10:00 AM - 12:00 PM
        </p>

        <p>
          <strong>Friday:</strong> 9:00 AM - 11:00 AM
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Attendance
        </h2>

        <p className="mb-2">
          <strong>Present:</strong> 22 days
        </p>

        <p className="mb-2">
          <strong>Absent:</strong> 1 day
        </p>

        <p>
          <strong>Attendance Rate:</strong> 95.7%
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Responsibilities
        </h2>

        <p className="mb-2">
          Teaching Mathematics
        </p>

        <p className="mb-2">
          Preparing student assessments
        </p>

        <p>
          Monitoring student performance
        </p>
      </div>
    </div>
  )
}

export default TeacherProfile