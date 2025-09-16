
import React from 'react';
import { DentistProfile } from '../types';
import { BriefcaseIcon, AcademicCapIcon, MailIcon, PhoneIcon, LocationMarkerIcon, TranslateIcon, CheckCircleIcon, CalendarPlusIcon } from './icons';
import EndorsementsSection from './EndorsementsSection';
import Button from './Button';

interface ProfileSidebarProps {
  profile: DentistProfile;
  onBookAppointment: () => void;
}

const SidebarSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <h3 className="flex items-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        <div className="mt-3 text-slate-700">
            {children}
        </div>
    </div>
);

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile, onBookAppointment }) => {
  return (
    <aside className="space-y-8">
       <Button onClick={onBookAppointment} variant="primary" className="w-full">
        <CalendarPlusIcon className="w-5 h-5 mr-2" />
        Book Appointment
      </Button>

      <div>
        <h2 className="text-xl font-bold text-slate-800">About</h2>
        <p className="mt-2 text-slate-600">{profile.bio}</p>
        
        <div className="mt-4 flex items-center p-3 bg-slate-100 rounded-md">
            <CheckCircleIcon className={`w-6 h-6 mr-3 ${profile.acceptsNewPatients ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span className={`text-sm font-medium ${profile.acceptsNewPatients ? 'text-slate-800' : 'text-slate-500'}`}>
                {profile.acceptsNewPatients ? 'Accepting new patients' : 'Not accepting new patients'}
            </span>
        </div>
      </div>
      
      <EndorsementsSection endorsements={profile.endorsements} />
      
      <SidebarSection title="Specializations" icon={<BriefcaseIcon className="w-5 h-5 text-slate-400" />}>
        <div className="flex flex-wrap gap-2">
          {profile.specializations.map((spec, index) => (
             <span key={index} className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full">{spec}</span>
          ))}
        </div>
      </SidebarSection>
      
      <SidebarSection title="Certifications" icon={<AcademicCapIcon className="w-5 h-5 text-slate-400" />}>
        <ul className="space-y-2">
          {profile.certifications.map((cert, index) => (
            <li key={index} className="flex items-start">
               <svg className="w-4 h-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </SidebarSection>
      
      <SidebarSection title="Languages" icon={<TranslateIcon className="w-5 h-5 text-slate-400" />}>
          <p className="text-slate-600">{profile.languages.join(', ')}</p>
      </SidebarSection>

      <SidebarSection title="Contact" icon={<MailIcon className="w-5 h-5 text-slate-400" />}>
        <ul className="space-y-2">
           <li className="flex items-center text-sm">
            <MailIcon className="w-4 h-4 mr-3 text-slate-400" />
            <a href={`mailto:${profile.contact.email}`} className="hover:text-sky-600">{profile.contact.email}</a>
          </li>
          <li className="flex items-center text-sm">
            <PhoneIcon className="w-4 h-4 mr-3 text-slate-400" />
            <span>{profile.contact.phone}</span>
          </li>
          <li className="flex items-center text-sm">
            <LocationMarkerIcon className="w-4 h-4 mr-3 text-slate-400" />
            <span>{profile.contact.address}</span>
          </li>
        </ul>
      </SidebarSection>
    </aside>
  );
};

export default ProfileSidebar;