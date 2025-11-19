import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Psignup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [wardName, setWardName] = useState(""); 
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/Psignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": name,  
        "email": email,
        "password":password,
        "ward_name": wardName  
      }),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      alert("Signup failed. Please check your details and try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Parent Sign Up
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Name</label>
          <input
            type="text"
            placeholder="Jane"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            Ward's Full Name
          </label>
          <input
            type="text"
            placeholder="e.g., Michael Smith"
            value={wardName}
            onChange={(e) => setWardName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}

export default Psignup;
