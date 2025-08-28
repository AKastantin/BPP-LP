import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ROICalculation {
  defaults: number;
  processing: number;
  compliance: number;
  total: number;
}

export default function ROICalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState("10000000");
  const [defaultRate, setDefaultRate] = useState("2.5");
  const [avgLoss, setAvgLoss] = useState("50000");
  const [savings, setSavings] = useState<ROICalculation>({
    defaults: 600000,
    processing: 180000,
    compliance: 120000,
    total: 900000
  });

  useEffect(() => {
    const volume = parseFloat(monthlyVolume) || 0;
    const rate = parseFloat(defaultRate) || 0;
    const loss = parseFloat(avgLoss) || 0;

    // Calculate annual savings based on inputs
    const annualVolume = volume * 12;
    const currentDefaults = annualVolume * (rate / 100);
    const currentLosses = currentDefaults * loss;
    
    // Assume 40% reduction in defaults with AI
    const defaultSavings = currentLosses * 0.4;
    
    // Processing savings (faster processing worth ~1.8% of volume)
    const processingSavings = annualVolume * 0.018;
    
    // Compliance savings (fixed benefit)
    const complianceSavings = Math.min(200000, annualVolume * 0.001);
    
    const totalSavings = defaultSavings + processingSavings + complianceSavings;

    setSavings({
      defaults: Math.round(defaultSavings),
      processing: Math.round(processingSavings),
      compliance: Math.round(complianceSavings),
      total: Math.round(totalSavings)
    });
  }, [monthlyVolume, defaultRate, avgLoss]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-card rounded-2xl p-8 border border-border" data-testid="roi-calculator">
      <h3 className="text-2xl font-bold mb-6 text-center">Calculate Your ROI</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="monthly-volume" className="text-sm font-medium mb-2 block">
              Monthly Loan Volume (£)
            </Label>
            <Input
              id="monthly-volume"
              type="text"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(e.target.value)}
              placeholder="10,000,000"
              data-testid="input-monthly-volume"
            />
          </div>
          <div>
            <Label htmlFor="default-rate" className="text-sm font-medium mb-2 block">
              Current Default Rate (%)
            </Label>
            <Input
              id="default-rate"
              type="text"
              value={defaultRate}
              onChange={(e) => setDefaultRate(e.target.value)}
              placeholder="2.5"
              data-testid="input-default-rate"
            />
          </div>
          <div>
            <Label htmlFor="avg-loss" className="text-sm font-medium mb-2 block">
              Average Loss per Default (£)
            </Label>
            <Input
              id="avg-loss"
              type="text"
              value={avgLoss}
              onChange={(e) => setAvgLoss(e.target.value)}
              placeholder="50,000"
              data-testid="input-avg-loss"
            />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-6">
          <h4 className="font-semibold mb-4">Projected Annual Savings</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Reduced Defaults (40%)</span>
              <span className="font-semibold text-chart-2" data-testid="savings-defaults">
                {formatCurrency(savings.defaults)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Faster Processing</span>
              <span className="font-semibold text-chart-2" data-testid="savings-processing">
                {formatCurrency(savings.processing)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Compliance Benefits</span>
              <span className="font-semibold text-chart-2" data-testid="savings-compliance">
                {formatCurrency(savings.compliance)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total Annual ROI</span>
                <span className="font-bold text-xl text-primary" data-testid="savings-total">
                  {formatCurrency(savings.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
