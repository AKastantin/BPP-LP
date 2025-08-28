import { AlertTriangle, Info, CheckCircle, Cloud } from "lucide-react";

const painPoints = [
  {
    title: "Banks & Lenders",
    description: "Unreliable valuations lead to poor lending decisions, increased defaults, and regulatory compliance issues.",
    statistic: "£2.3B",
    statLabel: "Annual write-offs",
    icon: AlertTriangle
  },
  {
    title: "Estate Agents",
    description: "Limited market intelligence results in missed opportunities and inefficient buyer-seller matching.",
    statistic: "30%",
    statLabel: "Commission lost",
    icon: Info
  },
  {
    title: "Property Investors",
    description: "Poor investment decisions based on incomplete data result in significant capital losses.",
    statistic: "£8.7B",
    statLabel: "Investment losses",
    icon: CheckCircle
  },
  {
    title: "Property Owners",
    description: "Lack of accurate property insights leads to suboptimal selling decisions and missed value.",
    statistic: "£15K",
    statLabel: "Average undervalue",
    icon: Cloud
  }
];

export default function ProblemStatement() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold">
            The £100 Billion Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real estate markets suffer from information asymmetries, outdated valuation methods, and inefficient decision-making processes that cost the industry billions annually.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2" data-testid={`problem-title-${index}`}>
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3" data-testid={`problem-description-${index}`}>
                  {point.description}
                </p>
                <div className="text-2xl font-bold text-destructive" data-testid={`problem-stat-${index}`}>
                  {point.statistic}
                </div>
                <div className="text-xs text-muted-foreground" data-testid={`problem-stat-label-${index}`}>
                  {point.statLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
