import React from 'react';
import Button from './Button';
import { ChartBarIcon, ShieldCheckIcon, UsersIcon, CheckIcon, CalendarPlusIcon } from './icons';

interface HomePageProps {
  onNavigateToDirectory: () => void;
}

const FeatureHighlight: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; reverse?: boolean }> = ({ icon, title, children, reverse = false }) => (
  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2 flex justify-center p-8">
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
        {icon}
      </div>
    </div>
    <div className="md:w-1/2">
      <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-lg text-slate-600">{children}</p>
    </div>
  </div>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigateToDirectory }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Build Your Reputation. <span className="text-sky-600">Grow Your Practice.</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-600">
                The all-in-one platform for dental professionals to showcase expertise, build patient trust, and streamline connections.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button onClick={onNavigateToDirectory} variant="primary" className="px-8 py-4 text-lg font-semibold">
                    Find a Dentist
                </Button>
                <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">
                    Join for Free
                </Button>
            </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              A Complete Toolkit for Professional Excellence
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              From dynamic profiles to patient engagement, we have you covered.
            </p>
          </div>
          
          <FeatureHighlight 
            icon={<ChartBarIcon className="w-32 h-32 md:w-48 md:h-48 text-emerald-500" />}
            title="Visualize Your Dedication"
          >
            Go beyond a static resume. Our signature contribution graph tracks your daily efforts, from patient care to continuing education, creating a dynamic record of your professional commitment.
          </FeatureHighlight>

          <FeatureHighlight 
            icon={<ShieldCheckIcon className="w-32 h-32 md:w-48 md:h-48 text-sky-500" />}
            title="Build Unbreakable Trust"
            reverse
          >
            Show, don't just tell. Earn patient confidence before they even meet you by showcasing visual case studies, authentic patient reviews, peer endorsements, and engaging video reels.
          </FeatureHighlight>

          <FeatureHighlight 
            icon={<UsersIcon className="w-32 h-32 md:w-48 md:h-48 text-violet-500" />}
            title="Engage & Educate Your Community"
          >
            Become a trusted authority. Answer real-world questions in our public Q&A forum, demonstrate your expertise, and attract new patients who value your knowledge and willingness to help.
          </FeatureHighlight>
           
          <FeatureHighlight
            icon={<CalendarPlusIcon className="w-32 h-32 md:w-48 md:h-48 text-amber-500" />}
            title="From Discovery to Appointment"
            reverse
          >
            Turn profile views into patients. Our powerful directory helps patients find you, and integrated appointment booking makes it simple for them to connect. It's patient acquisition, streamlined.
          </FeatureHighlight>
        </div>
      </div>
      
       {/* Pricing Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Choose the Plan That’s Right for You
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                    Start for free or unlock powerful features to accelerate your career.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Basic Plan */}
                <div className="border border-slate-200 rounded-lg p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900">Basic</h3>
                    <p className="mt-4 text-slate-500">A professional start. Create your public profile and get discovered.</p>
                    <div className="mt-6">
                        <span className="text-4xl font-extrabold text-slate-900">$0</span>
                        <span className="text-base font-medium text-slate-500">/ forever</span>
                    </div>
                    <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Public Dentist Profile</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Contribution Graph & Logging</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Appear in Directory Search</li>
                    </ul>
                    <Button variant="secondary" className="w-full mt-8">Get Started</Button>
                </div>

                {/* Premium Plan */}
                <div className="border-2 border-sky-500 rounded-lg p-8 flex flex-col relative shadow-2xl">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-sky-500 text-white text-sm font-semibold rounded-full">Most Popular</span>
                    </div>
                    <h3 className="text-2xl font-bold text-sky-600">Premium</h3>
                    <p className="mt-4 text-slate-500">Unlock the full suite of tools to build trust and grow your practice.</p>
                    <div className="mt-6">
                        <span className="text-4xl font-extrabold text-slate-900">$29</span>
                        <span className="text-base font-medium text-slate-500">/ month</span>
                    </div>
                    <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Everything in Basic, plus:</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Collect Patient Reviews</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Build a Visual Portfolio</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Upload Video Reels</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Answer Community Q&A</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Appointment Booking Enabled</li>
                        <li className="flex items-start font-semibold text-slate-800"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Appear on Leaderboards</li>
                    </ul>
                    <Button variant="primary" className="w-full mt-8">Choose Premium</Button>
                </div>

                {/* Pro Plan */}
                 <div className="border border-slate-200 rounded-lg p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900">Pro for Clinics</h3>
                    <p className="mt-4 text-slate-500">Manage your entire team, enhance your brand, and recruit top talent.</p>
                    <div className="mt-6">
                        <span className="text-4xl font-extrabold text-slate-900">Contact Us</span>
                    </div>
                    <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Everything in Premium, plus:</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Clinic Profile Page</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Team Management & Analytics</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Integrated Job Board</li>
                        <li className="flex items-start"><CheckIcon className="w-6 h-6 text-emerald-500 mr-2 flex-shrink-0"/>Priority Support</li>
                    </ul>
                    <Button variant="secondary" className="w-full mt-8">Contact Sales</Button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="bg-slate-800">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to redefine your professional presence?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-slate-200">
            Join the fastest-growing network of dental professionals today.
          </p>
          <Button variant="primary" className="mt-8 w-full sm:w-auto px-8 py-4 text-lg">
            Sign Up for Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} DentistMe.com. All rights reserved.</p>
          </div>
      </footer>
    </>
  );
};

export default HomePage;