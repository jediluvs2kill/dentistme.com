import React, { useState, useMemo } from 'react';
import { DentistProfile, ProfileStats } from '../types';
import DentistCard from './DentistCard';
import { SearchIcon } from './icons';
import Button from './Button';
import ComparisonModal from './ComparisonModal';

interface DirectoryPageProps {
  profiles: DentistProfile[];
  profileData: Record<string, { profile: DentistProfile; stats: ProfileStats; badges: any[] }>;
  onViewProfile: (profileId: string) => void;
}

type SortKey = 'name' | 'contributions' | 'level';

const DirectoryPage: React.FC<DirectoryPageProps> = ({ profiles, profileData, onViewProfile }) => {
  const [locationQuery, setLocationQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [acceptsPatientsFilter, setAcceptsPatientsFilter] = useState<'' | 'yes'>('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);


  const allSpecializations = useMemo(() => {
    const specSet = new Set<string>();
    profiles.forEach(p => p.specializations.forEach(s => specSet.add(s)));
    return Array.from(specSet).sort();
  }, [profiles]);
  
  const allLanguages = useMemo(() => {
    const langSet = new Set<string>();
    profiles.forEach(p => p.languages.forEach(l => langSet.add(l)));
    return Array.from(langSet).sort();
  }, [profiles]);

  const filteredAndSortedProfiles = useMemo(() => {
    const filtered = profiles.filter(profile => {
      const locationMatch = 
        profile.location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
        profile.location.country.toLowerCase().includes(locationQuery.toLowerCase());
      
      const specializationMatch = specializationFilter === '' || profile.specializations.includes(specializationFilter);
      const acceptsPatientsMatch = acceptsPatientsFilter === '' || profile.acceptsNewPatients;
      const languageMatch = languageFilter === '' || profile.languages.includes(languageFilter);

      return locationMatch && specializationMatch && acceptsPatientsMatch && languageMatch;
    });

    return filtered.sort((a, b) => {
        const statsA = profileData[a.id].stats;
        const statsB = profileData[b.id].stats;
        switch (sortKey) {
            case 'contributions':
                return statsB.totalContributions - statsA.totalContributions;
            case 'level':
                return statsB.level - statsA.level;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });
  }, [profiles, locationQuery, specializationFilter, acceptsPatientsFilter, languageFilter, sortKey, profileData]);

  const handleCompareToggle = (profileId: string, isSelected: boolean) => {
    if (isSelected) {
        if (compareList.length < 3) {
            setCompareList(prev => [...prev, profileId]);
        }
    } else {
        setCompareList(prev => prev.filter(id => id !== profileId));
    }
  };

  const compareProfilesData = compareList.map(id => profileData[id]);


  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header and Filters */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900">Find a Dentist</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Search our network of dedicated professionals to find the right specialist near you.
                </p>
            </div>
            
            <div className="sticky top-16 bg-slate-50 py-4 z-10 mb-8 border-b border-slate-200">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {/* Location Search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by city or country..."
                            value={locationQuery}
                            onChange={e => setLocationQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                    </div>
                    {/* Filters */}
                    <select value={specializationFilter} onChange={e => setSpecializationFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                        <option value="">All Specializations</option>
                        {allSpecializations.map(spec => (<option key={spec} value={spec}>{spec}</option>))}
                    </select>
                    <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)} className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                        <option value="">Any Language</option>
                        {allLanguages.map(lang => (<option key={lang} value={lang}>{lang}</option>))}
                    </select>
                     <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)} className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                        <option value="name">Sort by Name</option>
                        <option value="contributions">Sort by Contributions</option>
                        <option value="level">Sort by Level</option>
                    </select>
                </div>
                 <div className="max-w-7xl mx-auto mt-2">
                    <div className="flex items-center">
                        <input type="checkbox" id="accepts-patients" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" checked={acceptsPatientsFilter === 'yes'} onChange={e => setAcceptsPatientsFilter(e.target.checked ? 'yes' : '')} />
                        <label htmlFor="accepts-patients" className="ml-2 text-sm text-slate-600">Accepting New Patients Only</label>
                    </div>
                 </div>
            </div>

            {/* Dentists Grid */}
            {filteredAndSortedProfiles.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProfiles.map(profile => (
                        <DentistCard 
                            key={profile.id}
                            profile={profile}
                            stats={profileData[profile.id].stats}
                            onViewProfile={onViewProfile}
                            onCompareToggle={handleCompareToggle}
                            isSelectedForCompare={compareList.includes(profile.id)}
                            isCompareDisabled={compareList.length >= 3}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-slate-800">No Dentists Found</h3>
                    <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
        
        {compareList.length > 1 && (
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200 z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                     <Button variant="primary" onClick={() => setIsCompareModalOpen(true)}>
                        Compare {compareList.length} Dentists
                    </Button>
                    <Button variant="secondary" onClick={() => setCompareList([])} className="ml-4">
                        Clear Selection
                    </Button>
                </div>
            </div>
        )}

        {isCompareModalOpen && (
            <ComparisonModal
                profilesData={compareProfilesData}
                onClose={() => setIsCompareModalOpen(false)}
            />
        )}
    </div>
  );
};

export default DirectoryPage;