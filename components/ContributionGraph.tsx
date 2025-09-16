import React from 'react';
import { ActivityLog } from '../types';

interface ContributionGraphProps {
  activities: ActivityLog[];
  onDayClick: (date: string, event: React.MouseEvent<HTMLDivElement>) => void;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ activities, onDayClick }) => {
  const contributions: { [key: string]: number } = {};
  for (const activity of activities) {
    if (!contributions[activity.date]) {
      contributions[activity.date] = 0;
    }
    contributions[activity.date] += activity.effortLevel;
  }

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + (6 - today.getDay())); // end on Saturday
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 370); // ~53 weeks

  const days = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const getColor = (level: number): string => {
    if (level === 0) return 'bg-slate-100 hover:bg-slate-200';
    if (level <= 2) return 'bg-emerald-200 hover:bg-emerald-300';
    if (level <= 5) return 'bg-yellow-300 hover:bg-yellow-400';
    if (level <= 8) return 'bg-orange-400 hover:bg-orange-500';
    return 'bg-red-500 hover:bg-red-600';
  };
  
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <div>
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {days.map((day, index) => {
          const dateString = day.toISOString().split('T')[0];
          const level = contributions[dateString] || 0;
          
          return (
            <div
              key={index}
              className={`w-4 h-4 rounded-sm cursor-pointer transition-colors ${getColor(level)}`}
              onClick={(e) => { if(level > 0) onDayClick(dateString, e)}}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
        {monthLabels.map(month => (
            <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};

export default ContributionGraph;