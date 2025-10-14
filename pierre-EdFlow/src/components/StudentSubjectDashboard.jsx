import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentSubjectDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const handleStartQuiz = (quizId) => {
    navigate(`/student/quiz/${quizId}`);
  };

  const handleBackToClasses = () => {
    navigate('/student/classes');
  };

  // Sample quiz data
  const newQuizzes = [
    {
      id: 1,
      title: 'Marketing Strategies & Consumer Behavior',
      topics: ['Marketing', 'Consumer Behavior'],
      questions: 5,
      difficulty: 'Medium',
      timeEstimate: '20 min',
      isNew: true
    }
  ];

  const bookmarkedQuizzes = [
    {
      id: 2,
      title: 'Business Operations & Management',
      topics: ['Operations', 'Management'],
      questions: 20,
      difficulty: 'Hard',
      timeEstimate: '25 min',
      progress: 60
    }
  ];

  const completedQuizzes = [
    {
      id: 3,
      title: 'Financial Planning Basics',
      topics: ['Finance', 'Planning'],
      questions: 12,
      difficulty: 'Easy',
      score: 85,
      completedDate: '2 days ago'
    },
    {
      id: 4,
      title: 'Human Resources Management',
      topics: ['HR', 'Management'],
      questions: 18,
      difficulty: 'Medium',
      score: 72,
      completedDate: '5 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <button onClick={handleBackToClasses}className="text-white/80 hover:text-white mb-4 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
            </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">💼</span>
            <h1 className="text-4xl font-bold">Business Studies</h1>
          </div>
          <p className="text-purple-100">Year 12 HSC • 15 Topics • 30 Quizzes Available</p>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 border-b border-white/20">
            {[
              { id: 'all', label: 'All Quizzes' },
              { id: 'new', label: 'New' },
              { id: 'bookmarked', label: 'Bookmarked' },
              { id: 'completed', label: 'Completed' },
              { id: 'revision', label: 'Revision Mode' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* New Quiz Section */}
        {(activeTab === 'all' || activeTab === 'new') && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">New Quiz Added!</h2>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                NEW
              </span>
            </div>
            <div className="grid gap-6">
              {newQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {quiz.topics.map(topic => (
                          <span key={topic} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span>📝 {quiz.questions} questions</span>
                        <span>⏱️ {quiz.timeEstimate}</span>
                        <span className={`font-semibold ${
                          quiz.difficulty === 'Easy' ? 'text-green-600' : 
                          quiz.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleStartQuiz(quiz.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                    Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookmarked Quizzes */}
        {(activeTab === 'all' || activeTab === 'bookmarked') && bookmarkedQuizzes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Bookmarked Quizzes</h2>
            <div className="grid gap-6">
              {bookmarkedQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {quiz.topics.map(topic => (
                          <span key={topic} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600 mb-3">
                        <span>📝 {quiz.questions} questions</span>
                        <span>⏱️ {quiz.timeEstimate}</span>
                        <span className="font-semibold text-yellow-600">{quiz.difficulty}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${quiz.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{quiz.progress}%</span>
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all ml-4">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revision Mode */}
        {(activeTab === 'all' || activeTab === 'revision') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Revision Mode</h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
              <div className="flex items-start gap-6">
                <div className="bg-purple-600 text-white p-4 rounded-xl text-4xl">
                  🧠
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Learning Experience</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Specially curated quizzes developed by EdFlow's advanced analysis algorithm. 
                    This mode compiles questions you got wrong, spent the most time on, or topics 
                    where you need improvement. Perfect for targeted exam preparation and mastering 
                    difficult concepts.
                  </p>
                  <div className="flex gap-4 text-sm text-gray-700 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      <span>Adaptive difficulty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Focus on weak areas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      <span>Time-based insights</span>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                    Start Revision Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Quizzes */}
        {(activeTab === 'all' || activeTab === 'completed') && completedQuizzes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Completed Quizzes</h2>
            <div className="grid gap-6">
              {completedQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {quiz.topics.map(topic => (
                          <span key={topic} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span>📝 {quiz.questions} questions</span>
                        <span>🎯 Score: <span className={`font-bold ${quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{quiz.score}%</span></span>
                        <span>📅 {quiz.completedDate}</span>
                      </div>
                    </div>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}