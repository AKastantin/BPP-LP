import { Button } from "@/components/ui/button";
import { CheckCircle, Brain, TrendingUp, Calculator, FileText, Wrench } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const services = [
  {
    header: "Machine learning models for property",
    description: "Advanced algorithms that analyze vast datasets to provide unprecedented insights into property markets, trends, and investment opportunities.",
    icon: Brain
  },
  {
    header: "Automated valuations, property appreciation rate estimates to date and ahead 1, 3 and 5 years",
    description: "Get instant, accurate property valuations and detailed appreciation forecasts to make informed investment and selling decisions.",
    icon: TrendingUp
  },
  {
    header: "Property market reports for small geographic areas and bespoke assemblages thereof",
    description: "Comprehensive market analysis for specific neighborhoods, postcodes, or custom geographic areas with detailed insights and trends.",
    icon: FileText
  },
  {
    header: "Software for capturing tax-deductible property-related expenses and transmitting these to tax preparers for maximum property tax efficiency",
    description: "Streamline expense tracking and maximize tax deductions with automated tools that integrate seamlessly with your tax preparation workflow.",
    icon: Calculator
  },
  {
    header: "Property investment and management software",
    description: "Tailored software solutions designed specifically for your investment strategy, portfolio management needs, and operational requirements.",
    icon: Wrench
  }
];

export default function ProductShowcase() {
  const handleContactClick = () => {
    trackEvent('click', 'product_showcase', 'contact_form');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Services offered
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Big Picture property offers the following services for property owners, landlords, regional lending institutions, estate agents, property journalists, and property investors:
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 mb-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-card rounded-lg p-6 border border-border shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`service-header-${index}`}>
                        {service.header}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`service-description-${index}`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Send us a message{" "}
              <button
                onClick={handleContactClick}
                className="text-primary hover:text-primary/80 underline font-medium transition-colors"
                data-testid="contact-link"
              >
                here
              </button>{" "}
              about any of these services and we will contact you within 24 business hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
