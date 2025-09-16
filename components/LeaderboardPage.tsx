import React from 'react';
import { DentistProfile, ProfileStats } from '../types';
import { TrophyIcon, FireIcon } from './icons';

interface LeaderboardPageProps {
  profileData: { profile: DentistProfile; stats: ProfileStats }[];
  onViewProfile: (profileId: string) => void;
}

const LeaderboardList: React.FC<{ title: string; icon: React.ReactNode; data: any[]; onViewProfile: (id: string) => void; }> = ({ title, icon, data, onViewProfile }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-full mr-3">{icon}</div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        </div>
        <ul className="space-y-3">
            {data.slice(0, 10).map(({profile, stats}, index) => (
                <li key={profile.id} className="flex items-center justify-between p-3 rounded-md transition-colors hover:bg-slate-50">
                    <div className="flex items-center">
                        <span className="text-lg font-bold text-slate-400 w-8">{index + 1}</span>
                        <img src={profile.avatarUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover mr-4" />
                        <div>
                            <button onClick={() => onViewProfile(profile.id)} className="font-semibold text-sky-600 hover:underline text-left">
                                {profile.name}
                            </button>
                            <p className="text-sm text-slate-500">{profile.title}</p>
                        </div>
                    </div>
                    <div className="text-right">
                         <p className="text-lg font-bold text-slate-800">
                            {title.includes('Points') ? `${stats.points.toLocaleString()}` : `${stats.longestStreak} days`}
                         </p>
                         <p className="text-xs text-slate-500">
                            {title.includes('Points') ? 'Points' : 'Streak'}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);


const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ profileData, onViewProfile }) => {
    
    const sortedByPoints = [...profileData].sort((a, b) => b.stats.points - a.stats.points);
    const sortedByStreak = [...profileData].sort((a, b) => b.stats.longestStreak - a.stats.longestStreak);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900">Community Leaderboards</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Recognizing the most dedicated and consistent professionals in our community.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <LeaderboardList 
                        title="Top by Total Points" 
                        icon={<TrophyIcon className="w-6 h-6" />}
                        data={sortedByPoints} 
                        onViewProfile={onViewProfile}
                    />
                     <LeaderboardList 
                        title="Longest Contribution Streak" 
                        icon={<FireIcon className="w-6 h-6" />}
                        data={sortedByStreak} 
                        onViewProfile={onViewProfile}
                    />
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
