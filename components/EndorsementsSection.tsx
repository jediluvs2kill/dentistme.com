import React from 'react';
import { UsersIcon } from './icons';

interface EndorsementsSectionProps {
  endorsements: Record<string, number>;
}

const EndorsementsSection: React.FC<EndorsementsSectionProps> = ({ endorsements }) => {
  const sortedEndorsements = Object.entries(endorsements)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Show top 5

  if (sortedEndorsements.length === 0) {
    return null;
  }

  return (
    <div>
        <h3 className="flex items-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
            <UsersIcon className="w-5 h-5 text-slate-400" />
            <span className="ml-2">Peer Endorsements</span>
        </h3>
        <ul className="mt-3 space-y-2">
            {sortedEndorsements.map(([skill, count]) => (
                <li key={skill} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-700">{skill}</span>
                    <span className="font-bold text-sky-600 bg-sky-100 rounded-full px-2 py-0.5 text-xs">
                        {count}
                    </span>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default EndorsementsSection;
