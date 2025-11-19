import { useState, useEffect } from "react";

function StudentProfileCard({ student }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {student.names.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{student.names}</h3>
          <p className="text-gray-600">{student.email || "No email provided"}</p>
        </div>
      </div>
    </div>
  );
}

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("http://localhost:5000/api/Students");
      const data = await res.json();
      setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Students</h1>

      {students.length === 0 ? (
        <p className="text-gray-500">No Students</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <StudentProfileCard key={index} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Students;
