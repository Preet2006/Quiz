import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from 'canvas-confetti';

interface QuizSummaryProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizSummary = ({ score, totalQuestions, onRestart }: QuizSummaryProps) => {
  const percentage = (score / totalQuestions) * 100;
  
  const handleRestart = () => {
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onRestart();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-lg bg-white/10 text-white border-none shadow-xl animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Quiz Complete! 🎉</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <p className="text-7xl font-bold text-white mb-2 animate-slide-in">
              {percentage.toFixed(0)}%
            </p>
            <p className="text-xl text-white/80">
              You scored {score} out of {totalQuestions}
            </p>
          </div>
          <div className="space-y-2">
            {percentage >= 70 && (
              <p className="text-green-400 text-lg animate-fade-in">
                🌟 Excellent work! You've mastered this topic!
              </p>
            )}
            {percentage >= 40 && percentage < 70 && (
              <p className="text-yellow-400 text-lg animate-fade-in">
                👍 Good effort! Keep practicing to improve!
              </p>
            )}
            {percentage < 40 && (
              <p className="text-red-400 text-lg animate-fade-in">
                📚 Keep learning! You'll do better next time!
              </p>
            )}
          </div>
        </div>
        <Button 
          onClick={handleRestart} 
          className="w-full bg-white/20 hover:bg-white/30 text-white border-none transform transition-all duration-200 hover:scale-105"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizSummary;