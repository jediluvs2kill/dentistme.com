
import React from 'react';
import { Question, DentistProfile } from '../types';
import { ArrowUpIcon } from './icons';

interface QuestionCardProps {
    question: Question;
    profilesById: Record<string, DentistProfile>;
    onViewProfile: (profileId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, profilesById, onViewProfile }) => {

    const sortedAnswers = [...question.answers].sort((a, b) => b.upvotes - a.upvotes);

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Asked by {question.questionerName}</p>
                <h2 className="text-lg font-bold text-slate-800">{question.text}</h2>
            </div>
            <div className="divide-y divide-slate-200">
                {sortedAnswers.map(answer => {
                    const dentist = profilesById[answer.dentistId];
                    if (!dentist) return null;
                    
                    return (
                        <div key={answer.id} className="p-6 flex items-start space-x-4">
                            <button className="flex flex-col items-center text-slate-500 hover:text-sky-600 transition-colors group">
                                <ArrowUpIcon className="w-6 h-6" />
                                <span className="text-sm font-bold group-hover:text-sky-600">{answer.upvotes}</span>
                            </button>
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <img 
                                        src={dentist.avatarUrl} 
                                        alt={dentist.name} 
                                        className="w-8 h-8 rounded-full cursor-pointer"
                                        onClick={() => onViewProfile(dentist.id)}
                                    />
                                    <div>
                                        <button 
                                            onClick={() => onViewProfile(dentist.id)}
                                            className="font-semibold text-sm text-sky-700 hover:underline"
                                        >
                                            {dentist.name}
                                        </button>
                                        <p className="text-xs text-slate-500">{dentist.title}</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-sm">{answer.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionCard;
