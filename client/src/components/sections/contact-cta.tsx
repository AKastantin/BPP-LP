import { Button } from "@/components/ui/button";
import { Play, BarChart3 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ContactCTA() {
  const handleBookDemo = () => {
    trackEvent('click', 'contact_cta', 'book_demo');
    // Could integrate with calendly or similar booking system
  };

  const handleTryTool = () => {
    trackEvent('click', 'contact_cta', 'try_tool');
    document.getElementById('interactive-tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground">
            Ready to Transform Your Real Estate Decisions?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of industry leaders who are already using AI to make smarter, faster, and more profitable property decisions.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground mb-2" data-testid="cta-stat-accuracy">
                95%
              </div>
              <div className="text-primary-foreground/80">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground mb-2" data-testid="cta-stat-processing">
                60%
              </div>
              <div className="text-primary-foreground/80">Faster Processing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground mb-2" data-testid="cta-stat-value">
                £50M+
              </div>
              <div className="text-primary-foreground/80">Transactions Analyzed</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-background text-primary font-bold transform hover:scale-105 transition-all"
              onClick={handleBookDemo}
              data-testid="button-book-demo"
            >
              <Play className="w-5 h-5 mr-2" />
              Book a Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground font-bold hover:bg-primary-foreground hover:text-primary transition-all"
              onClick={handleTryTool}
              data-testid="button-try-tool"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Try Free Tool
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/70">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
