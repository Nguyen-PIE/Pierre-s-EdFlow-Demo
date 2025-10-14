import { useState } from 'react';

export default function TeacherQuizBuilder() {
  const [quizTitle, setQuizTitle] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);

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

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now(),
      type: 'multiple-choice',
      questionText: '',
      wordLimit: 100,
      exemplarAnswer: '',
      markingCriteria: ['', '', '', ''],
      options: ['', '', '', '']
    }]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, index, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const updateMarkingCriterion = (questionId, index, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newCriteria = [...q.markingCriteria];
        newCriteria[index] = value;
        return { ...q, markingCriteria: newCriteria };
      }
      return q;
    }));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handlePublishQuiz = () => {
    console.log('Publishing quiz:', {
      quizTitle,
      selectedTopics,
      numQuestions,
      questions
    });
    // Submit to database
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="max-w-5xl mx-auto px-6">
          <button className="text-white/80 hover:text-white mb-4 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Class
          </button>
          <h1 className="text-4xl font-bold">Create New Quiz</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Quiz Setup */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Setup</h2>

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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Topic Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Topics
            </label>
            {Object.entries(topicCategories).map(([category, topics]) => (
              <div key={category} className="mb-4">
                <h3 className="font-bold text-purple-700 mb-2 text-sm">{category}</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`text-left p-3 rounded-lg border-2 transition-all text-sm ${
                        selectedTopics.includes(topic)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedTopics.includes(topic) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                        }`}>
                          {selectedTopics.includes(topic) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">{topic.split(':')[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Number of Questions */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Questions ({questions.length})</h2>
            <button
              onClick={addQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Question {index + 1}</h3>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Question Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateQuestion(question.id, 'type', 'multiple-choice')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      question.type === 'multiple-choice'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Multiple Choice
                  </button>
                  <button
                    onClick={() => updateQuestion(question.id, 'type', 'short-answer')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      question.type === 'short-answer'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Short Answer
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question Text
                </label>
                <textarea
                  value={question.questionText}
                  onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                  placeholder="Enter your question here..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[100px]"
                />
              </div>

              {/* Multiple Choice Options */}
              {question.type === 'multiple-choice' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Short Answer Settings */}
              {question.type === 'short-answer' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Word Limit
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="500"
                      value={question.wordLimit}
                      onChange={(e) => updateQuestion(question.id, 'wordLimit', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Exemplar Answer
                    </label>
                    <textarea
                      value={question.exemplarAnswer}
                      onChange={(e) => updateQuestion(question.id, 'exemplarAnswer', e.target.value)}
                      placeholder="Provide a model answer for AI reference..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[100px]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Marking Criteria (4 points)
                    </label>
                    <div className="space-y-2">
                      {question.markingCriteria.map((criterion, critIndex) => (
                        <input
                          key={critIndex}
                          type="text"
                          value={criterion}
                          onChange={(e) => updateMarkingCriterion(question.id, critIndex, e.target.value)}
                          placeholder={`Criterion ${critIndex + 1} - What should students demonstrate?`}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Publish Button */}
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all">
            Save as Draft
          </button>
          <button
            onClick={handlePublishQuiz}
            disabled={!quizTitle || selectedTopics.length === 0 || questions.length === 0}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish Quiz
          </button>
        </div>
      </div>
    </div>
  );
}