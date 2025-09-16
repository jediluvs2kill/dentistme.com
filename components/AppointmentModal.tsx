
import React, { useState } from 'react';
import { DentistProfile } from '../types';
import Button from './Button';
import { XIcon } from './icons';

interface AppointmentModalProps {
  dentist: DentistProfile;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ dentist, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, preferredDate, reason });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Request Appointment with {dentist.name}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        {isSubmitted ? (
            <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-emerald-600">Request Sent!</h3>
                <p className="mt-2 text-slate-600">{dentist.name}'s office will contact you shortly to confirm your appointment.</p>
                <div className="mt-6">
                    <Button onClick={onClose} variant="primary">Close</Button>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-sm text-slate-600">Fill out the form below. The clinic will contact you to confirm the final date and time.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                    </div>
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700">Preferred Date</label>
                    <input type="date" id="date" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-slate-700">Reason for Visit</label>
                    <textarea id="reason" rows={3} value={reason} onChange={e => setReason(e.target.value)} className="mt-1 shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-slate-300 rounded-md" placeholder="e.g., Check-up, tooth pain, cosmetic consultation..."></textarea>
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary">Send Request</Button>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
