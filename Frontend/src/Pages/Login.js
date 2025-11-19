import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

 

function Login({ onLogin }) {
  const [parents, setParents] = useState([]);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pword, setpassword] = useState("");
  const [error, setError] = useState(null);
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParents() {
      try {
        const res = await fetch("</login>");
        const data = await res.json();
        setParents(data.message);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchParents();  
  }, []);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  async function Log_In() {
    setError(null);     


    if (!name || !email || !pword) {
      setError("Please fill in all fields");
      return;
    }

    console.log(`${email}: ${pword}`);
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, pword: pword }),
    });
    console.log(res.status);
    if (res.status === 401) {
      setError("Invalid Account");
    } else {
      setCookie("user", name, { path: "/" });
      navigate("/home");
    }
  }

  useEffect(() => {
    if (cookie["user"]) {
      navigate("/home");
    }
  }, [cookie, navigate]);  
  return (
    <div className="flex items-center justify-center h-[100%] bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <div className="mb-4">
          <input
            type="name"
            placeholder="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
          onClick={() => Log_In()}
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
  Don't have an account?{" "}
  <Link to="/psignup" className="text-blue-600 hover:underline">Sign up</Link>
</p>

      </div>
    </div>
  );
}
export default Login;




