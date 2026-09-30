import { useState } from "react"



const Fees = ({ students }) => {

  const [fees, setFees] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: "John Doe",
      class: "JSS 1",
      amount: 150000,
      status: "Paid",
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Sarah James",
      class: "JSS 1",
      amount: 150000,
      status: "Partially Paid",
    },
    {
      id: 3,
      studentId: 3,
      studentName: "David Paul",
      class: "JSS 2",
      amount: 150000,
      status: "Unpaid",
    },
  ])

  const [formData, setFormData] = useState({
    id: null,
    studentId: null,
    class: "",
    amount: "",
    status: "",
  })

  const [selectedClass, setSelectedClass] = useState("")

  const [selectedStatus, setSelectedStatus] = useState("")

  const handleStudentChange = (e) => {
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
  }

  const handleClassChange = (e) => {
    setFormData({
      ...formData,
      class: e.target.value,
    })
  }

  const handleAmountChange = (e) => {
    setFormData({
      ...formData,
      amount: e.target.value,
    })
  }

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      formData.studentId === null ||
      formData.class === "" ||
      formData.amount === "" ||
      formData.status === ""
    ) {
      alert("Please fill in all fields")
      return
    }

    if (formData.id === null) {

      const newFee = {
        id: fees.length + 1,
        studentId: formData.studentId,
        class: formData.class,
        amount: formData.amount,
        status: formData.status,
      }

      setFees([...fees, newFee])

    } else {

      const updatedFees = fees.map((fee) => {
        if (fee.id === formData.id) {
          return {
            ...fee,
            studentId: formData.studentId,
            class: formData.class,
            amount: formData.amount,
            status: formData.status,
          }
        }

        return fee
      })

      setFees(updatedFees)
    }

    setFormData({
      id: null,
      studentId: null,
      class: "",
      amount: "",
      status: "",
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee record?"
    )

    if (confirmDelete) {
      const updatedFees = fees.filter((fee) => {
        return fee.id !== id
      })

      setFees(updatedFees)
    }
  }

  const handleEdit = (fee) => {
    setFormData({
      id: fee.id,
      studentId: fee.studentId,
      class: fee.class,
      amount: fee.amount,
      status: fee.status,
    })
  }

  const handleCancel = () => {
    setFormData({
      id: null,
      studentId: null,
      class: "",
      amount: "",
      status: "",
    })
  }

  const filteredFees = fees.filter((fee) => {
    if (selectedClass !== "" && fee.class !== selectedClass) {
      return false
    }

    if (selectedStatus !== "" && fee.status !== selectedStatus) {
      return false
    }

    return true
  })


  const totalFees = filteredFees.reduce((total, fee) => {
    return total + Number(fee.amount)
  }, 0)

  const paidFees = filteredFees
    .filter((fee) => fee.status === "Paid")
    .reduce((total, fee) => {
      return total + Number(fee.amount)
    }, 0)

  const partiallyPaidFees = filteredFees
    .filter((fee) => fee.status === "Partially Paid")
    .reduce((total, fee) => {
      return total + Number(fee.amount)
    }, 0)

  const unpaidFees = filteredFees
    .filter((fee) => fee.status === "Unpaid")
    .reduce((total, fee) => {
      return total + Number(fee.amount)
    }, 0)

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800">
        Fees
      </h1>

      <p className="text-gray-500 mt-1">
        Manage student school fees
      </p>

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

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="w-full max-w-2xl mt-4 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Partially Paid">Partially Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>

      <div className="flex flex-wrap gap-4 mt-6">

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Fees</p>
          <p className="text-xl font-bold text-gray-800">
            ₦{totalFees}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Paid</p>
          <p className="text-xl font-bold text-green-600">
            ₦{paidFees}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Partially Paid</p>
          <p className="text-xl font-bold text-yellow-600">
            ₦{partiallyPaidFees}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Unpaid</p>
          <p className="text-xl font-bold text-red-600">
            ₦{unpaidFees}
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-xl shadow-sm mt-8 w-full md:max-w-2xl"
      >
        <select
          value={formData.studentId || ""}
          onChange={handleStudentChange}
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-100 text-gray-600"
        />

        <input
          type="number"
          value={formData.amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="Paid">Paid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
        >
          Save Fee
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

      </form>

      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-x-auto">

        <table className="w-full min-w-max text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 text-gray-700">Student</th>
              <th className="text-left p-4 text-gray-700">Class</th>
              <th className="text-left p-4 text-gray-700">Amount</th>
              <th className="text-left p-4 text-gray-700">Status</th>
              <th className="text-left p-4 text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFees.map((fee) => (
              <tr key={fee.id} className="border-t border-gray-200">

                <td className="p-4 text-gray-800">
                  {students.find((student) => {
                    return student.id === fee.studentId
                  })?.name}
                </td>

                <td className="p-4 text-gray-600">
                  {fee.class}
                </td>

                <td className="p-4 text-gray-600">
                  ₦{fee.amount}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${fee.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : fee.status === "Partially Paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {fee.status}
                  </span>
                </td>

                {/* Action section */}

                <td className="p-4 whitespace-nowrap">

                  <button
                    onClick={() => handleEdit(fee)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
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

export default Fees