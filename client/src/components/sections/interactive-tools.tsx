import PropertyForecastForm from "@/components/ui/property-forecast-form";
import SurveyForm from "@/components/ui/survey-form";
import { BarChart3, ClipboardList } from "lucide-react";

export default function InteractiveTools() {
  return (
    <section id="interactive-tools" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Try Our AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of our platform with these interactive demonstrations. Get instant insights and see how our AI can transform your property decisions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Property Value Forecast</h3>
              <p className="text-muted-foreground">Get an instant AI-powered valuation and 5-year forecast for any UK property</p>
            </div>
            
            <PropertyForecastForm />
          </div>
          
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Property Owner Assessment</h3>
              <p className="text-muted-foreground">Answer a few questions to get personalized property insights and selling recommendations</p>
            </div>
            
            <SurveyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
