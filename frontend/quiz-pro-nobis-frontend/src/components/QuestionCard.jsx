import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, BookOpen, Eye, EyeOff } from 'lucide-react';

const QuestionCard = ({ question, currentIndex, totalQuestions, onNext, onPrevious }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return 'Básico';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return difficulty;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Pergunta {currentIndex + 1} de {totalQuestions}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(question.difficulty)}>
            {getDifficultyLabel(question.difficulty)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.part_section}
          </Badge>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <CardTitle className="text-lg leading-relaxed">
                {question.question}
              </CardTitle>
              <div className="mt-2 text-sm text-gray-600">
                <strong>Categoria:</strong> {question.category}
              </div>
              {question.catechism_reference_suggestion && (
                <div className="mt-1 text-sm text-gray-600">
                  <strong>Referência sugerida:</strong> {question.catechism_reference_suggestion}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant="outline"
              className="mb-4"
            >
              {showAnswer ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Ocultar Resposta
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Mostrar Resposta
                </>
              )}
            </Button>

            {showAnswer && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-gray-700">
                  {question.answer || (
                    <div className="text-gray-500 italic">
                      Resposta ainda não preenchida. Esta pergunta está pronta para receber 
                      a resposta baseada no Catecismo da Igreja Católica.
                    </div>
                  )}
                </div>
                
                {question.citation && (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <blockquote className="text-sm text-gray-600 italic">
                      "{question.citation}"
                    </blockquote>
                    {question.citation_source && (
                      <cite className="text-xs text-gray-500 block mt-1">
                        — {question.citation_source}
                      </cite>
                    )}
                  </div>
                )}

                {question.final_catechism_reference && (
                  <div className="mt-2 text-xs text-gray-600">
                    <strong>Referência final:</strong> {question.final_catechism_reference}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <Button
              onClick={onNext}
              disabled={currentIndex === totalQuestions - 1}
            >
              Próxima
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;

