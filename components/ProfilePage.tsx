import React, { useState } from 'react';
import { DentistProfile, ProfileStats, ActivityLog, ActivityCategory, Badge } from '../types';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import ContributionGraph from './ContributionGraph';
import ActivityFeed from './ActivityFeed';
import LogEffortModal from './LogEffortModal';
import Button from './Button';
import { PlusIcon } from './icons';
import ActivityTooltip from './ActivityTooltip';
import AchievementsSection from './AchievementsSection';
import PatientReviews from './PatientReviews';
import PortfolioSection from './PortfolioSection';
import WeeklyGoals from './WeeklyGoals';

interface ProfilePageProps {
  profile: DentistProfile;
  stats: ProfileStats;
  activities: ActivityLog[];
  badges: Badge[];
  onLogEffort: (newLog: Omit<ActivityLog, 'id'>) => void;
  onNavigateToDirectory: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, stats, activities, badges, onLogEffort, onNavigateToDirectory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ activities: ActivityLog[], position: { top: number, left: number } } | null>(null);


  const handleLogEffortSubmit = (logData: { category: ActivityCategory; description: string; effortLevel: number; date: string }) => {
    onLogEffort(logData);
    setIsModalOpen(false);
  };

  const handleDayClick = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    const dailyActivities = activities.filter(a => a.date === date);
    if (dailyActivities.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipData({
        activities: dailyActivities,
        position: {
          top: rect.top + window.scrollY + rect.height + 5,
          left: rect.left + window.scrollX + rect.width / 2 - 160, // center the tooltip
        }
      });
    } else {
        setTooltipData(null);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Button onClick={onNavigateToDirectory} variant="secondary">
            &larr; Back to Directory
        </Button>
      </div>

      <ProfileHeader profile={profile} stats={stats} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <ProfileSidebar profile={profile} />
          <WeeklyGoals activities={activities} />
        </div>
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6" onClick={() => tooltipData && setTooltipData(null)}>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{stats.totalContributions} contributions in the last year</h2>
            <ContributionGraph activities={activities} onDayClick={handleDayClick} />
          </div>
          
          <PortfolioSection portfolioItems={profile.portfolio} />
          
          <PatientReviews reviews={profile.reviews} averageRating={stats.averageRating} />

          <AchievementsSection badges={badges} />

          <div>
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Activity Log</h2>
              <Button onClick={() => setIsModalOpen(true)} variant="primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Log Effort
              </Button>
            </div>
            <ActivityFeed activities={activities.slice(0, 15)} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <LogEffortModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleLogEffortSubmit} 
        />
      )}
      {tooltipData && (
        <ActivityTooltip
          activities={tooltipData.activities}
          position={tooltipData.position}
          onClose={() => setTooltipData(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;