import React, { useEffect, useRef } from 'react';
import { ActivityLog, ActivityCategory } from '../types';
import { PatientCareIcon, EducationIcon, ResearchIcon, CommunityIcon, AdminIcon } from './icons';

interface ActivityTooltipProps {
  activities: ActivityLog[];
  position: { top: number; left: number };
  onClose: () => void;
}

const categoryIcons: { [key in ActivityCategory]: React.ReactNode } = {
  [ActivityCategory.PATIENT_CARE]: <PatientCareIcon className="w-4 h-4 text-sky-700" />,
  [ActivityCategory.CONTINUING_EDUCATION]: <EducationIcon className="w-4 h-4 text-indigo-700" />,
  [ActivityCategory.RESEARCH]: <ResearchIcon className="w-4 h-4 text-purple-700" />,
  [ActivityCategory.COMMUNITY_OUTREACH]: <CommunityIcon className="w-4 h-4 text-emerald-700" />,
  [ActivityCategory.ADMINISTRATIVE_WORK]: <AdminIcon className="w-4 h-4 text-slate-700" />,
};

const ActivityTooltip: React.FC<ActivityTooltipProps> = ({ activities, position, onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  if (!activities || activities.length === 0) {
    return null;
  }
  
  const date = new Date(activities[0].date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      ref={tooltipRef}
      className="absolute z-30 w-80 max-w-sm rounded-lg bg-white shadow-2xl border border-slate-200"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="p-3 border-b border-slate-200 bg-slate-50 rounded-t-lg">
        <h3 className="text-sm font-semibold text-slate-800">{date}</h3>
        <p className="text-xs text-slate-500">{activities.length} contribution{activities.length > 1 ? 's' : ''}</p>
      </div>
      <ul className="p-2 max-h-60 overflow-y-auto">
        {activities.map(activity => (
          <li key={activity.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-slate-50">
            <div className="flex-shrink-0 mt-1">{categoryIcons[activity.category]}</div>
            <div className="flex-1">
              <p className="text-sm text-slate-700">{activity.description}</p>
              <p className="text-xs text-slate-500">{activity.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTooltip;
