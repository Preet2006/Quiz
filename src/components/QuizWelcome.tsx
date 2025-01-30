import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizWelcomeProps {
  onStart: () => void;
  title: string;
  description: string;
}

const QuizWelcome = ({ onStart, title, description }: QuizWelcomeProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onStart} className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizWelcome;