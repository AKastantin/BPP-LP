import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

interface PropertyValueData {
  year: string;
  value: number;
}

interface PropertyValueChartProps {
  data: PropertyValueData[];
  currentValue: number;
}

const chartConfig = {
  value: {
    label: "Property Value",
    color: "#3b82f6", // Blue color
  },
};

export default function PropertyValueChart({ data, currentValue }: PropertyValueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };

  const formatTooltipLabel = (label: string) => {
    return `Year: ${label}`;
  };

  return (
    <div className="w-full h-80 bg-card rounded-lg border border-border p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Property Value Forecast</h4>
        <p className="text-sm text-muted-foreground">
          Projected property value over time
        </p>
      </div>
      
      <ChartContainer config={chartConfig} className="h-64">
        <LineChart data={data} margin={{ top: 20, right: 40, left: 60, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            stroke="#374151"
            fontSize={12}
            tick={{ fill: "#374151" }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
          />
          <YAxis 
            stroke="#374151"
            fontSize={12}
            tick={{ fill: "#374151" }}
            axisLine={{ stroke: "#374151" }}
            tickLine={{ stroke: "#374151" }}
            tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
            domain={['dataMin - 50000', 'dataMax + 50000']}
          />
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value: any) => formatTooltipValue(value)}
                labelFormatter={formatTooltipLabel}
              />
            }
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2, fill: "white" }}
            connectNulls={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
