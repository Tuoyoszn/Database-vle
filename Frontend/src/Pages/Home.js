import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

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

function Home() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [cookie] = useCookies(["user"]);

  async function fetchTeachers() {
    const res = await fetch("http://localhost:5000/api/Teachers");
    const data = await res.json();
    setTeachers(data);
  }

  async function fetchStudents() {
    const res = await fetch("http://localhost:5000/api/Students");
    const data = await res.json();
    setStudents(data);
  }

  return (
    <>
      

      <div>

        

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Welcome back, {cookie.user} 👋</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Courses</h3>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Timetable</h3>
              {/* <p className="text-2xl font-bold text-green-600">B+</p> */}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">Class Attendance</h3>
              {/* <p className="text-2xl font-bold text-red-600">2</p> */}
            </div>
          </div>
{/* 
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Teachers</h2>
              {teachers.length === 0 ? (
                <p className="text-gray-500">No Teachers</p>
              ) : (
                <ul className="space-y-2">
                  {teachers.map((user, index) => (
                    <li key={index} className="hover:bg-gray-100 p-2 rounded">
                      {user.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Students</h2>
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

      <div className="flex space-x-4"> */}
        
      {/* </div>
          </div> */}
        </main>
      </div>
    </>
  );
}

export default Home;
