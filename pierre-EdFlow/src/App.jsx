import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import StudentClassSelect from './components/StudentClassSelect';
import StudentSubjectDashboard from './components/StudentSubjectDashboard';
import QuizTakingPage from './components/QuizTakingPage';
import QuizResultsPage from './components/QuizResultsPage';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;