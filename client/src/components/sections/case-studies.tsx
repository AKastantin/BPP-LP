import { Building2, TrendingUp, Target } from "lucide-react";

const caseStudies = [
  {
    title: "Regional Bank",
    subtitle: "£500M+ loan portfolio",
    quote: "Big Picture Property reduced our property valuation time from 2 weeks to 2 minutes, while improving accuracy by 30%. We've prevented £2.3M in potential losses.",
    metrics: [
      { value: "60%", label: "Faster Processing" },
      { value: "£2.3M", label: "Losses Prevented" }
    ],
    icon: Building2
  },
  {
    title: "Estate Agency Group",
    subtitle: "50+ branches nationwide",
    quote: "The hyper-local market intelligence helped us identify emerging hotspots 6 months before competitors. Our sales increased 40% year-over-year.",
    metrics: [
      { value: "40%", label: "Sales Increase" },
      { value: "6 months", label: "Market Advantage" }
    ],
    icon: TrendingUp
  },
  {
    title: "Property Investment Fund",
    subtitle: "£100M under management",
    quote: "AI-powered market timing helped us optimize our portfolio. We achieved 18% returns vs. market average of 8% by using predictive analytics.",
    metrics: [
      { value: "18%", label: "Portfolio Returns" },
      { value: "125%", label: "vs Market" }
    ],
    icon: Target
  }
];


export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Proven Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how industry leaders are using Big Picture Property to make better decisions, reduce risks, and increase profits.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => {
            const IconComponent = study.icon;
            return (
              <div key={index} className="bg-card rounded-xl p-6 shadow-lg border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold" data-testid={`case-study-title-${index}`}>
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`case-study-subtitle-${index}`}>
                      {study.subtitle}
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground mb-4" data-testid={`case-study-quote-${index}`}>
                  "{study.quote}"
                </blockquote>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex}>
                      <div className="font-semibold text-primary" data-testid={`metric-value-${index}-${metricIndex}`}>
                        {metric.value}
                      </div>
                      <div className="text-muted-foreground" data-testid={`metric-label-${index}-${metricIndex}`}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
