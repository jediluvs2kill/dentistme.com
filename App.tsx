
import React, { useState, useMemo, useCallback } from 'react';
import { DentistProfile, ActivityLog, ProfileStats, Reel } from './types';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import DirectoryPage from './components/DirectoryPage';
import LeaderboardPage from './components/LeaderboardPage';
import ReelsPage from './components/ReelsPage';
import Button from './components/Button';
import { profiles, generateActivitiesForProfile, reelsData } from './data/mockData';
import { calculateStatsAndAchievements } from './services/gamification';
import { LeaderboardIcon, VideoCameraIcon } from './components/icons';
import ReelPlayerModal from './components/ReelPlayerModal';

type Page = 'home' | 'directory' | 'profile' | 'leaderboard' | 'reels';

const App: React.FC = () => {
  const [allProfiles] = useState<DentistProfile[]>(profiles);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [allReels] = useState<Reel[]>(reelsData);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  
  const [allActivities] = useState<Record<string, ActivityLog[]>>(() => {
    const initialActivities: Record<string, ActivityLog[]> = {};
    profiles.forEach(p => {
        initialActivities[p.id] = generateActivitiesForProfile(p.id);
    });
    return initialActivities;
  });

  const [currentPage, setCurrentPage] = useState<Page>('home');

  const allProfileData = useMemo(() => {
    const data: Record<string, { profile: DentistProfile; stats: ProfileStats; badges: any[] }> = {};
    allProfiles.forEach(p => {
      const activities = allActivities[p.id] || [];
      const { stats, earnedBadges } = calculateStatsAndAchievements(activities, p.reviews);
      data[p.id] = { profile: p, stats, badges: earnedBadges };
    });
    return data;
  }, [allProfiles, allActivities]);
  
  const profilesById = useMemo(() => {
    return allProfiles.reduce((acc, profile) => {
      acc[profile.id] = profile;
      return acc;
    }, {} as Record<string, DentistProfile>);
  }, [allProfiles]);

  const { dentistProfile, activityLogs, profileStats, earnedBadges } = useMemo(() => {
    if (!currentProfileId) return { dentistProfile: null, activityLogs: [], profileStats: null, earnedBadges: [] };
    
    const profileData = allProfileData[currentProfileId];
    const activities = allActivities[currentProfileId] || [];

    return { 
      dentistProfile: profileData.profile, 
      activityLogs: activities, 
      profileStats: profileData.stats, 
      earnedBadges: profileData.badges 
    };
  }, [currentProfileId, allProfileData, allActivities]);


  const handleLogEffort = useCallback((newLog: Omit<ActivityLog, 'id'>) => {
    console.log("Effort logged (demo only):", newLog);
  }, []);

  const handleViewProfile = (profileId: string) => {
    setCurrentProfileId(profileId);
    navigate('profile');
  };
  
  const navigate = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        if (!dentistProfile || !profileStats) return <div>Loading profile...</div>;
        return (
          <ProfilePage 
            profile={dentistProfile} 
            stats={profileStats} 
            activities={activityLogs} 
            badges={earnedBadges}
            reels={allReels.filter(r => r.dentistId === dentistProfile.id)}
            onLogEffort={handleLogEffort}
            onNavigateToDirectory={() => navigate('directory')}
            onSelectReel={setSelectedReel}
          />
        );
      case 'directory':
        return (
          <DirectoryPage 
            profiles={allProfiles}
            profileData={allProfileData}
            onViewProfile={handleViewProfile}
          />
        );
      case 'leaderboard':
        return (
            <LeaderboardPage
                profileData={Object.values(allProfileData)}
                onViewProfile={handleViewProfile}
            />
        );
      case 'reels':
        return (
          <ReelsPage 
            reels={allReels} 
            profilesById={profilesById}
            onSelectReel={setSelectedReel}
            onViewProfile={handleViewProfile}
          />
        );
      case 'home':
      default:
        return <HomePage onNavigateToDirectory={() => navigate('directory')} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate('home')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.999 5a2 2 0 100 4 2 2 0 000-4zM8 11a2 2 0 114 0v3a2 2 0 11-4 0v-3z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-2xl ml-2 text-slate-800">DentistMe.com</span>
            </button>
            <div className="flex items-center space-x-2 md:space-x-4">
              {currentPage !== 'reels' && (
                <Button onClick={() => navigate('reels')} variant="secondary">
                  <VideoCameraIcon className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">Reels</span>
                </Button>
              )}
              {currentPage !== 'leaderboard' && (
                <Button onClick={() => navigate('leaderboard')} variant="secondary">
                  <LeaderboardIcon className="w-5 h-5 md:mr-2" />
                   <span className="hidden md:inline">Leaderboards</span>
                </Button>
              )}
               <Button onClick={() => navigate('directory')} variant="primary">Find a Dentist</Button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
      {selectedReel && profilesById[selectedReel.dentistId] && (
        <ReelPlayerModal 
            reel={selectedReel}
            dentist={profilesById[selectedReel.dentistId]}
            onClose={() => setSelectedReel(null)}
        />
      )}
    </div>
  );
};

export default App;
