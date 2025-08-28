import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const questions = [
  {
    id: "selling_timeline",
    question: "Are you considering selling your property?",
    options: [
      { value: "within_12_months", label: "Yes, within the next 12 months" },
      { value: "1_3_years", label: "Maybe, in 1-3 years" },
      { value: "no_plans", label: "No immediate plans" },
      { value: "curious", label: "Just curious about value" }
    ]
  },
  {
    id: "main_concern",
    question: "What's your main concern about selling?",
    options: [
      { value: "timing", label: "Getting the timing right" },
      { value: "price", label: "Achieving the right price" },
      { value: "market", label: "Understanding market conditions" },
      { value: "process", label: "The selling process complexity" }
    ]
  },
  {
    id: "property_improvements",
    question: "Have you made any significant improvements recently?",
    options: [
      { value: "major_renovation", label: "Major renovation (kitchen, bathroom)" },
      { value: "extension", label: "Extension or loft conversion" },
      { value: "minor_updates", label: "Minor updates (decorating, flooring)" },
      { value: "none", label: "No recent improvements" }
    ]
  },
  {
    id: "market_knowledge",
    question: "How would you rate your knowledge of the local property market?",
    options: [
      { value: "excellent", label: "Excellent - I follow it closely" },
      { value: "good", label: "Good - I have some knowledge" },
      { value: "basic", label: "Basic - I know a little" },
      { value: "none", label: "Poor - I don't know much" }
    ]
  }
];

export default function SurveyForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const surveyMutation = useMutation({
    mutationFn: async (data: { responses: Record<string, string>; completed: boolean; email?: string }) => {
      const response = await apiRequest("POST", "/api/survey", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setCompleted(true);
        trackEvent('form_submit', 'survey', 'completed');
        toast({
          title: "Survey Completed",
          description: "Thank you for your responses! We'll send you personalized insights soon.",
        });
      } else {
        throw new Error(data.error);
      }
    },
    onError: (error) => {
      trackEvent('form_submit', 'survey', 'error');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit survey",
        variant: "destructive",
      });
    },
  });

  const handleAnswerSelect = (questionId: string, value: string) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    trackEvent('survey_question', 'answered', `${questionId}_${value}`);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question, show email input
      setCurrentQuestion(questions.length);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    surveyMutation.mutate({
      responses,
      completed: true,
      email: email || undefined
    });
  };

  const progress = ((currentQuestion + 1) / (questions.length + 1)) * 100;
  const currentQuestionData = questions[currentQuestion];

  if (completed) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We'll analyze your responses and send personalized property insights to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full bg-muted rounded-full h-2" data-testid="survey-progress">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {currentQuestion < questions.length ? (
        <div data-testid={`survey-question-${currentQuestion}`}>
          <h4 className="font-semibold mb-4">
            {currentQuestion + 1}. {currentQuestionData.question}
          </h4>
          <RadioGroup 
            value={responses[currentQuestionData.id] || ""} 
            onValueChange={(value) => handleAnswerSelect(currentQuestionData.id, value)}
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value}
                  data-testid={`survey-option-${currentQuestion}-${index}`}
                />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ) : (
        <div data-testid="survey-email-step">
          <h4 className="font-semibold mb-4">
            Finally, where should we send your personalized insights?
          </h4>
          <Input
            type="email"
            placeholder="Enter your email address (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-survey-email"
          />
        </div>
      )}
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          data-testid="button-survey-previous"
        >
          Previous
        </Button>
        
        {currentQuestion < questions.length ? (
          <Button 
            onClick={handleNext}
            disabled={currentQuestion < questions.length && !responses[currentQuestionData?.id]}
            data-testid="button-survey-next"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next Question"}
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={surveyMutation.isPending}
            data-testid="button-survey-submit"
          >
            {surveyMutation.isPending ? "Submitting..." : "Get My Insights"}
          </Button>
        )}
      </div>
    </div>
  );
}
