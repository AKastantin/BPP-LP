import { Button } from "@/components/ui/button";
import { Play, BarChart3 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handlePropertyForecast = () => {
    trackEvent('click', 'hero', 'property_forecast');
    document.getElementById('interactive-tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    trackEvent('click', 'hero', 'watch_demo');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Real Estate with
                <span className="text-primary"> AI-Powered Intelligence</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Reduce costly errors, accelerate decisions, and unlock market opportunities with hyper-local property insights powered by machine learning and big data.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="transform hover:scale-105 transition-all"
                onClick={handlePropertyForecast}
                data-testid="button-property-forecast"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Get Property Forecast
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchDemo}
                data-testid="button-watch-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="stat-properties">500K+</div>
                <div className="text-sm text-muted-foreground">Properties Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="stat-accuracy">95%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="stat-value">£50M+</div>
                <div className="text-sm text-muted-foreground">Transaction Value</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern city skyline representing urban property analytics" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
            
            <div className="absolute top-4 left-4 floating-card rounded-lg p-4 shadow-lg border border-border max-w-xs">
              <div className="text-sm font-medium text-primary">Market Prediction</div>
              <div className="text-lg font-bold">+12.5% Growth</div>
              <div className="text-xs text-muted-foreground">Next 12 months</div>
            </div>
            
            <div className="absolute bottom-4 right-4 floating-card rounded-lg p-4 shadow-lg border border-border max-w-xs">
              <div className="text-sm font-medium text-accent">AI Valuation</div>
              <div className="text-lg font-bold">£750,000</div>
              <div className="text-xs text-muted-foreground">95% confidence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
