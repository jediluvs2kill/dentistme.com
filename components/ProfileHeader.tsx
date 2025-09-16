import React from 'react';
import { DentistProfile, ProfileStats } from '../types';
import { FireIcon, ChartBarIcon, CalendarIcon, StarIcon, StarIconFilled } from './icons';

interface ProfileHeaderProps {
  profile: DentistProfile;
  stats: ProfileStats;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string, color: string }> = ({ icon, label, value, color }) => (
    <div className="flex items-center p-4 bg-white rounded-lg border border-slate-200">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, stats }) => {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={profile.avatarUrl}
            alt={profile.name}
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-lg text-sky-600 font-medium">{profile.title}</p>
            {stats.averageRating > 0 && (
                <div className="flex items-center mt-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                           i < Math.round(stats.averageRating) 
                           ? <StarIconFilled key={i} className="w-5 h-5 text-amber-400" />
                           : <StarIcon key={i} className="w-5 h-5 text-slate-300" />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600 font-medium">
                        {stats.averageRating} average rating ({profile.reviews.length} reviews)
                    </span>
                </div>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-2">
                <StarIcon className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Level {stats.level}</p>
                  <p className="text-lg font-bold text-amber-600">{stats.levelName}</p>
                </div>
            </div>
             <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{width: `100%`}}></div>
            </div>
             <p className="text-xs text-slate-500 self-end">{stats.points} Points</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<ChartBarIcon className="w-6 h-6 text-emerald-600" />} label="Total Contributions" value={stats.totalContributions} color="bg-emerald-100" />
        <StatCard icon={<FireIcon className="w-6 h-6 text-amber-600" />} label="Longest Streak" value={`${stats.longestStreak} days`} color="bg-amber-100"/>
        <StatCard icon={<CalendarIcon className="w-6 h-6 text-violet-600" />} label="Current Streak" value={`${stats.currentStreak} days`} color="bg-violet-100"/>
        <StatCard icon={<StarIconFilled className="w-6 h-6 text-yellow-600" />} label="Avg. Rating" value={`${stats.averageRating}`} color="bg-yellow-100"/>
      </div>
    </div>
  );
};

export default ProfileHeader;