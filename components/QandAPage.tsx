
import React from 'react';
import { Question, DentistProfile } from '../types';
import QuestionCard from './QuestionCard';

interface QandAPageProps {
  questions: Question[];
  profilesById: Record<string, DentistProfile>;
  onViewProfile: (profileId: string) => void;
}

const QandAPage: React.FC<QandAPageProps> = ({ questions, profilesById, onViewProfile }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Community Q&A</h1>
          <p className="mt-4 text-lg text-slate-600">
            Ask a question and get answers from our network of trusted dental professionals.
          </p>
        </div>
        
        <div className="space-y-8">
            {questions.map(q => (
                <QuestionCard 
                    key={q.id} 
                    question={q} 
                    profilesById={profilesById} 
                    onViewProfile={onViewProfile}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default QandAPage;
