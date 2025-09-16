import React from 'react';
import { DentistProfile, ProfileStats } from '../types';
import { LocationMarkerIcon, ChartBarIcon } from './icons';
import Button from './Button';

interface DentistCardProps {
  profile: DentistProfile;
  stats: ProfileStats;
  onViewProfile: (profileId: string) => void;
}

const DentistCard: React.FC<DentistCardProps> = ({ profile, stats, onViewProfile }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col p-6">
      <div className="flex items-start space-x-4">
        <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
          <p className="text-sky-600 font-medium text-sm">{profile.title}</p>
          <div className="flex items-center text-sm text-slate-500 mt-1">
            <LocationMarkerIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>{profile.location.city}, {profile.location.country}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-600 space-y-2 flex-grow">
        <p className="line-clamp-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-2 pt-2">
            {profile.specializations.slice(0, 3).map(spec => (
                <span key={spec} className="px-2 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full">{spec}</span>
            ))}
        </div>
      </div>
      <div className="mt-6 border-t border-slate-200 pt-4 flex justify-between items-center">
        <div className="flex items-center text-sm text-slate-500">
          <ChartBarIcon className="w-5 h-5 mr-2 text-emerald-500"/>
          <span><span className="font-bold text-slate-700">{stats.totalContributions}</span> contributions</span>
        </div>
        <Button onClick={() => onViewProfile(profile.id)} variant="primary">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default DentistCard;
