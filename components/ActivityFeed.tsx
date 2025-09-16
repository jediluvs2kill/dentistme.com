
import React from 'react';
import { ActivityLog, ActivityCategory } from '../types';
import { PatientCareIcon, EducationIcon, ResearchIcon, CommunityIcon, AdminIcon } from './icons';

interface ActivityFeedProps {
  activities: ActivityLog[];
}

const categoryDetails: { [key in ActivityCategory]: { icon: React.ReactNode; color: string } } = {
  [ActivityCategory.PATIENT_CARE]: { icon: <PatientCareIcon className="w-5 h-5" />, color: "bg-sky-100 text-sky-700" },
  [ActivityCategory.CONTINUING_EDUCATION]: { icon: <EducationIcon className="w-5 h-5" />, color: "bg-indigo-100 text-indigo-700" },
  [ActivityCategory.RESEARCH]: { icon: <ResearchIcon className="w-5 h-5" />, color: "bg-purple-100 text-purple-700" },
  [ActivityCategory.COMMUNITY_OUTREACH]: { icon: <CommunityIcon className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-700" },
  [ActivityCategory.ADMINISTRATIVE_WORK]: { icon: <AdminIcon className="w-5 h-5" />, color: "bg-slate-100 text-slate-700" },
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <ul className="divide-y divide-slate-200">
        {activities.map(activity => {
          const { icon, color } = categoryDetails[activity.category];
          const date = new Date(activity.date);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          return (
            <li key={activity.id} className="p-4 flex items-start space-x-4">
              <div className={`p-3 rounded-full ${color}`}>
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                   <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                   <p className="text-xs text-slate-500 whitespace-nowrap">{formattedDate}</p>
                </div>
                <p className="text-sm text-slate-500 mt-1">{activity.category}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
