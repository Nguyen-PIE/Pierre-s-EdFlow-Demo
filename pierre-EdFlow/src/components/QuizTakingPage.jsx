import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizTakingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();


  // Dummy questions based on NSW Business Studies Stage 6 Syllabus
  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What is the primary objective of a business?',
      options: [
        'To maximize profit',
        'To satisfy stakeholder needs',
        'To provide employment',
        'To contribute to society'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      type: 'short-answer',
      question: 'Explain the difference between internal and external stakeholders in a business.',
      maxWords: 100,
      modelAnswer: 'Internal stakeholders are individuals or groups within the organization such as employees, managers, and owners. External stakeholders are outside parties like customers, suppliers, and the community who are affected by business decisions.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Which of the following is NOT a function of management?',
      options: [
        'Planning',
        'Leading',
        'Marketing',
        'Controlling'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      type: 'short-answer',
      question: 'Describe two advantages of operating as a sole trader.',
      maxWords: 80,
      modelAnswer: 'Advantages include complete control over business decisions and operations, and the owner receives all profits. Additionally, sole traders have simplified legal requirements and lower setup costs compared to companies.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'What does CSR stand for in business?',
      options: [
        'Customer Service Relations',
        'Corporate Social Responsibility',
        'Company Sales Revenue',
        'Consumer Safety Regulations'
      ],
      correctAnswer: 1
    }
  ];

  const currentQ = questions[currentQuestion];
  const wordCount = textAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isOverLimit = currentQ.type === 'short-answer' && wordCount > currentQ.maxWords;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex
    });
  };

  const handleTextChange = (e) => {
    setTextAnswer(e.target.value);
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    });
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentQuestion)) {
      setFlaggedQuestions(flaggedQuestions.filter(q => q !== currentQuestion));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
      setTextAnswer(answers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setTextAnswer(answers[currentQuestion - 1] || '');
    }
  };

    const handleSubmit = () => {
        console.log('Quiz submitted!', answers);
        navigate('/student/quiz-results/1');
    };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    console.log('Quiz bookmarked for later');
    navigate('/student/subject/2');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Marketing Strategies Quiz</h1>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{formatTime(timeElapsed)}</div>
              <div className="text-xs text-gray-500">Time Elapsed</div>
            </div>
            <button
              onClick={handleExit}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Exit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-purple-600 h-2 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Question Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {currentQ.type === 'multiple-choice' ? 'Multiple Choice' : 'Short Answer'}
                </span>
                {flaggedQuestions.includes(currentQuestion) && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🚩 Flagged
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentQ.question}
              </h2>
              {currentQ.type === 'short-answer' && (
                <p className="text-sm text-gray-500">Maximum {currentQ.maxWords} words</p>
              )}
            </div>
            <button
              onClick={toggleFlag}
              className={`ml-4 p-3 rounded-lg transition-all ${
                flaggedQuestions.includes(currentQuestion)
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title="Flag question for review"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" />
              </svg>
            </button>
          </div>

          {/* Multiple Choice Options */}
          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Short Answer Text Area */}
          {currentQ.type === 'short-answer' && (
            <div>
              <textarea
                value={textAnswer}
                onChange={handleTextChange}
                placeholder="Type your answer here..."
                className={`w-full p-4 border-2 rounded-lg min-h-[200px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                  isOverLimit ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-sm ${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                  Word count: {wordCount} / {currentQ.maxWords}
                  {isOverLimit && ' (Over limit!)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Question Navigator</h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(answers[index] || null);
                  setTextAnswer(answers[index] || '');
                }}
                className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                  index === currentQuestion
                    ? 'bg-purple-600 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : flaggedQuestions.includes(index)
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 rounded"></div>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span className="text-gray-600">Flagged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Exit Quiz?</h3>
              <p className="text-gray-600">
                Your progress will be saved and this quiz will be added to your bookmarked quizzes. You can continue later from where you left off.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Continue Quiz
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                Exit & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}