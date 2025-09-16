
import React from 'react';
import { Reel, DentistProfile } from '../types';
import ReelCard from './ReelCard';

interface ReelsPageProps {
  reels: Reel[];
  profilesById: Record<string, DentistProfile>;
  onSelectReel: (reel: Reel) => void;
  onViewProfile: (profileId: string) => void;
}

const ReelsPage: React.FC<ReelsPageProps> = ({ reels, profilesById, onSelectReel, onViewProfile }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Dental Reels</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Watch the latest short-form videos from our community of professionals.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {reels.map(reel => {
            const dentist = profilesById[reel.dentistId];
            if (!dentist) return null;
            return (
              <div key={reel.id} className="break-inside-avoid">
                <ReelCard
                  reel={reel}
                  dentist={dentist}
                  onSelectReel={onSelectReel}
                  onViewProfile={onViewProfile}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
