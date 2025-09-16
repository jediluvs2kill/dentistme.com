
import React from 'react';
import { PortfolioItem, Reel } from '../types';
import { VideoCameraIcon } from './icons';

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
  allReels?: Reel[];
  onSelectReel?: (reel: Reel) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolioItems, allReels, onSelectReel }) => {
  if (!portfolioItems || portfolioItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map(item => {
          const linkedReel = allReels?.find(reel => reel.linkedCaseStudyId === item.id);
          return (
            <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden group">
              <div className="relative">
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                {linkedReel && onSelectReel && (
                    <button 
                        onClick={() => onSelectReel(linkedReel)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-sky-600 transition-colors"
                        title="View linked reel"
                    >
                        <VideoCameraIcon className="w-5 h-5" />
                    </button>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase text-sky-600">{item.category}</span>
                <h3 className="mt-1 font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PortfolioSection;
