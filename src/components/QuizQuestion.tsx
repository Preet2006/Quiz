import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Option {
  id: number;
  description: string;
  is_correct: boolean;
}

interface QuestionProps {
  question: string;
  options: Option[];
  onAnswer: (isCorrect: boolean) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizQuestion = ({
  question,
  options,
  onAnswer,
  currentQuestion,
  totalQuestions,
}: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionSelect = (optionId: number) => {
    if (!hasAnswered) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null || hasAnswered) return;
    
    const selectedAnswer = options.find((opt) => opt.id === selectedOption);
    if (!selectedAnswer) return;

    setHasAnswered(true);
    
    // Delay the onAnswer callback to allow the user to see the result
    setTimeout(() => {
      onAnswer(selectedAnswer.is_correct);
      setSelectedOption(null);
      setHasAnswered(false);
    }, 1500);
  };

  const progressPercentage = ((currentQuestion) / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-lg bg-white/10 text-white border-none shadow-xl animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-white/80">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <Progress 
            value={progressPercentage} 
            className="w-1/2 bg-white/20"
          />
        </div>
        <CardTitle className="text-xl font-bold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200 cursor-pointer",
                "hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]",
                "backdrop-blur-sm bg-white/5 border-white/10",
                selectedOption === option.id && !hasAnswered && "bg-white/20 border-white",
                hasAnswered && option.is_correct && "bg-green-500/50 border-green-400",
                hasAnswered && selectedOption === option.id && !option.is_correct && "bg-red-500/50 border-red-400"
              )}
            >
              <p className="text-base font-medium">{option.description}</p>
            </div>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={selectedOption === null || hasAnswered}
          className={cn(
            "w-full mt-6 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasAnswered ? "bg-gray-500 hover:bg-gray-600" : "bg-indigo-500 hover:bg-indigo-600",
            "transform hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {hasAnswered ? "Next Question..." : "Submit Answer"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;