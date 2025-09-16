import { ActivityLog, ProfileStats, Badge, ActivityCategory, Review } from '../types';
import { TrophyIcon, EducationIcon, CommunityIcon, FireIcon, StarIcon } from '../components/icons';
import React from 'react';

// --- GAMIFICATION CONFIGURATION ---
const POINTS_PER_EFFORT_LEVEL = 10;

const LEVELS = [
  { level: 1, name: "New Graduate", minPoints: 0 },
  { level: 2, name: "Resident", minPoints: 500 },
  { level: 3, name: "Associate Dentist", minPoints: 1500 },
  { level: 4, name: "Senior Clinician", minPoints: 3000 },
  { level: 5, name: "Practice Leader", minPoints: 5000 },
  { level: 6, name: "Master Clinician", minPoints: 8000 },
];

const ALL_BADGES: Omit<Badge, 'icon'>[] = [
    // Contribution Badges
    { id: 'contrib-50', name: 'Committed Contributor', description: 'Made 50 total contributions.' },
    { id: 'contrib-100', name: 'Century Contributor', description: 'Made 100 total contributions.' },
    { id: 'contrib-250', name: 'Dedicated Professional', description: 'Made 250 total contributions.' },
    // Streak Badges
    { id: 'streak-7', name: 'Weekly Warrior', description: 'Maintained a 7-day contribution streak.' },
    { id: 'streak-30', name: 'Monthly Motivator', description: 'Maintained a 30-day contribution streak.' },
    { id: 'streak-100', name: 'Centurion Streak', description: 'Maintained an incredible 100-day contribution streak!' },
    // Category Badges
    { id: 'cat-edu-20', name: 'Lifelong Learner', description: 'Logged 20+ Continuing Education activities.' },
    { id: 'cat-comm-20', name: 'Community Champion', description: 'Logged 20+ Community Outreach activities.' },
];

const getBadgeIcon = (id: string): React.ReactNode => {
    if (id.startsWith('contrib')) return React.createElement(TrophyIcon, {className: "w-6 h-6"});
    if (id.startsWith('streak')) return React.createElement(FireIcon, {className: "w-6 h-6"});
    if (id.startsWith('cat-edu')) return React.createElement(EducationIcon, {className: "w-6 h-6"});
    if (id.startsWith('cat-comm')) return React.createElement(CommunityIcon, {className: "w-6 h-6"});
    return React.createElement(StarIcon, {className: "w-6 h-6"});
}


// --- CALCULATION LOGIC ---

export const calculateStatsAndAchievements = (logs: ActivityLog[], reviews: Review[]): { stats: ProfileStats; earnedBadges: Badge[] } => {
  // 1. Calculate Base Stats (Streaks, Contributions, Points)
  const contributionsByDate = new Map<string, number>();
  let totalPoints = 0;

  logs.forEach(log => {
    contributionsByDate.set(log.date, (contributionsByDate.get(log.date) || 0) + 1);
    totalPoints += log.effortLevel * POINTS_PER_EFFORT_LEVEL;
  });

  let longestStreak = 0;
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 365 * 2; i++) { // Check up to 2 years for streaks
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    if (contributionsByDate.has(dateString)) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  // Recalculate current streak from today backwards
  currentStreak = 0;
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    if (contributionsByDate.has(dateString)) {
      currentStreak++;
    } else {
      break; 
    }
  }
  
  const currentLevelInfo = LEVELS.slice().reverse().find(l => totalPoints >= l.minPoints) || LEVELS[0];
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;


  const stats: ProfileStats = {
    totalContributions: logs.length,
    longestStreak,
    currentStreak,
    points: totalPoints,
    level: currentLevelInfo.level,
    levelName: currentLevelInfo.name,
    averageRating: parseFloat(averageRating.toFixed(1)),
  };

  // 2. Determine Earned Badges
  const categoryCounts = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<ActivityCategory, number>);


  const earnedBadges: Badge[] = [];

  // Contribution checks
  if (stats.totalContributions >= 50) earnedBadges.push({ ...ALL_BADGES[0], icon: getBadgeIcon('contrib-50') });
  if (stats.totalContributions >= 100) earnedBadges.push({ ...ALL_BADGES[1], icon: getBadgeIcon('contrib-100') });
  if (stats.totalContributions >= 250) earnedBadges.push({ ...ALL_BADGES[2], icon: getBadgeIcon('contrib-250') });

  // Streak checks (use longest streak for historical badges)
  if (stats.longestStreak >= 7) earnedBadges.push({ ...ALL_BADGES[3], icon: getBadgeIcon('streak-7') });
  if (stats.longestStreak >= 30) earnedBadges.push({ ...ALL_BADGES[4], icon: getBadgeIcon('streak-30') });
  if (stats.longestStreak >= 100) earnedBadges.push({ ...ALL_BADGES[5], icon: getBadgeIcon('streak-100') });
  
  // Category checks
  if ((categoryCounts[ActivityCategory.CONTINUING_EDUCATION] || 0) >= 20) earnedBadges.push({ ...ALL_BADGES[6], icon: getBadgeIcon('cat-edu-20') });
  if ((categoryCounts[ActivityCategory.COMMUNITY_OUTREACH] || 0) >= 20) earnedBadges.push({ ...ALL_BADGES[7], icon: getBadgeIcon('cat-comm-20') });


  return { stats, earnedBadges };
};