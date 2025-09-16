
import React from 'react';
import { Reel, DentistProfile } from '../types';
import { PlayIcon, HeartIcon, EyeIcon } from './icons';

interface ReelCardProps {
  reel: Reel;
  dentist: DentistProfile;
  onSelectReel: (reel: Reel) => void;
  onViewProfile: (profileId: string) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, dentist, onSelectReel, onViewProfile }) => {
  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewProfile(dentist.id);
  };
    
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300">
      {/* Video Thumbnail */}
      <div 
        className="relative group cursor-pointer"
        onClick={() => onSelectReel(reel)}
      >
        <img src={reel.thumbnailUrl} alt={reel.caption} className="w-full object-cover aspect-[9/16]" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <PlayIcon className="w-16 h-16 text-white/70 transform group-hover:scale-110 transition-transform"/>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div 
          className="flex items-center space-x-3 mb-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <img src={dentist.avatarUrl} alt={dentist.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-slate-800 leading-tight hover:text-sky-600">{dentist.name}</p>
            <p className="text-xs text-slate-500">{new Date(reel.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 mb-4 line-clamp-2">{reel.caption}</p>
        
        <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center">
                <HeartIcon className="w-5 h-5 mr-1.5 text-pink-500" />
                <span className="font-medium">{reel.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
                <EyeIcon className="w-5 h-5 mr-1.5 text-sky-500" />
                <span className="font-medium">{reel.views.toLocaleString()}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
