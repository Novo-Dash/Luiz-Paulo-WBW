export interface StatItem {
  value: string;
  label: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface WhyItem {
  number: string;
  title: string;
  description: string;
  icon: string;
  variant: 'white' | 'accent' | 'gray';
}

export interface AchievementItem {
  label: string;
  value: string;
}

export interface ReviewItem {
  id: number;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const stats: StatItem[] = [
  { value: '300+', label: 'ACTIVE STUDENTS' },
  { value: '10+', label: 'YEARS OF EXCELLENCE' },
  { value: '5.0 ★', label: 'GOOGLE REVIEWS' },
];

export const programs: ProgramItem[] = [
  {
    id: 'kids',
    title: 'KIDS JIU-JITSU',
    description: 'Safe, fun, and structured. Our kids program builds confidence, discipline, and self-defense skills.',
    image: 'https://placehold.co/700x500/A64536/FFFFFF?text=Kids+BJJ',
  },
  {
    id: 'beginners',
    title: 'BEGINNERS JIU-JITSU',
    description: 'No experience needed. Our beginners program introduces you to BJJ fundamentals in a welcoming environment.',
    image: 'https://placehold.co/700x500/2A2A2A/FFFFFF?text=Beginners+BJJ',
  },
  {
    id: 'adult',
    title: 'ADULT JIU-JITSU',
    description: 'Train with purpose. Build strength, technique, and mental toughness in our structured adult program.',
    image: 'https://placehold.co/700x500/1A1A1A/FFFFFF?text=Adult+BJJ',
  },
];

export const whyItems: WhyItem[] = [
  {
    number: '01',
    title: 'SELF DEFENSE',
    description: 'Learn practical, real-world techniques to protect yourself and your loved ones. BJJ is proven effective on the street.',
    icon: '🛡️',
    variant: 'white',
  },
  {
    number: '02',
    title: 'LESS STRESS',
    description: 'The mat is a mental reset. Training clears your head, reduces anxiety, and boosts your mood every single session.',
    icon: '❤️',
    variant: 'accent',
  },
  {
    number: '03',
    title: 'DISCIPLINE',
    description: 'Show up, roll, improve. BJJ teaches consistency and goal-setting that bleeds into every area of your life.',
    icon: '🎯',
    variant: 'white',
  },
  {
    number: '04',
    title: 'COMMUNITY',
    description: 'You are never alone on this journey. Train alongside people who push you forward and have your back off the mat too.',
    icon: '🤝',
    variant: 'gray',
  },
];

export const achievements: AchievementItem[] = [
  { label: 'World Ranking', value: 'Top 50 — IBJJF' },
  { label: 'Titles', value: '20+ Competition Medals' },
  { label: 'IBJJF', value: 'Certified Black Belt' },
  { label: 'Experience', value: '15+ Years Competing' },
  { label: 'Instructor Certs', value: 'IBJJF & GB Certified' },
  { label: 'Students Promoted', value: '50+ Black Belts' },
];

export const reviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Mitchell Gadless',
    timeAgo: '11 months ago',
    rating: 5,
    text: 'Luiz and all his staff are incredibly professional. They have made my son and I feel at home at every class. Coach Tony and coach A have an incredible method with the kids. My son can\'t wait for Tuesday and Thursday class every week!',
    avatar: 'https://placehold.co/60x60/CC2020/FFFFFF?text=MG',
  },
  {
    id: 2,
    name: 'Joao Sequeira',
    timeAgo: '5 months ago',
    rating: 5,
    text: 'This school is nothing short of amazing! From the incredible environment to the energy and commitment that the several instructors show in every class. I feel very fortunate to have found this school for my children to learn a top tier martial art.',
    avatar: 'https://placehold.co/60x60/1A1A1A/FFFFFF?text=JS',
  },
  {
    id: 3,
    name: 'Daniel Loureiro',
    timeAgo: '4 months ago',
    rating: 5,
    text: 'The Luiz Paulo Jiu-Jitsu team is awesome! If you\'re looking for a place to train, improve your jiu-jitsu, and be part of a great community — this is the place.',
    avatar: 'https://placehold.co/60x60/CC2020/FFFFFF?text=DL',
  },
  {
    id: 4,
    name: 'Daniel Egan',
    timeAgo: '4 months ago',
    rating: 5,
    text: 'Joining Luiz Paulo jiu jitsu has been one of the best decisions of my life. From the moment you walk in they treat you like family and are very helpful in achieving your goals. From the instructors, to the gym community, everyone is great.',
    avatar: 'https://placehold.co/60x60/1A1A1A/FFFFFF?text=DE',
  },
  {
    id: 5,
    name: 'Ian Murphy',
    timeAgo: '4 months ago',
    rating: 5,
    text: 'This is an excellent school to learn Jiu Jitsu. Regardless of rank, everyone is very approachable and eager to teach and support learning. This is a great school for kids and adults. The owner is on site training all levels every class.',
    avatar: 'https://placehold.co/60x60/CC2020/FFFFFF?text=IM',
  },
  {
    id: 6,
    name: 'Nick Livingston',
    timeAgo: '4 months ago',
    rating: 5,
    text: 'Luiz Paulo BJJ is outstanding. I was intimidated to start, figured I\'d give it a try, and was hooked after the trial. It is a very welcoming place to train and the instructors work with you to match your skill level. 10/10 recommend.',
    avatar: 'https://placehold.co/60x60/1A1A1A/FFFFFF?text=NL',
  },
  {
    id: 7,
    name: 'Liam Slattery',
    timeAgo: '4 months ago',
    rating: 5,
    text: 'Super chill, beginner friendly gym. I started with zero experience in anything like bjj. Everyone is friendly and happy to give advice and teach you what they know. Here you can find people who have a deep understanding of the art and are happy to share it.',
    avatar: 'https://placehold.co/60x60/CC2020/FFFFFF?text=LS',
  },
  {
    id: 8,
    name: 'John Fleurimond',
    timeAgo: '3 months ago',
    rating: 5,
    text: 'Joining this jiu-jitsu gym has been the best decision of my life. The instructor is nothing short of phenomenal, and the members are equally impressive. I only wish I had discovered this gym sooner, as it has truly transformed my life.',
    avatar: 'https://placehold.co/60x60/1A1A1A/FFFFFF?text=JF',
  },
  {
    id: 9,
    name: 'Jason',
    timeAgo: '3 years ago',
    rating: 5,
    text: 'The gym is great. The people are great. The atmosphere is great. Every day you come, you can expect to learn. You can expect to train. You can expect to grow and get better. Luiz cares about his students and wants everyone to reach their potential.',
    avatar: 'https://placehold.co/60x60/CC2020/FFFFFF?text=J',
  },
  {
    id: 10,
    name: 'John Doe',
    timeAgo: '10 months ago',
    rating: 5,
    text: 'This school is amazing! Super knowledgeable and professional instructors and top notch students. Very friendly atmosphere, awesome environment. The training facility is always clean and is world class. Hands down the best BJJ training you can get in the area.',
    avatar: 'https://placehold.co/60x60/1A1A1A/FFFFFF?text=JD',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What should I bring to my first class?',
    answer: 'Just wear comfortable athletic clothing — shorts and a t-shirt are perfect. We provide loaner gis for your first class. After that, we\'ll help you get your own gear. Bring water, a positive attitude, and leave the ego at the door.',
  },
  {
    id: 2,
    question: 'Is BJJ suitable for beginners?',
    answer: 'Absolutely. Our curriculum is specifically designed to welcome complete beginners. Our fundamentals program builds your technique from the ground up. Every black belt in our gym started exactly where you are now.',
  },
  {
    id: 3,
    question: 'Do I need to be in shape to start?',
    answer: 'No. BJJ is one of the best ways to GET in shape. The training itself is your workout. We see all fitness levels walk through the door and everyone improves dramatically within weeks.',
  },
  {
    id: 4,
    question: 'Is it safe? What about injuries?',
    answer: 'Safety is our top priority. We emphasize control, technique, and respect during training. Injuries can happen in any sport, but we train smart. Our coaches actively supervise all rolls and our culture strictly prohibits reckless behavior.',
  },
  {
    id: 5,
    question: 'Can BJJ help with self-defense?',
    answer: 'Yes — BJJ is widely considered one of the most effective martial arts for real-world self-defense. You\'ll learn how to control situations, escape from dangerous positions, and neutralize threats — all without relying on striking.',
  },
  {
    id: 6,
    question: 'What can I expect in my first class?',
    answer: 'You\'ll receive a warm welcome from our team, a brief orientation to the mat rules and culture, a warm-up, technique instruction, and optional light rolling. No pressure, no intimidation — just learning.',
  },
  {
    id: 7,
    question: 'I\'m not interested in competing. Can I still train?',
    answer: 'Of course. The majority of our students train purely for fitness, self-defense, stress relief, and community. Competition is always optional. We celebrate every student\'s journey regardless of whether they step on the mat to compete.',
  },
  {
    id: 8,
    question: 'Is there a kids program?',
    answer: 'Yes! Our Kids BJJ program is for ages 4–15 and is specifically designed to be age-appropriate, fun, and safe. Kids develop discipline, coordination, confidence, and social skills while learning real Jiu-Jitsu.',
  },
];
