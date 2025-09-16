import React from 'react';
import { DentistProfile, ProfileStats } from '../types';
import { XIcon, StarIconFilled } from './icons';

interface ComparisonModalProps {
  profilesData: { profile: DentistProfile; stats: ProfileStats }[];
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ profilesData, onClose }) => {

  const renderRating = (rating: number) => (
    <div className="flex items-center">
        <StarIconFilled className="w-4 h-4 text-amber-400 mr-1"/>
        <span>{rating.toFixed(1)}</span>
    </div>
  )

  const renderList = (items: string[]) => (
    <ul className="text-xs space-y-1">
        {items.slice(0, 4).map(item => <li key={item}>- {item}</li>)}
    </ul>
  )

  const comparisonRows = [
    { label: 'Level', render: (d: any) => `${d.stats.levelName} (Lvl ${d.stats.level})` },
    { label: 'Avg. Rating', render: (d: any) => renderRating(d.stats.averageRating) },
    { label: 'Total Contributions', render: (d: any) => d.stats.totalContributions },
    { label: 'Longest Streak', render: (d: any) => `${d.stats.longestStreak} days` },
    { label: 'Specializations', render: (d: any) => renderList(d.profile.specializations) },
    { label: 'Languages', render: (d: any) => d.profile.languages.join(', ') },
    { label: 'Accepts New Patients', render: (d: any) => d.profile.acceptsNewPatients ? 'Yes' : 'No' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl m-4" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Compare Dentists</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
                {/* Headers */}
                <div className="font-bold text-slate-500 uppercase text-sm">Feature</div>
                {profilesData.map(({profile}) => (
                    <div key={profile.id} className="text-center">
                        <img src={profile.avatarUrl} alt={profile.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
                        <h3 className="font-bold text-sky-700">{profile.name}</h3>
                    </div>
                ))}

                {/* Rows */}
                {comparisonRows.map(row => (
                    <React.Fragment key={row.label}>
                        <div className="col-span-1 font-semibold text-slate-700 p-3 border-t border-slate-200 flex items-center">{row.label}</div>
                        {profilesData.map(({profile, stats}) => (
                            <div key={profile.id} className="col-span-1 p-3 border-t border-slate-200 text-center flex items-center justify-center text-sm text-slate-600">
                                {row.render({profile, stats})}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
