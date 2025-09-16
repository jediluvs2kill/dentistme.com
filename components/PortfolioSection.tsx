import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolioItems }) => {
  if (!portfolioItems || portfolioItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden group">
            <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="p-4">
              <span className="text-xs font-semibold uppercase text-sky-600">{item.category}</span>
              <h3 className="mt-1 font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
