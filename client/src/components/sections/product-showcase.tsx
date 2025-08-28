import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import ROICalculator from "@/components/ui/roi-calculator";
import { trackEvent } from "@/lib/analytics";

const audiences = [
  { id: "banks", label: "Banks & Lenders" },
  { id: "agents", label: "Estate Agents" },
  { id: "investors", label: "Property Investors" },
  { id: "owners", label: "Property Owners" }
];

const solutions = {
  banks: {
    title: "Precision Lending with AI-Powered Risk Assessment",
    description: "Minimize lending risks and regulatory compliance issues with accurate property valuations and comprehensive market intelligence.",
    features: [
      { title: "AI Valuations", description: "Instant, accurate property valuations with 95% accuracy", icon: CheckCircle },
      { title: "Risk Scoring", description: "Automated lending risk assessment and scoring", icon: Zap },
      { title: "Market Reports", description: "Hyper-local market activity and trend analysis", icon: TrendingUp },
      { title: "Compliance", description: "Regulatory compliance and audit trail support", icon: DollarSign }
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Financial trading floor with analysts working on data screens"
  },
  agents: {
    title: "Market Intelligence for Estate Agents",
    description: "Access hyper-local market data, buyer-seller matching algorithms, and property marketing optimization tools.",
    features: [
      { title: "Market Dashboard", description: "Real-time local market data and trends", icon: TrendingUp },
      { title: "Buyer Matching", description: "AI-powered buyer-seller demographic matching", icon: CheckCircle },
      { title: "Marketing Tools", description: "Data-driven property marketing optimization", icon: Zap },
      { title: "Volume Prediction", description: "Anticipate market activity and transaction volumes", icon: DollarSign }
    ],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Real estate professionals reviewing property data and market trends"
  },
  investors: {
    title: "Investment Intelligence & Portfolio Analytics",
    description: "Identify opportunities, optimize portfolios, and time the market with AI-powered investment insights.",
    features: [
      { title: "Opportunity ID", description: "Data-driven investment opportunity identification", icon: TrendingUp },
      { title: "Portfolio Analytics", description: "Track and optimize property portfolio performance", icon: BarChart3 },
      { title: "Market Timing", description: "Buy/sell timing recommendations", icon: Zap },
      { title: "ROI Forecasting", description: "Investment return predictions and scenarios", icon: DollarSign }
    ],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Investment portfolio analysis with charts and graphs"
  },
  owners: {
    title: "Property Value Insights for Owners",
    description: "Get accurate property valuations, market impact analysis, and selling optimization recommendations.",
    features: [
      { title: "Value Forecasts", description: "1, 3, and 5-year property value predictions", icon: TrendingUp },
      { title: "Market Impact", description: "How local trends affect your property value", icon: CheckCircle },
      { title: "Selling Optimization", description: "Best time and strategy to sell your property", icon: Zap },
      { title: "Neighborhood Insights", description: "Local market conditions and comparables", icon: DollarSign }
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    imageAlt: "Modern residential property with smart analytics overlay"
  }
};

export default function ProductShowcase() {
  const [activeAudience, setActiveAudience] = useState("banks");

  const handleAudienceChange = (audienceId: string) => {
    setActiveAudience(audienceId);
    trackEvent('click', 'product_showcase', `audience_${audienceId}`);
  };

  const handleEnterpriseDemo = () => {
    trackEvent('click', 'product_showcase', 'enterprise_demo');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSolution = solutions[activeAudience as keyof typeof solutions];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Solutions for Every Stakeholder
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored intelligence and tools designed specifically for the unique needs of each market participant.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {audiences.map((audience) => (
            <button
              key={audience.id}
              onClick={() => handleAudienceChange(audience.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeAudience === audience.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
              data-testid={`audience-tab-${audience.id}`}
            >
              {audience.label}
            </button>
          ))}
        </div>
        
        <div className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6" data-testid="solution-title">
                {currentSolution.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-8" data-testid="solution-description">
                {currentSolution.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {currentSolution.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="bg-card rounded-lg p-4 border border-border">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2" data-testid={`feature-title-${index}`}>
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground" data-testid={`feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <Button 
                className="inline-flex items-center"
                onClick={handleEnterpriseDemo}
                data-testid="button-enterprise-demo"
              >
                Get Enterprise Demo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={currentSolution.image}
                alt={currentSolution.imageAlt}
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="solution-image"
              />
              
              <div className="absolute inset-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-sm font-medium text-primary mb-2">Risk Assessment Dashboard</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Low Risk Properties</span>
                    <span className="text-xs font-medium text-chart-2">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Medium Risk</span>
                    <span className="text-xs font-medium text-chart-3">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">High Risk</span>
                    <span className="text-xs font-medium text-destructive">43</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {activeAudience === "banks" && <ROICalculator />}
        </div>
      </div>
    </section>
  );
}
