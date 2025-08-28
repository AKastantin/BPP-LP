import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const forecastSchema = z.object({
  property_address: z.string().min(5, "Please enter a valid address"),
  property_type: z.string().min(1, "Please select a property type"),
  bedrooms: z.string().min(1, "Please select number of bedrooms"),
  email: z.string().email("Please enter a valid email address")
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
  const { toast } = useToast();

  const form = useForm<ForecastData>({
    resolver: zodResolver(forecastSchema),
    defaultValues: {
      property_address: "",
      property_type: "",
      bedrooms: "",
      email: ""
    }
  });

  const forecastMutation = useMutation({
    mutationFn: async (data: ForecastData) => {
      const response = await apiRequest("POST", "/api/property-forecast", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setResults(data.results);
        trackEvent('form_submit', 'property_forecast', 'success');
        toast({
          title: "Forecast Generated",
          description: "Your property valuation and forecast are ready!",
        });
      } else {
        throw new Error(data.error);
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
          
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="property_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-property-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="detached">Detached House</SelectItem>
                      <SelectItem value="semi-detached">Semi-detached House</SelectItem>
                      <SelectItem value="terraced">Terraced House</SelectItem>
                      <SelectItem value="flat">Flat/Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-bedrooms">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email for detailed report" 
                    {...field} 
                    data-testid="input-email"
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
            {forecastMutation.isPending ? "Generating..." : "Get AI Valuation & Forecast"}
          </Button>
        </form>
      </Form>
      
      {results && (
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border" data-testid="forecast-results">
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
              <span className="text-muted-foreground">5 Year Forecast</span>
              <span className="font-semibold text-chart-2" data-testid="result-five-year">
                {formatCurrency(results.fiveYearForecast)} (+{results.fiveYearGrowth}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confidence Score</span>
              <span className="font-semibold" data-testid="result-confidence">
                {results.confidence}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
