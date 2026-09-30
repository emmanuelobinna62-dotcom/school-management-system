import { useParams } from "react-router-dom"

const formatCurrency = (amount) => {
  return amount.toLocaleString()
}

const StudentProfile = ({ students }) => {
  const { id } = useParams()


  const student = students.find((student) => {
    return student.id === Number(id)
  })

  if (!student) {
    return <p className="p-6 text-red-600">Student not found</p>
  }

  const totalDays = student.attendancePresent + student.attendanceAbsent

  let attendanceRate = 0

  if (totalDays > 0) {
    attendanceRate =
      (student.attendancePresent / totalDays) * 100
  }

  const getGrade = (score) => {
    if (score >= 70) {
      return "A"
    } else if (score >= 60) {
      return "B"
    } else if (score >= 50) {
      return "C"
    } else if (score >= 45) {
      return "D"
    } else {
      return "F"
    }
  }

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "text-green-600"
    } else if (status === "Pending") {
      return "text-yellow-600"
    } else {
      return "text-red-600"
    }
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Student Profile</h1>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {student.name}
        </h2>

        <p className="mb-2">
          <strong>Class:</strong> {student.class}
        </p>

        <p className="mb-2">
          <strong>Gender:</strong> {student.gender}
        </p>

        <p className="mb-2">
          <strong>Date of Birth:</strong> {student.dateOfBirth}
        </p>

        <p className="mb-2">
          <strong>Phone:</strong> {student.phone}
        </p>

        {/* <p>
          <strong>Address:</strong> {student.address}
        </p> */}
      </div>

      <div
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Academic Information
        </h2>

        <p className="mb-2">
          <strong>Class:</strong> {student.class}
        </p>

        <p>
          <strong>Student ID:</strong> STU{student.id}
        </p>
      </div>

      <div
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Attendance
        </h2>

        <p className="mb-2">
          <strong>Present:</strong> {student.attendancePresent} days
        </p>

        <p className="mb-2">
          <strong>Absent:</strong> {student.attendanceAbsent} days
        </p>

        {/* <p>
          <strong>Attendance Rate:</strong> 90%
        </p> */}

        <p>
          <strong>Attendance Rate:</strong> {attendanceRate.toFixed(0)}%
        </p>
      </div>

      <div
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Results
        </h2>

        {student.results.map((result) => (
          <p key={result.subject} className="mb-2">
            <strong>{result.subject}:</strong> {result.score} ({getGrade(result.score)})
          </p>
        ))}


      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Fees
        </h2>

        <p className="mb-2">
          <strong>Total Fees:</strong> ₦{formatCurrency(student.fees.total)}
        </p>

        <p className="mb-2">
          <strong>Amount Paid:</strong> ₦{formatCurrency(student.fees.paid)}
        </p>

        <p>
          <strong>Balance:</strong> ₦{formatCurrency(student.fees.total - student.fees.paid)}
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-6 w-full md:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Assignments
        </h2>

        {student.assignments.map((assignment) => (
          <p key={assignment.subject} className="mb-2">
            <strong>{assignment.subject}:</strong> {assignment.title}{" "}
            <span className={getStatusColor(assignment.status)}>
              ({assignment.status})
            </span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default StudentProfile