import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'; // Example icons for change

interface MetricDisplayCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  change?: string; // e.g., "+5.2%" or "-100"
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
  footerText?: string;
}

const MetricDisplayCard: React.FC<MetricDisplayCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
  changeType = 'neutral',
  className,
  footerText,
}) => {
  console.log("Rendering MetricDisplayCard:", title, "Value:", value);

  const ChangeIcon = changeType === 'positive' ? ArrowUp : changeType === 'negative' ? ArrowDown : Minus;
  const changeColor = changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {change && (
          <div className={cn("text-xs flex items-center pt-1", changeColor)}>
            <ChangeIcon className="mr-1 h-3 w-3" />
            {change}
          </div>
        )}
        {footerText && <p className="text-xs text-muted-foreground pt-2">{footerText}</p>}
      </CardContent>
    </Card>
  );
};

export default MetricDisplayCard;