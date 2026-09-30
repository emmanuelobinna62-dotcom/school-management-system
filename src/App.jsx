import { useState } from "react"
import { students as initialStudents } from "./data/students"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Layout from "./components/Layout"

import Exams from "./components/Exams"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Teachers from "./pages/Teachers"
import Classes from "./pages/Classes"
import Attendance from "./pages/Attendance"
import Fees from "./pages/Fees"
import Assignments from "./pages/Assignments"
import Subjects from "./pages/Subjects"
import Parents from "./pages/Parents"
import StudentProfile from "./pages/StudentProfile"
import TeacherProfile from "./pages/TeacherProfile"
import Timetable from "./pages/Timetable"
import Announcements from "./pages/Announcements"

const App = () => {
  const [students, setStudents] = useState(initialStudents)

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="students"
            element={
              <Students
                students={students}
                setStudents={setStudents}
              />
            }
          />
          <Route
            path="students/:id"
            element={<StudentProfile students={students} />}
          />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route
            path="fees"
            element={<Fees students={students} />}
          />
          <Route
            path="assignments"
            element={<Assignments students={students} />}
          />          <Route path="subjects" element={<Subjects />} />
          <Route
            path="parents"
            element={<Parents students={students} />}
          />
          <Route path="student-profile" element={<StudentProfile />} />
          <Route path="teacher-profile" element={<TeacherProfile />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="announcements" element={<Announcements />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App