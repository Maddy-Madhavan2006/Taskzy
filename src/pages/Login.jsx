import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import toast from 'react-hot-toast'; 
import Email from '../components/custom/Email.jsx';
import Pass from '../components/custom/Pass.jsx';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1. Frontend Validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // 2. API Call to your Express Backend
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success Handshake
        localStorage.setItem("token", "true"); 
        
        // Match the backend object structure { user: { username, email } }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        toast.success(`Welcome back, ${data.user?.username || 'User'}!`);
        
        // Brief delay so they see the success toast before the page switches
        setTimeout(() => {
          navigate('/'); 
        }, 1000);
      } else {
        // 4. Specific Error Handling
        // This catches "Invalid email or password" or "Fields required" from backend
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Could not connect to the server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-[380px]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 p-2 rounded-lg mb-2 text-white shadow-md">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-md font-bold !text-slate-900 tracking-tight">TaskFlow</h1>
          <p className="text-slate-400 text-[11px] mt-0.5 text-center">Sign in to your workspace</p>
        </div>
        
        {/* Form Container */}
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
          
          <div className="w-full">
            <Email value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="w-full">
            <Pass value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e2632] hover:bg-slate-800 hover:cursor-pointer text-white h-10 rounded-lg font-bold mt-2 shadow-sm disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <footer className='mt-6 pt-4 border-t border-slate-50 text-center'>
          <p className="text-[11px] text-slate-400">
            Don't have an account?{" "}
            <Link to='/register' className="text-indigo-600 font-bold hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;