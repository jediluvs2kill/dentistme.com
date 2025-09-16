import React from 'react';
import { ActivityLog, ActivityCategory } from '../types';
import { EducationIcon } from './icons';

interface WeeklyGoalsProps {
  activities: ActivityLog[];
}

const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ activities }) => {
  // Example Goal: Log 3 Continuing Education activities in the last 7 days
  const GOAL_TARGET = 3;
  const GOAL_CATEGORY = ActivityCategory.CONTINUING_EDUCATION;
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const recentActivities = activities.filter(act => {
    const actDate = new Date(act.date);
    return act.category === GOAL_CATEGORY && actDate >= oneWeekAgo && actDate <= today;
  });

  const progress = Math.min((recentActivities.length / GOAL_TARGET) * 100, 100);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <h3 className="font-semibold text-slate-800 text-md mb-3">Weekly Goals</h3>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
            <EducationIcon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-700">Continuing Education</p>
            <p className="text-xs text-slate-500">Log {GOAL_TARGET} sessions this week</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1 text-right font-medium">{recentActivities.length} / {GOAL_TARGET}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;
