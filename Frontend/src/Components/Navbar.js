import { Link } from "react-router-dom";

function Navbar(){
    return (
        <>
       <nav className="w-full bg-white shadow-md rounded-2xl px-6 py-3 bg-white p-3 rounded-2xl shadow-md ">
         <ul className="flex items-center justify-between">
        <li><Link to="/home" className="text-2xl font-bold text-blue-600">MyVLE</Link></li>
        <li><Link to="/about" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">About</Link></li>
        <li><Link to="/contact" className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">contact</Link></li>        </ul>
       </nav>
        </>
    )
}

export default Navbar;