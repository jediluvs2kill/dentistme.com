import { DentistProfile, ActivityLog, ActivityCategory, Review, PortfolioItem } from '../types';

const reviewsData: { [key: string]: Review[] } = {
  'evelyn-reed': [
    { patientName: 'The Miller Family', rating: 5, comment: 'Dr. Reed is fantastic with kids! She made my son\'s first experience with braces a positive one.', date: '2023-10-15' },
    { patientName: 'James P.', rating: 5, comment: 'Invisalign treatment was smooth and the results are incredible. Highly recommend.', date: '2023-08-22' },
  ],
  'arjun-sharma': [
    { patientName: 'Aarav Singh', rating: 5, comment: 'Dr. Sharma restored my smile with implants. His attention to detail is second to none. A true artist.', date: '2023-11-01' },
    { patientName: 'Sunita K.', rating: 5, comment: 'The Digital Smile Design process was fascinating, and I couldn\'t be happier with my new veneers.', date: '2023-09-10' },
  ],
  'priya-verma': [
    { patientName: 'Rohan\'s Mother', rating: 5, comment: 'Dr. Verma is a magician with children. My anxious son now looks forward to his dental visits!', date: '2023-11-05' },
    { patientName: 'Community School Principal', rating: 5, comment: 'The dental health camp Dr. Verma organized was a huge success. She is a great asset to our community.', date: '2023-07-18' },
  ],
  'kenji-tanaka': [
    { patientName: 'Yuki S.', rating: 5, comment: 'Saved a tooth other dentists said was lost. Dr. Tanaka\'s microscopic surgery is amazing.', date: '2023-09-28' },
  ],
  'maria-garcia': [
    { patientName: 'Sophia L.', rating: 5, comment: 'I\'m so confident with my smile now, thanks to Dr. Garcia. The whitening and bonding work was perfect.', date: '2023-10-20' },
  ],
  'samuel-chen': [
    { patientName: 'David H.', rating: 5, comment: 'Dr. Chen is an expert periodontist. The implant surgery was painless and the results are perfect.', date: '2023-06-12' },
  ],
  'lena-weber': [
    { patientName: 'Klaus M.', rating: 5, comment: 'The regenerative procedure for my gums was a success. Dr. Weber used the latest techniques and explained everything.', date: '2023-08-04' },
  ],
  'carlos-rossi': [
     { patientName: 'Isabela F.', rating: 5, comment: 'Dr. Rossi provides excellent, compassionate care. His work in the community is inspiring.', date: '2023-10-02' },
  ]
};

const portfolioData: { [key: string]: PortfolioItem[] } = {
  'evelyn-reed': [
    { id: 'er1', title: 'Adolescent Invisalign Treatment', description: 'A 14-month Invisalign case to correct crowding and improve bite alignment for a 16-year-old patient.', imageUrl: 'https://images.unsplash.com/photo-1629905675095-2c218e261324?q=80&w=800', category: 'Orthodontics' },
  ],
  'arjun-sharma': [
    { id: 'as1', title: 'Full Mouth Rehabilitation', description: 'Complete restoration of function and aesthetics using a combination of crowns, bridges, and dental implants.', imageUrl: 'https://images.unsplash.com/photo-1629905675095-2c218e261324?q=80&w=800', category: 'Prosthodontics' },
  ],
  'maria-garcia': [
    { id: 'mg1', title: 'Porcelain Veneer Smile Makeover', description: 'Placement of 8 porcelain veneers to transform the shape, color, and alignment of the upper anterior teeth.', imageUrl: 'https://images.unsplash.com/photo-1629905675095-2c218e261324?q=80&w=800', category: 'Cosmetic Dentistry' },
  ]
};


