import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database, Brain, FileText, PieChart, TrendingUp } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function DataMethodology() {
  const handleContactClick = () => {
    trackEvent('click', 'data_methodology', 'contact_more_info');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const dataSources = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Land Registry Data",
      description: "Residential property transactions data published by the Land Registry"
    },
    {
      icon: <PieChart className="w-8 h-8 text-primary" />,
      title: "Census Data",
      description: "Small geographic area statistics from the Office of National Statistics"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Price Inflation Data",
      description: "Economic indicators published by the Bank of England"
    }
  ];

  return (
    <section id="data-methodology" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Where Do The Numbers Come From?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            We use different data sources to uncover which properties are good and bad investments. 
            All data are used under the Open Government License v3.0 arrangement where required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {dataSources.map((source, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {source.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{source.title}</h3>
              <p className="text-muted-foreground">{source.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Machine Learning Models</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We create statistical models with the data that let us predict the current value of individual properties. 
              We create models that estimate past appreciation rates, and which forecast future appreciation rates.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Machine learning models are part of our toolbox. The quality of a machine learning model, like any 
              statistical estimate, depends on a lot of small, human decisions related to data selection, data cleaning, 
              variable construction, model fitting, model estimation, and results interpretation.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Local Market Focus</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The best models in the residential property work tend to use local data to make predictions about 
              local property market changes. We do this, and it is why we can produce property market reports 
              for specific local areas (like Redditch and Bromsgrove).
            </p>
            <div className="pt-4">
              <Button 
                onClick={handleContactClick}
                data-testid="button-learn-more-methodology"
                className="transform hover:scale-105 transition-all"
              >
                Learn More About Our Methods
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}