
import React, { useState } from 'react';
import { ActivityCategory } from '../types';
import Button from './Button';
import { XIcon } from './icons';

interface LogEffortModalProps {
  onClose: () => void;
  onSubmit: (data: { category: ActivityCategory; description: string; effortLevel: number; date: string }) => void;
}

const LogEffortModal: React.FC<LogEffortModalProps> = ({ onClose, onSubmit }) => {
  const [category, setCategory] = useState<ActivityCategory>(ActivityCategory.PATIENT_CARE);
  const [description, setDescription] = useState('');
  const [effortLevel, setEffortLevel] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit({ category, description, effortLevel, date });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Log Daily Effort</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ActivityCategory)}
              className="mt-1 block w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            >
              {Object.values(ActivityCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 rounded-md"
              placeholder="e.g., Performed a complex root canal procedure."
              required
            ></textarea>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Effort Level</label>
             <div className="flex items-center space-x-2">
                {[1,2,3,4].map(level => (
                    <button type="button" key={level} onClick={() => setEffortLevel(level)} className={`w-10 h-10 rounded-md border transition-colors ${effortLevel === level ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white border-slate-300 hover:bg-slate-50'}`}>
                        {level}
                    </button>
                ))}
             </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Log Effort</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogEffortModal;