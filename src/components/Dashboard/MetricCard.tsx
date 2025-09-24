import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricData } from '../../data/mockData';

interface MetricCardProps {
  metric: MetricData;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getTrendIcon = () => {
    if (!metric.change) return <Minus className="h-4 w-4 text-gray-400" />;
    if (metric.change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = () => {
    if (!metric.change) return 'text-gray-500';
    return metric.change > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="metric-card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
        {getTrendIcon()}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
        {metric.unit && (
          <span className="text-sm text-gray-500">{metric.unit}</span>
        )}
      </div>
      {metric.change && (
        <div className="mt-2">
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs. mese precedente</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;