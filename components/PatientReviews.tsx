import React from 'react';
import { Review } from '../types';
import { StarIcon, StarIconFilled } from './icons';

interface PatientReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) =>
            i < Math.round(rating)
                ? <StarIconFilled key={i} className="w-5 h-5 text-amber-400" />
                : <StarIcon key={i} className="w-5 h-5 text-slate-300" />
        )}
    </div>
);

const PatientReviews: React.FC<PatientReviewsProps> = ({ reviews, averageRating }) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Patient Reviews</h2>
        <div className="flex items-center mt-2 sm:mt-0">
          <StarRating rating={averageRating} />
          <p className="ml-2 text-sm text-slate-600 font-medium">
            {averageRating.toFixed(1)} average from {reviews.length} reviews
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-t border-slate-200 pt-6 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                 <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">
                    {review.patientName.charAt(0)}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-slate-800">{review.patientName}</p>
                     <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-4 text-slate-700 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReviews;
