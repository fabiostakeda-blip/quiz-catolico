import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, User, LogOut, Play, BarChart3 } from 'lucide-react';

const QuizDashboard = ({ user, onStartQuiz, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetchCategories();
    loadProgress();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = () => {
    const savedProgress = localStorage.getItem('quiz_progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  };

  const getCategoryProgress = (categoryName) => {
    return progress[categoryName] || { completed: 0, total: 0 };
  };

  const getTotalProgress = () => {
    const totalQuestions = categories.reduce((sum, cat) => sum + cat.question_count, 0);
    const completedQuestions = Object.values(progress).reduce(
      (sum, cat) => sum + cat.completed, 0
    );
    return totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Quiz Pro Nobis</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {user.name}
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progresso Geral</span>
                  <span>{Math.round(getTotalProgress())}%</span>
                </div>
                <Progress value={getTotalProgress()} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {categories.map((category) => {
                  const categoryProgress = getCategoryProgress(category.name);
                  const progressPercent = category.question_count > 0 
                    ? (categoryProgress.completed / category.question_count) * 100 
                    : 0;
                  
                  return (
                    <div key={category.name} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        {category.name}
                      </h4>
                      <div className="text-xs text-gray-600 mb-2">
                        {categoryProgress.completed} de {category.question_count} perguntas
                      </div>
                      <Progress value={progressPercent} className="h-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryProgress = getCategoryProgress(category.name);
            const progressPercent = category.question_count > 0 
              ? (categoryProgress.completed / category.question_count) * 100 
              : 0;

            return (
              <Card key={category.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {category.part_section}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{category.question_count} perguntas</span>
                        <span>{Math.round(progressPercent)}% completo</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {category.difficulties.map((difficulty) => (
                        <Badge
                          key={difficulty}
                          variant="secondary"
                          className="text-xs"
                        >
                          {difficulty === 'basic' ? 'Básico' : 
                           difficulty === 'intermediate' ? 'Intermediário' : 
                           'Avançado'}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => onStartQuiz(category.name)}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {progressPercent > 0 ? 'Continuar' : 'Começar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Start All Quiz Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => onStartQuiz()}
            size="lg"
            className="px-8"
          >
            <Play className="h-5 w-5 mr-2" />
            Iniciar Quiz Completo
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QuizDashboard;

