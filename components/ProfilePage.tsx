
import React, { useState } from 'react';
import { DentistProfile, ProfileStats, ActivityLog, ActivityCategory, Badge, Reel } from '../types';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import ContributionGraph from './ContributionGraph';
import ActivityFeed from './ActivityFeed';
import LogEffortModal from './LogEffortModal';
import Button from './Button';
import { PlusIcon, PlayIcon } from './icons';
import ActivityTooltip from './ActivityTooltip';
import AchievementsSection from './AchievementsSection';
import PatientReviews from './PatientReviews';
import PortfolioSection from './PortfolioSection';
import WeeklyGoals from './WeeklyGoals';
import AppointmentModal from './AppointmentModal';

interface ProfilePageProps {
  profile: DentistProfile;
  stats: ProfileStats;
  activities: ActivityLog[];
  badges: Badge[];
  reels: Reel[];
  onLogEffort: (newLog: Omit<ActivityLog, 'id'>) => void;
  onNavigateToDirectory: () => void;
  onSelectReel: (reel: Reel) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, stats, activities, badges, reels, onLogEffort, onNavigateToDirectory, onSelectReel }) => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ activities: ActivityLog[], position: { top: number, left: number } } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogEffortSubmit = (logData: { category: ActivityCategory; description: string; effortLevel: number; date: string }) => {
    onLogEffort(logData);
    setIsLogModalOpen(false);
  };

  const handleDayClick = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    const dailyActivities = activities.filter(a => a.date === date);
    if (dailyActivities.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipData({
        activities: dailyActivities,
        position: {
          top: rect.top + window.scrollY + rect.height + 5,
          left: rect.left + window.scrollX + rect.width / 2 - 160,
        }
      });
    } else {
        setTooltipData(null);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'activity', label: 'Activity' },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return <PortfolioSection portfolioItems={profile.portfolio} allReels={reels} onSelectReel={onSelectReel}/>;
      case 'reviews':
        return <PatientReviews reviews={profile.reviews} averageRating={stats.averageRating} />;
      case 'activity':
        return (
          <div className="bg-white border border-slate-200 rounded-lg">
            <div className="p-6 flex justify-between items-center border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Full Activity Log</h2>
              <Button onClick={() => setIsLogModalOpen(true)} variant="primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Log Effort
              </Button>
            </div>
            <ActivityFeed activities={activities} />
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">{stats.totalContributions} contributions in the last year</h2>
              <div className="overflow-x-auto pb-2">
                <ContributionGraph activities={activities} onDayClick={handleDayClick} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <WeeklyGoals activities={activities} />
              <AchievementsSection badges={badges} />
            </div>
            {reels.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Latest Reels</h2>
                <div className="flex overflow-x-auto space-x-4 pb-4 -mx-6 px-6">
                  {reels.map(reel => (
                    <div key={reel.id} onClick={() => onSelectReel(reel)} className="group relative flex-shrink-0 w-40 h-56 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                      <img src={reel.thumbnailUrl} alt={reel.caption} className="w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayIcon className="w-12 h-12 text-white/80" />
                      </div>
                      <p className="absolute bottom-0 left-0 p-2 text-white text-xs font-medium line-clamp-2">{reel.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={() => tooltipData && setTooltipData(null)}>
      <div className="mb-4">
        <Button onClick={onNavigateToDirectory} variant="secondary">
            &larr; Back to Directory
        </Button>
      </div>

      <ProfileHeader profile={profile} stats={stats} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <ProfileSidebar profile={profile} onBookAppointment={() => setIsBookingModalOpen(true)} />
        </div>
        
        <div className="lg:col-span-3">
            <div className="border-b border-slate-200 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.id
                                ? 'border-sky-500 text-sky-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            {renderTabContent()}
        </div>
      </div>
      {isLogModalOpen && (
        <LogEffortModal 
          onClose={() => setIsLogModalOpen(false)} 
          onSubmit={handleLogEffortSubmit} 
        />
      )}
      {isBookingModalOpen && (
        <AppointmentModal
          dentist={profile}
          onClose={() => setIsBookingModalOpen(false)}
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