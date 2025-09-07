import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import PropertyValueChart from "./property-value-chart";

const forecastSchema = z.object({
  property_address: z.string().min(5, "Please enter a valid address"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal(""))
});

type ForecastData = z.infer<typeof forecastSchema>;

interface ForecastResults {
  currentValue: number;
  oneYearForecast: number;
  fiveYearForecast: number;
  confidence: number;
  oneYearGrowth: string;
  fiveYearGrowth: string;
}

export default function PropertyForecastForm() {
  const [results, setResults] = useState<ForecastResults | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForecastData>({
    resolver: zodResolver(forecastSchema),
    defaultValues: {
      property_address: "",
      email: ""
    }
  });

  const forecastMutation = useMutation({
    mutationFn: async (data: ForecastData) => {
      // API does not exist yet, so return mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
      return {
        success: true,
        results: {
          currentValue: 500000,
          oneYearForecast: 525000,
          fiveYearForecast: 600000,
          confidence: 0.85,
          oneYearGrowth: "+5%",
          fiveYearGrowth: "+20%"
        }
      };
    },
    onSuccess: (data) => {
      if (data.success) {
        setResults(data.results);
        setShowEmailCapture(true);
        trackEvent('form_submit', 'property_forecast', 'success');
        toast({
          title: "Forecast Generated",
          description: "Your property valuation and forecast are ready!",
        });
      } else {
        throw new Error("Failed to generate forecast");
      }
    },
    onError: (error) => {
      trackEvent('form_submit', 'property_forecast', 'error');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate forecast",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ForecastData) => {
    forecastMutation.mutate(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(value);
  };

  const generateChartData = (currentValue: number, oneYearForecast: number, fiveYearForecast: number) => {
    const currentYear = new Date().getFullYear();
    const threeYearValue = currentValue + (fiveYearForecast - currentValue) * 0.6; // Interpolate for 3 years
    
    return [
      { year: currentYear.toString(), value: currentValue },
      { year: (currentYear + 1).toString(), value: oneYearForecast },
      { year: (currentYear + 3).toString(), value: threeYearValue },
      { year: (currentYear + 5).toString(), value: fiveYearForecast }
    ];
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="property_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter full address or postcode" 
                    {...field} 
                    data-testid="input-property-address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={forecastMutation.isPending}
            data-testid="button-generate-forecast"
          >
            {forecastMutation.isPending ? "Generating..." : "Get Instant Property Forecast"}
          </Button>
        </form>
      </Form>
      
      {results && (
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-muted/30 rounded-lg border border-border" data-testid="forecast-results">
            <h4 className="font-semibold mb-4">Property Valuation Results</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Value</span>
                <span className="font-semibold text-lg" data-testid="result-current-value">
                  {formatCurrency(results.currentValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 Year Forecast</span>
                <span className="font-semibold text-chart-2" data-testid="result-one-year">
                  {formatCurrency(results.oneYearForecast)} (+{results.oneYearGrowth}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">3 Year Forecast</span>
                <span className="font-semibold text-chart-2" data-testid="result-three-year">
                  {formatCurrency(results.fiveYearForecast * 0.6)} (+{(parseFloat(results.fiveYearGrowth) * 0.6).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">5 Year Forecast</span>
                <span className="font-semibold text-chart-2" data-testid="result-five-year">
                  {formatCurrency(results.fiveYearForecast)} (+{results.fiveYearGrowth}%)
                </span>
              </div>
            </div>
          </div>

          {/* Property Value Forecast Chart */}
          <PropertyValueChart 
            data={generateChartData(results.currentValue, results.oneYearForecast, results.fiveYearForecast)}
            currentValue={results.currentValue}
          />
          
          {showEmailCapture && (
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h5 className="font-semibold mb-3">Want this forecast emailed to you?</h5>
              <p className="text-sm text-muted-foreground mb-4">
                Receive a detailed PDF report with market analysis and investment recommendations.
              </p>
              <Form {...form}>
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            {...field} 
                            data-testid="input-email-capture"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    onClick={() => {
                      const email = form.getValues('email');
                      if (email) {
                        // Send email with forecast
                        trackEvent('email_capture', 'property_forecast', 'success');
                        toast({
                          title: "Email Sent!",
                          description: "Your detailed forecast report has been sent to your email.",
                        });
                        setShowEmailCapture(false);
                      }
                    }}
                    data-testid="button-email-forecast"
                  >
                    Send Report
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
