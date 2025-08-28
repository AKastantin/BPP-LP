import { Database, Lightbulb, BarChart3 } from "lucide-react";

const pillars = [
  {
    title: "Big Data Collection",
    description: "Aggregate data from property transactions, planning applications, economic indicators, and 50+ additional sources.",
    features: [
      "500M+ property records",
      "Real-time market feeds",
      "Economic & social indicators"
    ],
    icon: Database,
    color: "primary"
  },
  {
    title: "Machine Learning Models",
    description: "Advanced algorithms trained on historical patterns to identify market trends and predict property values.",
    features: [
      "Neural networks & deep learning",
      "Ensemble modeling techniques",
      "Continuous model refinement"
    ],
    icon: Lightbulb,
    color: "accent"
  },
  {
    title: "Predictive Analytics",
    description: "Forward-looking insights and forecasts that enable proactive decision-making and risk management.",
    features: [
      "1, 3, 5-year forecasts",
      "Risk assessment scores",
      "Market timing insights"
    ],
    icon: BarChart3,
    color: "chart-2"
  }
];

const comparisons = [
  { metric: "Valuation Accuracy", traditional: 65, ai: 95, traditionalLabel: "65%", aiLabel: "95%" },
  { metric: "Processing Time", traditional: 20, ai: 95, traditionalLabel: "7-14 days", aiLabel: "Real-time" },
  { metric: "Data Sources", traditional: 30, ai: 100, traditionalLabel: "5-10", aiLabel: "50+" }
];

export default function SolutionOverview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Our Three-Pillar Approach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining massive data ingestion, advanced machine learning, and predictive analytics to revolutionize real estate decision-making.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-lg border border-border relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${pillar.color}/5 rounded-full -mr-16 -mt-16`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-${pillar.color}/10 rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className={`w-8 h-8 text-${pillar.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" data-testid={`pillar-title-${index}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`pillar-description-${index}`}>
                    {pillar.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {pillar.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className={`w-1.5 h-1.5 bg-${pillar.color} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
          <h3 className="text-2xl font-bold mb-8 text-center">Traditional vs. AI-Powered Approach</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Traditional Methods</h4>
              <div className="space-y-4">
                {comparisons.map((comparison, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{comparison.metric}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-muted rounded-full h-2 mr-3">
                        <div 
                          className="bg-destructive h-2 rounded-full" 
                          style={{ width: `${comparison.traditional}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium" data-testid={`traditional-${index}`}>
                        {comparison.traditionalLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary">AI-Powered Approach</h4>
              <div className="space-y-4">
                {comparisons.map((comparison, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{comparison.metric}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-muted rounded-full h-2 mr-3">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${comparison.ai}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium" data-testid={`ai-${index}`}>
                        {comparison.aiLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
