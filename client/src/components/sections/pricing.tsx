import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const plans = [
  {
    name: "Basic",
    description: "For property owners",
    price: "£29",
    period: "per property report",
    features: [
      "AI property valuation",
      "1, 3, 5-year forecasts",
      "Local market insights",
      "Email support"
    ],
    buttonText: "Get Report",
    popular: false
  },
  {
    name: "Professional",
    description: "For estate agents",
    price: "£199",
    period: "per month",
    features: [
      "50 property reports/month",
      "Market intelligence dashboard",
      "Buyer-seller matching",
      "White-label reports",
      "Phone support"
    ],
    buttonText: "Start Free Trial",
    popular: false
  },
  {
    name: "Enterprise",
    description: "For banks & investors",
    price: "£999",
    period: "per month",
    features: [
      "Unlimited property reports",
      "Portfolio risk analytics",
      "API access",
      "Custom integrations",
      "Dedicated support"
    ],
    buttonText: "Contact Sales",
    popular: true
  },
  {
    name: "API Access",
    description: "For developers",
    price: "£0.50",
    period: "per API call",
    features: [
      "RESTful API access",
      "Real-time data feeds",
      "Developer documentation",
      "Technical support"
    ],
    buttonText: "View Docs",
    popular: false
  }
];

const faqs = [
  {
    question: "How accurate are your property valuations?",
    answer: "Our AI models achieve 95% accuracy on property valuations, significantly outperforming traditional methods which typically achieve 65-75% accuracy."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, all subscriptions can be cancelled at any time with no long-term commitments or cancellation fees."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, we work with enterprise clients to create custom solutions, integrations, and white-label products tailored to their specific needs."
  },
  {
    question: "What data sources do you use?",
    answer: "We aggregate data from 50+ sources including Land Registry, ONS, planning applications, economic indicators, and real-time market feeds."
  },
  {
    question: "Is my data secure and compliant?",
    answer: "Yes, we are GDPR compliant and use enterprise-grade security. All data is encrypted and we maintain strict data protection protocols."
  },
  {
    question: "Do you offer API documentation?",
    answer: "Yes, we provide comprehensive API documentation, code samples, and developer support for seamless integration."
  }
];

export default function Pricing() {
  const handlePlanClick = (planName: string) => {
    trackEvent('click', 'pricing', `plan_${planName.toLowerCase()}`);
    
    if (planName === "Enterprise" || planName === "API Access") {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI technology with different levels of access and support.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 border relative ${
                plan.popular 
                  ? 'bg-gradient-to-b from-primary/5 to-accent/5 border-2 border-primary' 
                  : 'bg-card border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" data-testid={`plan-name-${index}`}>
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`plan-description-${index}`}>
                  {plan.description}
                </p>
                <div className="text-3xl font-bold" data-testid={`plan-price-${index}`}>
                  {plan.price}
                </div>
                <div className="text-muted-foreground text-sm" data-testid={`plan-period-${index}`}>
                  {plan.period}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6 text-sm">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-4 h-4 text-chart-2 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handlePlanClick(plan.name)}
                data-testid={`button-plan-${index}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="bg-card rounded-2xl p-8 border border-border">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className={index < 3 ? '' : 'md:col-start-2'}>
                <h4 className="font-semibold mb-2" data-testid={`faq-question-${index}`}>
                  {faq.question}
                </h4>
                <p className="text-muted-foreground text-sm" data-testid={`faq-answer-${index}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
