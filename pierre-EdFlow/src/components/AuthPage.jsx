import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage({ setUser }) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Auth attempt:', { role, email, password, isLogin });
    
    // Set user and navigate based on role
    setUser({ email, role });
    
    if (role === 'student') {
      navigate('/student/classes');
    } else if (role === 'teacher') {
      navigate('/teacher/dashboard'); // We'll create this later
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-black animate-gradient"></div>
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background: linear-gradient(45deg, #581c87, #6b21a8, #7c3aed, #000000, #581c87);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
      
      {/* Auth card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
            <img 
            src="/Edflow logo.svg" 
            alt="EdFlow Logo" 
            className="h-16 w-16"
            />
        </div>
        <h1 className="text-3xl font-bold text-purple-900 mb-2">EdFlow Quiz</h1>
        <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Create your account'}
        </p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setRole('student')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              role === 'student'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('teacher')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              role === 'teacher'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@school.edu.au"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            {isLogin ? 'Log In' : 'Sign Up'} as {role === 'student' ? 'Student' : 'Teacher'}
          </button>
        </div>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </button>
        </div>

        {/* Role indicator */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Logging in as a <span className="font-semibold text-purple-600">{role}</span>
          </p>
        </div>
      </div>
    </div>
  );
}