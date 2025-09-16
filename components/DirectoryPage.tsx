import React, { useState, useMemo } from 'react';
import { DentistProfile, ProfileStats } from '../types';
import DentistCard from './DentistCard';
import { SearchIcon } from './icons';

interface DirectoryPageProps {
  profiles: DentistProfile[];
  profileData: Record<string, { profile: DentistProfile; stats: ProfileStats; badges: any[] }>;
  onViewProfile: (profileId: string) => void;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ profiles, profileData, onViewProfile }) => {
  const [locationQuery, setLocationQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  const allSpecializations = useMemo(() => {
    const specSet = new Set<string>();
    profiles.forEach(p => p.specializations.forEach(s => specSet.add(s)));
    return Array.from(specSet).sort();
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const locationMatch = 
        profile.location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
        profile.location.country.toLowerCase().includes(locationQuery.toLowerCase());
      
      const specializationMatch = 
        specializationFilter === '' || profile.specializations.includes(specializationFilter);

      return locationMatch && specializationMatch;
    });
  }, [profiles, locationQuery, specializationFilter]);

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
            
            <div className="sticky top-16 bg-slate-50 py-4 z-10 mb-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
                    {/* Specialization Filter */}
                    <div>
                        <select
                            value={specializationFilter}
                            onChange={e => setSpecializationFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Specializations</option>
                            {allSpecializations.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Dentists Grid */}
            {filteredProfiles.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProfiles.map(profile => (
                        <DentistCard 
                            key={profile.id}
                            profile={profile}
                            stats={profileData[profile.id].stats}
                            onViewProfile={onViewProfile}
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
    </div>
  );
};

export default DirectoryPage;
