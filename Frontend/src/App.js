
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import {useCookies} from 'react-cookie'


import Login from "./Pages/Login";
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Attendance from "./Pages/Attendance"; 
import Course from "./Pages/Course";
import Psignup from "./Pages/Psignup";
import Grades from "./Pages/Grades"
import Students from "./Pages/Students";
import Navbar from "./Components/Navbar";
import { Link } from "react-router-dom";
  


function App(){
  const [cookies, setCookies] = useCookies()
  return(
    <>
    {cookies["user"] ? 
  <div className="App">
    <BrowserRouter>
    <Navbar />
    <div className="flex w-full">
    <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Student Portal</h2>
          <nav className="space-y-2">
            <Link to="/course" className="block px-4 py-2 rounded-lg hover:bg-blue-100">
              Courses
            </Link>
            <Link to="/attendance" className="block px-4 py-2 rounded-lg hover:bg-blue-100">
              Attendance
            </Link>
            <Link to="/grades" className="block px-4 py-2 rounded-lg hover:bg-blue-100">
              Timetable
            </Link>
            {/* <Link onClick={fetchTeachers}className="block px-4 py-2 rounded-lg hover:bg-blue-100">View Teachers</Link> */}
            <Link to="/students" className="block px-4 py-2 rounded-lg hover:bg-blue-100">View Students</Link>
          </nav>
    </aside>
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Routes>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/contact" element={<Contact/>}/>
        <Route path = "/attendance" element={<Attendance/>}/>
        <Route path = "/attendance/:course" element={<Attendance/>}></Route>
        <Route path = "/course" element={<Course/>}/>
        <Route path = "/grades" element={<Grades/>}/>
        <Route path = "/students" element={<Students/>}/>
      </Routes>
      </div>

    </div>
    </BrowserRouter>
  </div> : 
  <BrowserRouter>
    <Navbar />
    <div className="flex h-[92%] -z-1 absolute w-full items-center content-center">
    <Routes>
      <Route path="/psignup" element={<Psignup />}/>
      <Route path = "/" element={<Login/>}/>
    </Routes>
    </div>
  </BrowserRouter> 
  }
  </>
  )
}






export default App;