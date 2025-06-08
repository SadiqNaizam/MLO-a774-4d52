import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, BarChart, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, Area } from 'recharts';
import { cn } from '@/lib/utils';

// A generic data point structure, adjust as needed for your actual data
interface DataPoint {
  name: string; // Typically the X-axis value (e.g., date, category)
  [key: string]: number | string; // Y-axis values
}

interface ChartSeries {
  dataKey: string;
  stroke?: string; // Color for line/area/bar
  fill?: string; // Fill color for area/bar
  name?: string; // Name for legend
}

interface InteractiveDataChartProps {
  data: DataPoint[];
  series: ChartSeries[];
  xAxisDataKey: string;
  chartType?: 'line' | 'bar' | 'area';
  title?: string;
  description?: string;
  className?: string;
  aspectRatio?: number; // e.g. 16/9 or 21/9 for width/height ratio
  yAxisLabel?: string;
  xAxisLabel?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  tooltipFormatter?: (value: any, name: any, props: any) => [React.ReactNode, React.ReactNode];
  yAxisFormatter?: (value: any) => string;
}

const InteractiveDataChart: React.FC<InteractiveDataChartProps> = ({
  data,
  series,
  xAxisDataKey,
  chartType = 'line',
  title,
  description,
  className,
  aspectRatio = 16 / 9,
  yAxisLabel,
  xAxisLabel,
  showLegend = true,
  showGrid = true,
  tooltipFormatter,
  yAxisFormatter
}) => {
  console.log("Rendering InteractiveDataChart:", title, "Type:", chartType, "Data points:", data.length);

  if (!data || data.length === 0) {
    return (
      <Card className={cn("flex items-center justify-center h-64", className)}>
        <p className="text-muted-foreground">No data available for the chart.</p>
      </Card>
    );
  }

  const ChartComponent =
    chartType === 'bar' ? BarChart :
    chartType === 'area' ? AreaChart :
    LineChart; // Default to LineChart

  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" aspect={aspectRatio}>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: -10, bottom: xAxisLabel ? 20 : 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />}
            <XAxis 
              dataKey={xAxisDataKey} 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -15, dy: 10, fontSize: 12, fill: "hsl(var(--muted-foreground))" } : undefined}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={yAxisFormatter || ((value) => typeof value === 'number' ? value.toLocaleString() : String(value))}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', dx: -10, fontSize: 12, fill: "hsl(var(--muted-foreground))" } : undefined}
            />
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
            {series.map((s) => {
              const commonProps = {
                key: s.dataKey,
                dataKey: s.dataKey,
                name: s.name || s.dataKey,
                stroke: s.stroke || 'hsl(var(--primary))',
                fill: s.fill || 'hsl(var(--primary))',
                type: "monotone" as const, // for smoother lines/areas
              };
              if (chartType === 'line') return <Line {...commonProps} strokeWidth={2} dot={{ r: 3, strokeWidth:1 }} activeDot={{ r: 5 }} />;
              if (chartType === 'bar') return <Bar {...commonProps} radius={[4, 4, 0, 0]} />;
              if (chartType === 'area') return <Area {...commonProps} strokeWidth={2} fillOpacity={0.3} />;
              return null;
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InteractiveDataChart;