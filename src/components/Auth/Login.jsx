import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials or user not found.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome Back</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
      </form>
      <p className="mt-4 text-center text-gray-400">Don't have an account? <Link to="/signup" className="text-blue-400 underline">Signup</Link></p>
    </div>
  );
};
export default Login;