export const profiles: DentistProfile[] = [
  {
    id: 'evelyn-reed',
    name: 'Dr. Evelyn Reed',
    title: 'Orthodontist & Dental Surgeon',
    avatarUrl: 'https://i.pravatar.cc/256?u=evelyn-reed',
    bio: 'Dedicated orthodontist with over 15 years of experience in creating beautiful smiles. Passionate about leveraging new technologies for patient comfort and efficient treatment.',
    specializations: ['Orthodontics', 'Invisalign', 'Surgical Dentistry', 'Pediatric Care'],
    certifications: ['American Board of Orthodontics', 'Invisalign Certified Provider'],
    location: { city: 'Smileville', country: 'USA' },
    contact: {
      email: 'e.reed.dds@dentistme.com',
      phone: '(555) 123-4567',
      address: '123 Dental Drive, Smileville, USA'
    },
    reviews: reviewsData['evelyn-reed'],
    portfolio: portfolioData['evelyn-reed'],
    endorsements: { 'Invisalign': 18, 'Pediatric Care': 12, 'Surgical Extraction': 7 },
    acceptsNewPatients: true,
    languages: ['English', 'Spanish']
  },
  {
    id: 'arjun-sharma',
    name: 'Dr. Arjun Sharma',
    title: 'Prosthodontist & Implant Specialist',
    avatarUrl: 'https://i.pravatar.cc/256?u=arjun-sharma',
    bio: 'A leading prosthodontist, specializing in full-mouth rehabilitation. Dr. Sharma is known for his meticulous approach and for integrating digital workflows into his practice.',
    specializations: ['Prosthodontics', 'Dental Implants', 'Cosmetic Dentistry', 'Digital Smile Design'],
    certifications: ['Masters in Dental Surgery (Prosthodontics)', 'Diplomate, Indian Board of Prosthodontics'],
    location: { city: 'New Delhi', country: 'India' },
    contact: {
      email: 'a.sharma.mds@dentistme.com',
      phone: '+91 98765 43210',
      address: '456 Dental Plaza, New Delhi, India'
    },
    reviews: reviewsData['arjun-sharma'],
    portfolio: portfolioData['arjun-sharma'],
    endorsements: { 'Dental Implants': 25, 'Full Mouth Rehab': 15, 'Cosmetic Dentistry': 10 },
    acceptsNewPatients: true,
    languages: ['English', 'Hindi']
  },
  {
    id: 'priya-verma',
    name: 'Dr. Priya Verma',
    title: 'Pediatric Dentist & Community Health Advocate',
    avatarUrl: 'https://i.pravatar.cc/256?u=priya-verma',
    bio: 'Dr. Verma is a passionate pediatric dentist dedicated to making dental visits a positive experience for children. She actively organizes dental health camps in underserved communities.',
    specializations: ['Pediatric Dentistry', 'Preventive Care', 'Special Needs Dentistry'],
    certifications: ['Masters in Dental Surgery (Pedodontics)', 'Public Health Specialist (Oral Health)'],
    location: { city: 'Mumbai', country: 'India' },
    contact: {
      email: 'p.verma.mds@dentistme.com',
      phone: '+91 91234 56789',
      address: '789 Kids Clinic, Mumbai, India'
    },
    reviews: reviewsData['priya-verma'],
    portfolio: [],
    endorsements: { 'Pediatric Dentistry': 22, 'Community Outreach': 18, 'Preventive Care': 9 },
    acceptsNewPatients: false,
    languages: ['English', 'Hindi', 'Marathi']
  },
  {
    id: 'kenji-tanaka',
    name: 'Dr. Kenji Tanaka',
    title: 'Endodontist & Researcher',
    avatarUrl: 'https://i.pravatar.cc/256?u=kenji-tanaka',
    bio: 'An endodontist focused on microscopic and regenerative procedures. Dr. Tanaka is a published researcher on dental pulp regeneration and lectures at Tokyo Dental University.',
    specializations: ['Endodontics', 'Microscopic Surgery', 'Research & Publications'],
    certifications: ['PhD in Dental Science', 'Specialist Member of the Japan Endodontic Association'],
    location: { city: 'Tokyo', country: 'Japan' },
    contact: {
      email: 'k.tanaka.phd@dentistme.com',
      phone: '+81 3-1234-5678',
      address: '1-1-1 Dental Science Tower, Tokyo, Japan'
    },
    reviews: reviewsData['kenji-tanaka'],
    portfolio: [],
    endorsements: { 'Endodontics': 30, 'Research': 14 },
    acceptsNewPatients: true,
    languages: ['Japanese', 'English']
  },
  {
    id: 'maria-garcia',
    name: 'Dr. Maria Garcia',
    title: 'General & Cosmetic Dentist',
    avatarUrl: 'https://i.pravatar.cc/256?u=maria-garcia',
    bio: 'With a friendly demeanor and a keen eye for aesthetics, Dr. Garcia helps patients achieve their dream smiles through a combination of general and cosmetic dentistry.',
    specializations: ['Cosmetic Dentistry', 'Patient Care', 'Teeth Whitening', 'Veneers'],
    certifications: ['American Academy of Cosmetic Dentistry Member', 'Digital Smile Design Certified'],
    location: { city: 'Miami', country: 'USA' },
    contact: {
      email: 'm.garcia.dmd@dentistme.com',
      phone: '(305) 987-6543',
      address: '500 Ocean View Dental, Miami, USA'
    },
    reviews: reviewsData['maria-garcia'],
    portfolio: portfolioData['maria-garcia'],
    endorsements: { 'Veneers': 19, 'Patient Communication': 15, 'Teeth Whitening': 11 },
    acceptsNewPatients: true,
    languages: ['English', 'Spanish']
  },
  {
    id: 'samuel-chen',
    name: 'Dr. Samuel Chen',
    title: 'Periodontist',
    avatarUrl: 'https://i.pravatar.cc/256?u=samuel-chen',
    bio: 'Dr. Chen is a board-certified periodontist specializing in the treatment of gum disease, dental implants, and cosmetic periodontal surgery. He is a clinical associate professor at NYU.',
    specializations: ['Periodontics', 'Dental Implants', 'Surgical Dentistry'],
    certifications: ['American Board of Periodontology', 'Clinical Associate Professor, NYU'],
    location: { city: 'New York', country: 'USA' },
    contact: {
      email: 's.chen.dds@dentistme.com',
      phone: '(212) 555-0123',
      address: '800 Park Avenue Dental, New York, USA'
    },
    reviews: reviewsData['samuel-chen'],
    portfolio: [],
    endorsements: { 'Periodontics': 28, 'Dental Implants': 20 },
    acceptsNewPatients: false,
    languages: ['English', 'Mandarin']
  },
  {
    id: 'lena-weber',
    name: 'Dr. Lena Weber',
    title: 'Periodontist & Regenerative Specialist',
    avatarUrl: 'https://i.pravatar.cc/256?u=lena-weber',
    bio: 'Dr. Weber is a German periodontist known for her work in tissue regeneration and minimally invasive surgical techniques. She is a frequent speaker at international dental conferences.',
    specializations: ['Periodontics', 'Tissue Regeneration', 'Minimally Invasive Surgery'],
    certifications: ['German Board of Periodontology', 'Master of Science in Periodontology'],
    location: { city: 'Berlin', country: 'Germany' },
    contact: {
      email: 'l.weber.dds@dentistme.com',
      phone: '+49 30 1234567',
      address: '10 Kurfürstendamm, Berlin, Germany'
    },
    reviews: reviewsData['lena-weber'],
    portfolio: [],
    endorsements: { 'Tissue Regeneration': 24, 'Periodontics': 18 },
    acceptsNewPatients: true,
    languages: ['German', 'English']
  },
  {
    id: 'carlos-rossi',
    name: 'Dr. Carlos Rossi',
    title: 'General Dentist & Community Health Leader',
    avatarUrl: 'https://i.pravatar.cc/256?u=carlos-rossi',
    bio: 'A passionate general dentist from Brazil, Dr. Rossi focuses on providing accessible dental care. He leads a mobile dental clinic project that serves remote communities in the Amazon.',
    specializations: ['General Dentistry', 'Community Outreach', 'Preventive Care', 'Public Health'],
    certifications: ['Federal Council of Dentistry (Brazil)', 'Certificate in Public Health Dentistry'],
    location: { city: 'São Paulo', country: 'Brazil' },
    contact: {
      email: 'c.rossi.dds@dentistme.com',
      phone: '+55 11 98765-4321',
      address: '2500 Avenida Paulista, São Paulo, Brazil'
    },
    reviews: reviewsData['carlos-rossi'],
    portfolio: [],
    endorsements: { 'Community Outreach': 35, 'Preventive Care': 20, 'General Dentistry': 15 },
    acceptsNewPatients: true,
    languages: ['Portuguese', 'English']
  }
];

