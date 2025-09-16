
import React from 'react';
import { Reel, DentistProfile } from '../types';
import { XIcon, HeartIcon, EyeIcon } from './icons';

interface ReelPlayerModalProps {
  reel: Reel;
  dentist: DentistProfile;
  onClose: () => void;
}

const ReelPlayerModal: React.FC<ReelPlayerModalProps> = ({ reel, dentist, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Video Pane */}
        <div className="w-2/3 bg-black flex items-center justify-center">
            <img src={reel.thumbnailUrl} alt={reel.caption} className="max-h-full max-w-full object-contain"/>
        </div>

        {/* Info Pane */}
        <div className="w-1/3 flex flex-col p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10">
                <XIcon className="w-6 h-6" />
            </button>
            {/* Header */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                <img src={dentist.avatarUrl} alt={dentist.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <p className="font-bold text-slate-800">{dentist.name}</p>
                    <p className="text-sm text-slate-500">{dentist.title}</p>
                </div>
            </div>
            
            {/* Caption & Stats */}
            <div className="flex-grow py-4 overflow-y-auto">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{reel.caption}</p>
            </div>
            
            {/* Footer Stats */}
            <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-6 text-slate-600">
                    <div className="flex items-center">
                        <HeartIcon className="w-6 h-6 mr-2 text-pink-500" />
                        <span className="font-bold text-lg">{reel.likes.toLocaleString()}</span>
                        <span className="text-sm ml-1.5">Likes</span>
                    </div>
                    <div className="flex items-center">
                        <EyeIcon className="w-6 h-6 mr-2 text-sky-500" />
                        <span className="font-bold text-lg">{reel.views.toLocaleString()}</span>
                         <span className="text-sm ml-1.5">Views</span>
                    </div>
                </div>
                 <p className="text-xs text-slate-400 mt-3">Posted on {new Date(reel.timestamp).toLocaleDateString()}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReelPlayerModal;
