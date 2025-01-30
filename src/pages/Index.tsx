import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QuizWelcome from "@/components/QuizWelcome";
import QuizQuestion from "@/components/QuizQuestion";
import QuizSummary from "@/components/QuizSummary";
import { useToast } from "@/components/ui/use-toast";

const mockQuizData = {
  title: "Genetics and Evolution Quiz",
  questions: [
    {
      id: 1,
      description: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is:",
      options: [
        { id: 1, description: "5'UUUU3'", is_correct: false },
        { id: 2, description: "3'UUUU5'", is_correct: false },
        { id: 3, description: "5'AAAU3'", is_correct: true },
        { id: 4, description: "3'AAAU5'", is_correct: false }
      ]
    },
    {
      id: 2,
      description: "Which of the following element is not found in nitrogenous base:",
      options: [
        { id: 5, description: "Nitrogen", is_correct: false },
        { id: 6, description: "Hydrogen", is_correct: false },
        { id: 7, description: "Carbon", is_correct: false },
        { id: 8, description: "Phosphorus", is_correct: true }
      ]
    },
    {
      id: 3,
      description: "Anticodons are found in:",
      options: [
        { id: 9, description: "mRNA", is_correct: false },
        { id: 10, description: "tRNA", is_correct: true },
        { id: 11, description: "rRNA", is_correct: false },
        { id: 12, description: "In all", is_correct: false }
      ]
    }
  ]
};

const fetchQuizData = async () => {
  return mockQuizData;
};

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const { data: quizData, isLoading } = useQuery({
    queryKey: ["quizData"],
    queryFn: fetchQuizData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl font-semibold animate-pulse">
          Loading your quiz...
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">Error loading quiz. Please try again.</div>
      </div>
    );
  }

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Well done! Keep going!",
        className: "bg-green-500 text-white border-none",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Don't worry, keep trying!",
        variant: "destructive",
      });
    }

    // Add a small delay before moving to the next question
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        // If it's the last question, we still want to show the result
        setCurrentQuestion(quizData.questions.length);
      }
    }, 1500);
  };

  const isComplete = currentQuestion >= quizData.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        {!started && (
          <QuizWelcome
            onStart={handleStart}
            title={quizData.title}
            description="Challenge yourself with this interactive genetics quiz! Test your knowledge and learn something new. Are you ready to begin?"
          />
        )}

        {started && !isComplete && (
          <div className="transform transition-all duration-500 ease-in-out">
            <QuizQuestion
              question={quizData.questions[currentQuestion].description}
              options={quizData.questions[currentQuestion].options}
              onAnswer={handleAnswer}
              currentQuestion={currentQuestion}
              totalQuestions={quizData.questions.length}
            />
          </div>
        )}

        {isComplete && (
          <div className="transform transition-all duration-500 ease-in-out">
            <QuizSummary
              score={score}
              totalQuestions={quizData.questions.length}
              onRestart={handleStart}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;