const descriptions = {
  [ActivityCategory.PATIENT_CARE]: ['Routine check-up and cleaning', 'Complex root canal procedure', 'Wisdom tooth extraction', 'Dental implant surgery', 'Pediatric dental examination', 'Fitted new set of ceramic braces', 'Cosmetic bonding on anterior teeth'],
  [ActivityCategory.CONTINUING_EDUCATION]: ['Attended webinar on modern endodontics', 'Completed course on cosmetic dentistry', 'Studied new orthodontic techniques', 'Read research paper on periodontal disease', 'Workshop on digital implant planning'],
  [ActivityCategory.RESEARCH]: ['Analyzed data for clinical trial on new bonding agent', 'Wrote abstract for dental conference', 'Collaborated on a new biomaterial study', 'Peer-reviewed a journal submission'],
  [ActivityCategory.COMMUNITY_OUTREACH]: ['Volunteered at local school for dental hygiene day', 'Presented at a community health fair', 'Provided free screenings at a senior center', 'Conducted oral cancer screening camp'],
  [ActivityCategory.ADMINISTRATIVE_WORK]: ['Updated patient records system', 'Managed clinic inventory and ordering', 'Conducted staff training session', 'Finalized quarterly financial reports'],
};

type ActivityLevel = 'high' | 'medium' | 'low';
const activityLevels: { [key: string]: ActivityLevel } = {
    'evelyn-reed': 'medium',
    'arjun-sharma': 'medium',
    'priya-verma': 'high',
    'kenji-tanaka': 'high',
    'maria-garcia': 'medium',
    'samuel-chen': 'low',
    'lena-weber': 'low',
    'carlos-rossi': 'high',
};

// Generate a unique set of activities for each profile
export const generateActivitiesForProfile = (profileId: string): ActivityLog[] => {
    const activities: ActivityLog[] = [];
    const today = new Date();
    const categories = Object.values(ActivityCategory);
    
    let seed = 0;
    for (let i = 0; i < profileId.length; i++) {
        seed += profileId.charCodeAt(i);
    }

    const customRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const level = activityLevels[profileId] || 'medium';
    const activityChance = { high: 0.7, medium: 0.55, low: 0.3 }[level];

    for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        if (customRandom() < activityChance) { 
            const numActivities = Math.floor(customRandom() * 2) + 1;
            for (let j = 0; j < numActivities; j++) {
                const category = categories[Math.floor(customRandom() * categories.length)];
                const description = descriptions[category][Math.floor(customRandom() * descriptions[category].length)];
                activities.push({
                    id: `${dateString}-${j}-${profileId}`,
                    date: dateString,
                    category: category,
                    description: description,
                    effortLevel: Math.ceil(customRandom() * 4),
                });
            }
        }
    }
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};