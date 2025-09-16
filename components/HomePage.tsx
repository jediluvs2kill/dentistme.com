import React from 'react';
import Button from './Button';
import { BriefcaseIcon, ChartBarIcon, UsersIcon } from './icons';

interface HomePageProps {
  onNavigateToDirectory: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="flex-shrink-0 p-4 bg-sky-100 rounded-full text-sky-600">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-base text-slate-600">{children}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigateToDirectory }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                The Professional Hub for <span className="text-sky-600">Modern Dentistry</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-600">
                Showcase your expertise, build patient trust, and get discovered. Your dynamic, data-driven profile awaits.
            </p>
            <div className="mt-10">
                <Button onClick={onNavigateToDirectory} variant="primary" className="px-8 py-4 text-lg font-semibold">
                    Find Your Dentist
                </Button>
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base font-semibold text-sky-600 uppercase tracking-wider">Why DentistMe?</h2>
                <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Elevate Your Dental Career
                </p>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                    A dedicated platform to highlight your commitment to excellence and connect with patients.
                </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard icon={<ChartBarIcon className="w-8 h-8" />} title="Showcase Your Work">
                    Log daily activities from patient care to research. Visualize your dedication with a GitHub-style contribution graph.
                </FeatureCard>
                <FeatureCard icon={<UsersIcon className="w-8 h-8" />} title="Effortless Discovery">
                    Be found by patients and employers through our detailed directory with location and specialty search filters.
                </FeatureCard>
                <FeatureCard icon={<BriefcaseIcon className="w-8 h-8" />} title="Advance Your Career">
                    Your DentistMe profile is a dynamic resume, highlighting your commitment and expertise to stand out in the hiring process.
                </FeatureCard>
            </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} DentistMe.com. All rights reserved.</p>
          </div>
      </footer>
    </>
  );
};

export default HomePage;
