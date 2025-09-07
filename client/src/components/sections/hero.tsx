import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart3 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handlePropertyForecast = () => {
    trackEvent('click', 'hero', 'property_forecast');
    document.getElementById('interactive-tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetInTouch = () => {
    trackEvent('click', 'hero', 'get_in_touch');
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
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                A property is a place to live but also an investment for many people. Often it is their biggest investment. Is my property a good or a bad investment? Is it a better investment than putting money in a savings account (or into stocks, or into bonds)?
              </p>
              <p className="text-lg text-muted-foreground">
                We want to help property owners (and those aspiring to own) answer these questions. We do this using 'big' data, modern statistical models, and lots of computation.
              </p>
              <div className="pt-4">
                <a 
                  href="#data-methodology" 
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                  onClick={() => {
                    trackEvent('click', 'hero', 'see_how_we_do_this');
                    document.getElementById('data-methodology')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See how we do this →
                </a>
              </div>
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
                onClick={handleGetInTouch}
                data-testid="button-get-in-touch"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get in Touch
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
              src="/assets/rural-house-hero.png" 
              alt="Rural house in Redditch, UK representing property investment opportunities" 
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
