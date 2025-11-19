import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AttendancePage() {
  const { course } = useParams();    
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!course) return;

    fetch(`http://localhost:5000/api/getAttendanceList?course=${encodeURIComponent(course)}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, [course]); 
  const handleChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    const attendanceArray = Object.entries(attendance).map(
      ([student_id, status]) => ({
        student_id: Number(student_id),
        status,
      })
    );

    fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: course, 
        date: selectedDate,
        attendance: attendanceArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch(() => alert("Error saving attendance."));
  };

  return (
    <div className="bg-white shadow-lg w-full p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Attendance for {course}
      </h2>

      <div className="flex items-center justify-center mb-6 space-x-2">
        <label className="font-medium">Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.student_id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={attendance[student.student_id] || ""}
                      onChange={(e) =>
                        handleChange(student.student_id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select --</option>
                      <option value="Present">✅ Present</option>
                      <option value="Absent">❌ Absent</option>
                      <option value="Late">⏰ Late</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  No students found for this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default AttendancePage;
