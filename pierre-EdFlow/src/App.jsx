import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import StudentClassSelect from './components/StudentClassSelect';
import StudentSubjectDashboard from './components/StudentSubjectDashboard';
import QuizTakingPage from './components/QuizTakingPage';
import QuizResultsPage from './components/QuizResultsPage';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherQuizBuilder from './components/TeacherQuizBuilder';


function App() {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<AuthPage setUser={setUser} />} 
        />
        
        {/* Student Routes */}
        <Route 
          path="/student/classes" 
          element={user?.role === 'student' ? <StudentClassSelect /> : <Navigate to="/" />} 
        />
        <Route 
          path="/student/subject/:subjectId" 
          element={user?.role === 'student' ? <StudentSubjectDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/student/quiz/:quizId" 
          element={user?.role === 'student' ? <QuizTakingPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/student/quiz-results/:quizId" 
          element={user?.role === 'student' ? <QuizResultsPage /> : <Navigate to="/" />} 
        />

        {/* Teacher Routes */}
        <Route 
          path="/teacher/dashboard" 
          element={user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />} 
        />
        <Route 
        path="/teacher/quiz-builder/:classId" 
        element={user?.role === 'teacher' ? <TeacherQuizBuilder /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;