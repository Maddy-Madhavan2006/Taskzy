import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import toast from 'react-hot-toast'; 
import Email from '../components/custom/Email.jsx';
import User from '../components/custom/User.jsx';
import Pass from '../components/custom/Pass.jsx';
import CPass from '../components/custom/CPass.jsx';

function Register() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (!email || !username || !password || !confirmPass) {
      toast.error("Please fill in all fields");
      return;
    }

    // 2. Password Match Check (Frontend)
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 3. API Call to Backend
      const response = await fetch('https://taskflow-1-v0ec.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS
        toast.success("Registration Successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        // FAIL: Shows "This email is already registered" from backend
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Could not connect to the server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-slate-50 p-4 overflow-y-auto">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-[400px] my-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 p-2 rounded-lg mb-2 text-white shadow-md">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-md font-bold !text-slate-900 tracking-tight">Taskzy</h1>
          <p className="text-slate-400 text-[11px] mt-0.5 text-center">
            Join Taskzy to start managing your projects
          </p>
        </div>
        
        {/* Registration Form */}
        <form onSubmit={handleRegister} className="flex flex-col w-full gap-3.5">
          <User value={username} onChange={(e) => setUsername(e.target.value)} />
          <Email value={email} onChange={(e) => setEmail(e.target.value)} />
          <Pass value={password} onChange={(e) => setPassword(e.target.value)} />
          <CPass value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#1e2632] hover:bg-slate-800 hover:cursor-pointer text-white h-10 rounded-lg font-bold mt-3 shadow-sm disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <footer className='mt-6 pt-4 border-t border-slate-50 text-center'>
          <p className="text-[11px] text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline ml-1">
              Log in
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Register;