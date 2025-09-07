import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const updateOptions = [
  {
    id: "market_activity",
    label: "Market activity updates for my postal district (as in the Redditch Standard)",
    description: "Regular reports on local property market trends and activity"
  },
  {
    id: "current_value",
    label: "Estimates of the current value of my property",
    description: "Monthly updates on your property's estimated market value"
  },
  {
    id: "future_value",
    label: "Estimates of the future value of my property in 1, 3, and 5 years (forecast)",
    description: "Forward-looking predictions for your property's value"
  },
  {
    id: "comparison",
    label: "Comparison between the appreciation rate of my property and savings accounts, stocks and/or bonds",
    description: "Investment performance analysis comparing property to other assets"
  }
];

export default function PropertyUpdatesSurvey() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherSelected, setOtherSelected] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const surveyMutation = useMutation({
    mutationFn: async (data: {
      selectedOptions: string[];
      additionalInfo?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
    }) => {
      const response = await apiRequest("POST", "/api/property-updates-survey", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
        trackEvent('form_submit', 'property_updates_survey', 'completed');
        toast({
          title: "Preferences Saved",
          description: "Thank you! We'll send you updates based on your preferences.",
        });
      } else {
        throw new Error(data.error);
      }
    },
    onError: (error) => {
      trackEvent('form_submit', 'property_updates_survey', 'error');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save preferences",
        variant: "destructive",
      });
    },
  });

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      const newOptions = [...selectedOptions, optionId];
      setSelectedOptions(newOptions);
      if (newOptions.length === 1) {
        setShowEmailForm(true);
      }
    } else {
      const newOptions = selectedOptions.filter(id => id !== optionId);
      setSelectedOptions(newOptions);
      if (newOptions.length === 0) {
        setShowEmailForm(false);
      }
    }
    trackEvent('checkbox_toggle', 'property_updates', `${optionId}_${checked}`);
  };

  const handleOtherChange = (checked: boolean) => {
    setOtherSelected(checked);
    if (checked) {
      setShowEmailForm(true);
      // Add "other" to selectedOptions so it appears in the main list
      if (!selectedOptions.includes("other")) {
        setSelectedOptions([...selectedOptions, "other"]);
      }
    } else {
      // Remove "other" from selectedOptions
      setSelectedOptions(selectedOptions.filter(id => id !== "other"));
      if (selectedOptions.length === 0) {
        setShowEmailForm(false);
      }
    }
    trackEvent('checkbox_toggle', 'property_updates', `other_${checked}`);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!firstName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your first name.",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    surveyMutation.mutate({
      selectedOptions,
      additionalInfo: additionalInfo || undefined,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email: email || undefined
    });
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Preferences Saved!</h3>
        <p className="text-muted-foreground">
          We'll start sending you property updates based on your selected preferences. You can opt out anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Tell us if you want to receive updates on a specific property
        </h3>
        <p className="text-muted-foreground mb-6">
          Do you want to receive periodic emails with any of this info? (Tick as many as you like; opt out when you wish):
        </p>
        
        <div className="space-y-4">
          {updateOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="mt-0.5">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                  data-testid={`checkbox-${option.id}`}
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label htmlFor={option.id} className="cursor-pointer font-medium leading-tight">
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="mt-0.5">
              <Checkbox
                id="other"
                checked={otherSelected}
                onCheckedChange={handleOtherChange}
                data-testid="checkbox-other"
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label htmlFor="other" className="cursor-pointer font-medium leading-tight">
                Something else
              </Label>
              <p className="text-sm text-muted-foreground">
                Other property information you'd like to receive
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEmailForm && (
        <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
          <h4 className="font-semibold">Contact Information</h4>
          <p className="text-sm text-muted-foreground">
            We will only send you relevant property information based on your preferences. No spam, ever.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                data-testid="input-first-name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Surname</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your surname"
                data-testid="input-last-name"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              data-testid="input-email-updates"
              required
            />
          </div>
          <div>
            <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Please explain more what you want or what exactly interests you..."
              data-testid="textarea-additional-info"
              className="min-h-[80px]"
            />
          </div>
        </div>
      )}

      <Button 
        onClick={handleSubmit}
        disabled={surveyMutation.isPending || (selectedOptions.length === 0 && !otherSelected)}
        className="w-full"
        data-testid="button-save-preferences"
      >
        {surveyMutation.isPending ? "Saving..." : "Save My Preferences"}
      </Button>
    </div>
  );
}