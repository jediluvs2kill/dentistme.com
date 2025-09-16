import React from 'react';
import { Badge } from '../types';

interface AchievementsSectionProps {
  badges: Badge[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ badges }) => {
  if (badges.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Achievements</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className="group relative flex flex-col items-center text-center p-3" title={badge.description}>
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 transition-transform duration-200 group-hover:scale-110">
              {badge.icon}
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700">{badge.name}</p>
            {/* Tooltip for desktop */}
            <div className="absolute bottom-full mb-2 w-48 bg-slate-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              {badge.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
