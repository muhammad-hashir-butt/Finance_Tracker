import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    
    // Validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (err) {
      console.error("Firebase Error Code:", err.code);
      

      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please login.");
      } else if (err.code === 'auth/invalid-email') {
        setError("The email address provided is invalid.");
      } else if (err.code === 'auth/api-key-not-valid') {
        setError("Invalid Firebase configuration. Please check your API keys.");
      } else if (err.code === 'auth/network-request-failed') {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Join Us</h2>
      
      {/* Error Message Box */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-gray-300 text-sm ml-1">Email</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-white transition-all" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-300 text-sm ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-white transition-all" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button 
          disabled={loading}
          type="submit" 
          className={`w-full py-3 mt-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 ${
            loading 
              ? 'bg-gray-600 cursor-not-allowed opacity-70' 
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/20'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : "Create Account"}
        </button>
      </form>
      
      <p className="mt-6 text-center text-gray-400">
        Already a member? <Link to="/login" className="text-green-400 hover:underline font-medium">Login</Link>
      </p>
    </div>
  );
};

export default Signup;







