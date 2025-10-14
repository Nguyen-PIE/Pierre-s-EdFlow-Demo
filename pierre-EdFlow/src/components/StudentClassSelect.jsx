import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentClassSelect() {
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();
  const classes = [
    {
      id: 1,
      name: 'Maths Extension 1',
      icon: '📐',
      color: 'from-blue-500 to-cyan-500',
      topics: 12,
      quizzes: 4
    },
    {
      id: 2,
      name: 'Business Studies',
      icon: '💼',
      color: 'from-purple-500 to-pink-500',
      topics: 6,
      quizzes: 7
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    console.log('Selected class:', classId);
    navigate(`/student/subject/${classId}`);
  };


  return (
    <div className="min-h-screen relative overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Student!</h1>
              <p className="text-purple-200">Select a class to get started</p>
            </div>
            <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg backdrop-blur-sm transition-all"> 
            Log Out
          </button>
          </div>

          {/* Class Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {classes.map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => handleClassSelect(classItem.id)}
                className="group relative bg-white rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 text-left"
              >
                {/* New Quiz Badge - Only for Business Studies DEMO*/}
                {classItem.id === 2 && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-[pulse_3s_ease-in-out_infinite] z-50">
                    NEW QUIZ!
                  </div>
                )}
                
                {/* Gradient header */}
                <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-2xl bg-gradient-to-r ${classItem.color}`}></div>
                
                {/* Icon */}
                <div className="text-6xl mb-4">{classItem.icon}</div>
                
                {/* Class name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {classItem.name}
                </h2>
                
                {/* Stats */}
                <div className="flex gap-6 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-semibold text-purple-600">{classItem.topics}</span> Topics
                  </div>
                  <div>
                    <span className="font-semibold text-purple-600">{classItem.quizzes}</span> Quizzes
                  </div>
                </div>
                
                {/* Action hint */}
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Start Learning</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">0</div>
                  <div className="text-purple-200 text-sm">Quizzes Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">0%</div>
                  <div className="text-purple-200 text-sm">Average Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">0</div>
                  <div className="text-purple-200 text-sm">Topics Mastered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}