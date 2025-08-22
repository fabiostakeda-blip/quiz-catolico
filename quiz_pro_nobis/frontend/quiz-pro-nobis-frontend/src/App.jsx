import { useState, useEffect } from 'react';
import Login from './components/Login';
import QuizDashboard from './components/QuizDashboard';
import QuestionCard from './components/QuestionCard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'dashboard', 'quiz'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/user', {
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
      setCurrentView('login');
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedCategory(null);
    }
  };

  const handleStartQuiz = async (category = null) => {
    try {
      setLoading(true);
      const response = await fetch('/api/questions', {
        credentials: 'include',
      });
      
      if (response.ok) {
        let allQuestions = await response.json();
        
        // Filtrar por categoria se especificada
        if (category) {
          allQuestions = allQuestions.filter(q => q.category === category);
        }
        
        setQuestions(allQuestions);
        setSelectedCategory(category);
        setCurrentQuestionIndex(0);
        setCurrentView('quiz');
      }
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (currentView === 'dashboard') {
    return (
      <QuizDashboard
        user={user}
        onStartQuiz={handleStartQuiz}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'quiz' && questions.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header do Quiz */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Quiz Pro Nobis
                  {selectedCategory && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      - {selectedCategory}
                    </span>
                  )}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToDashboard}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Voltar ao Dashboard
                </button>
                <div className="flex items-center text-sm text-gray-600">
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo do Quiz */}
        <main className="py-8">
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <p className="text-gray-600">Carregando quiz...</p>
      </div>
    </div>
  );
}

export default App;

