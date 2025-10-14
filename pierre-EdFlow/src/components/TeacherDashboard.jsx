import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function TeacherClassManage() {
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
	const navigate = useNavigate();


	const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleClassClick = (classId) => {
    navigate(`/teacher/class/${classId}`);
  };

  const topicCategories = {
    'Preliminary Course': [
      'Nature of business: The role and nature of business',
      'Business management: The nature and responsibilities of management',
      'Business planning: Establishing and planning a small to medium enterprise'
    ],
    'HSC Course': [
      'Operations: Strategies for effective operations management',
      'Marketing: Development and implementation of successful marketing strategies',
      'Finance: Financial information in the planning and management of business',
      'Human resources: Human resource management and business performance'
    ]
  };

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handlePublishQuiz = () => {
    console.log('Publishing quiz:', { quizTitle, selectedTopics });
    // Reset form
    setQuizTitle('');
    setSelectedTopics([]);
    setShowCreateQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button className="text-white/80 hover:text-white mb-4 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">💼</span>
                <h1 className="text-4xl font-bold">Business Studies Year 12</h1>
              </div>
              <p className="text-purple-100">23 Students • 12 Active Quizzes</p>
            </div>
            <button
              onClick={() => setShowCreateQuiz(true)}
              className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-4 rounded-lg group-hover:bg-red-200 transition-all">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Flagged Quizzes</h3>
                <p className="text-gray-600 text-sm">5 need review</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition-all">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Student Progress</h3>
                <p className="text-gray-600 text-sm">View analytics</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-lg group-hover:bg-green-200 transition-all">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Manage Quizzes</h3>
                <p className="text-gray-600 text-sm">Edit or delete</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Quizzes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Quizzes</h2>
          <div className="space-y-4">
            {[
              { title: 'Marketing Strategies Quiz', students: 18, avgScore: 76, date: '2 days ago' },
              { title: 'Financial Management', students: 21, avgScore: 82, date: '5 days ago' },
              { title: 'Operations & Processes', students: 20, avgScore: 71, date: '1 week ago' }
            ].map((quiz, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{quiz.title}</h3>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>👥 {quiz.students} students completed</span>
                      <span>📊 {quiz.avgScore}% average score</span>
                      <span>📅 {quiz.date}</span>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                    View Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Quiz Modal */}
      {showCreateQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Create New Quiz</h2>
              <button
                onClick={() => setShowCreateQuiz(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quiz Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g., Marketing Strategies Assessment"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Topic Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Topics (Multiple Selection)
              </label>
              
              {Object.entries(topicCategories).map(([category, topics]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-bold text-purple-700 mb-3">{category}</h3>
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedTopics.includes(topic)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            selectedTopics.includes(topic)
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedTopics.includes(topic) && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium text-gray-800 text-sm">{topic}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Topics Summary */}
            {selectedTopics.length > 0 && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Selected Topics ({selectedTopics.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTopics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {topic.split(':')[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateQuiz(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishQuiz}
                disabled={!quizTitle || selectedTopics.length === 0}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}