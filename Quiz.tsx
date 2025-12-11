import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from 'lucide-react';
import { useAnalytics } from '@/react-app/hooks/useAnalytics';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'You receive an urgent pop-up warning that your device has 47 viruses. What should you do?',
    options: [
      'Click the button to remove viruses immediately',
      'Close the browser/app and run a scan with your installed antivirus',
      'Enter your credit card to purchase the security software',
      'Call the phone number shown on the warning'
    ],
    correctAnswer: 1,
    explanation: 'Always close suspicious pop-ups and use your own installed security software. Never trust random security warnings.'
  },
  {
    id: 2,
    question: 'What is scareware?',
    options: [
      'A type of actual virus that damages your computer',
      'Software that uses fear tactics to trick users into taking harmful actions',
      'A legitimate security program that scans for threats',
      'A type of hardware component'
    ],
    correctAnswer: 1,
    explanation: 'Scareware is malicious software that uses intimidation and false warnings to manipulate users into downloading malware or paying for fake services.'
  },
  {
    id: 3,
    question: 'You find a QR code taped to a parking meter. Should you scan it?',
    options: [
      'Yes, it\'s probably official information',
      'Yes, but only with your phone\'s camera app',
      'No, it could lead to a malicious website',
      'Yes, QR codes are always safe'
    ],
    correctAnswer: 2,
    explanation: 'Random QR codes in public places can be malicious. Only scan codes from trusted, verified sources.'
  },
  {
    id: 4,
    question: 'Which of these is a red flag for scareware?',
    options: [
      'Calm, professional interface',
      'Urgent language with countdown timers',
      'From a well-known security company',
      'Offers a free trial period'
    ],
    correctAnswer: 1,
    explanation: 'Scareware uses urgency, fear, and pressure tactics. Legitimate security software is professional and doesn\'t use countdown timers or scare tactics.'
  },
  {
    id: 5,
    question: 'What should you do if you accidentally click on a suspicious security warning?',
    options: [
      'Follow the instructions to "clean" your device',
      'Provide payment information to remove the threats',
      'Close the browser immediately and run a legitimate antivirus scan',
      'Restart your computer and hope it goes away'
    ],
    correctAnswer: 2,
    explanation: 'If you click a suspicious warning, close it immediately. Then use your legitimate installed security software to scan for actual threats.'
  },
  {
    id: 6,
    question: 'How can you tell if a security alert is legitimate?',
    options: [
      'It shows a countdown timer',
      'It appears as a pop-up in your browser',
      'It comes from your installed antivirus software',
      'It asks for immediate payment'
    ],
    correctAnswer: 2,
    explanation: 'Real security alerts come from software you\'ve intentionally installed, not from random pop-ups or websites.'
  },
  {
    id: 7,
    question: 'What is the main goal of scareware creators?',
    options: [
      'To help protect users from real threats',
      'To trick users into paying money or installing malware',
      'To improve computer performance',
      'To educate users about cybersecurity'
    ],
    correctAnswer: 1,
    explanation: 'Scareware is designed to manipulate users through fear into downloading malware, paying for fake services, or giving up personal information.'
  },
  {
    id: 8,
    question: 'Which is the best protection against scareware?',
    options: [
      'Install every security app you find',
      'Click on all warnings to see if they\'re real',
      'Use legitimate antivirus software and stay informed about scam tactics',
      'Disable all security warnings'
    ],
    correctAnswer: 2,
    explanation: 'The best defense is using reputable security software, keeping systems updated, and learning to recognize scareware tactics.'
  },
  {
    id: 9,
    question: 'If a website claims your device has viruses but you haven\'t run a scan, what is it likely doing?',
    options: [
      'Performing a remote scan of your device',
      'Using scareware tactics to manipulate you',
      'Providing a helpful free service',
      'Detecting threats through your browser'
    ],
    correctAnswer: 1,
    explanation: 'Websites cannot scan your device for viruses. These are scareware tactics designed to trick you into downloading malware or paying for fake services.'
  },
  {
    id: 10,
    question: 'What should you do to stay protected from scareware?',
    options: [
      'Only install security software from random pop-ups',
      'Keep your OS and apps updated, use legitimate security software, and stay informed',
      'Disable all security features to avoid confusion',
      'Click on every security warning to investigate'
    ],
    correctAnswer: 1,
    explanation: 'Stay protected by keeping systems updated, using reputable security software, learning about scam tactics, and being cautious with unexpected warnings.'
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const { sessionId, trackEvent } = useAnalytics();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    trackEvent('quiz_answer', {
      question_id: questions[currentQuestion].id,
      is_correct: isCorrect,
      selected_answer: selectedAnswer
    });

    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      
      // Save quiz results
      try {
        await fetch('/api/quiz/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            score,
            total_questions: questions.length
          })
        });

        trackEvent('quiz_complete', {
          score,
          total_questions: questions.length,
          percentage: Math.round((score / questions.length) * 100)
        });
      } catch (error) {
        console.error('Failed to save quiz results:', error);
      }
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setIsComplete(false);
    trackEvent('quiz_retake');
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return 'Perfect Score! You\'re a cybersecurity expert!';
    if (percentage >= 80) return 'Excellent! You have strong security awareness!';
    if (percentage >= 60) return 'Good job! Keep learning to improve your security knowledge.';
    return 'Keep studying! Review the education section to strengthen your awareness.';
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-900 to-purple-950">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Trophy className="w-24 h-24 text-yellow-400" />
                  <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-50"></div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
              <p className="text-xl text-purple-200">{getScoreMessage()}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
              <div className="text-center mb-8">
                <div className="text-7xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-4">
                  {percentage}%
                </div>
                <p className="text-2xl text-white">
                  {score} out of {questions.length} correct
                </p>
              </div>

              <div className="space-y-3">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border ${
                        isCorrect
                          ? 'bg-green-900/20 border-green-500/30'
                          : 'bg-red-900/20 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        <span className={isCorrect ? 'text-green-200' : 'text-red-200'}>
                          Question {index + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  <span>Retake Quiz</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  <span>Return Home</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-900 to-purple-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Security Awareness Quiz</h1>
            <p className="text-purple-200">Test your knowledge about scareware and cybersecurity</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-200">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-purple-400 font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>

            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrectAnswer = showExplanation && isCorrect;
                const showIncorrectAnswer = showExplanation && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      showCorrectAnswer
                        ? 'bg-green-900/30 border-green-500 text-green-100'
                        : showIncorrectAnswer
                        ? 'bg-red-900/30 border-red-500 text-red-100'
                        : isSelected
                        ? 'bg-blue-900/40 border-blue-400 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          showCorrectAnswer
                            ? 'border-green-400 bg-green-400'
                            : showIncorrectAnswer
                            ? 'border-red-400 bg-red-400'
                            : isSelected
                            ? 'border-blue-400 bg-blue-400'
                            : 'border-white/40'
                        }`}
                      >
                        {(showCorrectAnswer || (isSelected && !showIncorrectAnswer)) && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                        {showIncorrectAnswer && <XCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showCorrectAnswer && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-5 mb-6">
                <p className="text-blue-100 font-semibold mb-2">Explanation:</p>
                <p className="text-blue-200">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-end">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedAnswer === null
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              )}
            </div>
          </div>

          {/* Current Score */}
          <div className="mt-6 text-center">
            <p className="text-purple-300">
              Current Score: <span className="font-bold text-purple-200">{score} / {currentQuestion + (showExplanation ? 1 : 0)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
