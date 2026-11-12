// Content for the main site, in display order. Logos live in /public/logos.
// Entries are the original site copy, moved here from app/page.tsx.

export type ExperienceItem = { logo: string; name: string; year: string; role: string };
type ProgramItem = { logo: string; name: string; program: string; year: string };
export type Project = { name: string; desc: string; tags: string[]; link: string };
export type ContactLink = { label: string; value: string; action: string; href: string };

export const PROFILE = {
  name: 'Jared Alonzo',
  location: 'San Francisco, CA',
  bio: [
    "Welcome. You can call me Chapis. I am a Product Manager at Autodesk. I’m a first-generation Guatemalan-American from Cincinnati, Ohio. I am currently based in San Francisco, CA.",
    "I am passionate about Traveling, Gastronomy, Pedagogy and Sports. I am a Cincinnati Bengals, Ohio State Buckeyes, Liverpool FC and Denver Nuggets fan.",
    "Currently studying Computer Science and Engineering + Theoretical Mathematics at The Ohio State University, with a minor in Education.",
    "I am always excited to connect. Feel free to reach out."
  ],
  cta: { label: 'Schedule a call', href: 'https://cal.com/alonzoji' },
};

export const WORK: ExperienceItem[] = [
  { logo: '/logos/autodesk_logo.jpeg', name: 'Autodesk', year: '2026', role: 'Product Manager Intern' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', year: '2025', role: 'Product Manager Intern' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', year: '2024', role: 'Software Engineer Intern' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', year: '2023', role: 'Software Engineer Intern' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', year: '2022', role: 'Software Engineer Intern' },
];

export const INVOLVEMENT: ExperienceItem[] = [
  { logo: '/logos/buckeye_careers_students_logo.jpeg', name: 'Buckeye Leadership Fellowship', year: '2024–Present', role: '2027 Fellow' },
  { logo: '/logos/mlt_logo.jpeg', name: 'Management Leadership for Tomorrow', year: '2024–Present', role: '2027 Career Prep Fellow' },
  { logo: '/logos/seousa_logo.jpeg', name: 'Sponsors for Educational Opportunity', year: '2025', role: 'Tech Developer' },
  { logo: '/logos/colorstack_logo.jpeg', name: 'ColorStack', year: '2023–Present', role: 'Member' },
  { logo: '/logos/bill__melinda_gates_foundation_logo.jpeg', name: 'Gates Foundation', year: '2023–Present', role: 'Gates Scholar' },
  { logo: '/logos/horatio_alger_association_logo.jpeg', name: 'Horatio Alger Association', year: '2022–Present', role: 'State Scholar' },
];

const PROGRAMS_RAW: ProgramItem[] = [
  { logo: '/logos/bloomberg_logo.jpeg', name: 'Bloomberg', program: 'Decoded: Data at Bloomberg', year: '2025' },
  { logo: '/logos/deloitte_logo.jpeg', name: 'Deloitte', program: 'Leadership Allyship & Mentorship Program', year: '2025' },
  { logo: '/logos/uber_logo.jpeg', name: 'Uber', program: 'Career Prep Fellowship', year: '2024' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', program: 'Standout Emerging Leaders Camp', year: '2024' },
  { logo: '/logos/nvidia_logo.jpeg', name: 'NVIDIA', program: 'Summer Bridge Program', year: '2024' },
  { logo: '/logos/rsm_logo.jpeg', name: 'RSM US LLP', program: 'RSM Excellence Academy', year: '2024' },
  { logo: '/logos/accenture_logo.jpeg', name: 'Accenture', program: 'Elevate to Innovate Externship', year: '2024' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', program: 'First-Gen Focus', year: '2024' },
  { logo: '/logos/hrt_logo.jpeg', name: 'Hudson River Trading', program: 'Inside HRT', year: '2024' },
  { logo: '/logos/google_logo.jpeg', name: 'Google', program: 'Latinx Student Leadership Summit', year: '2024' },
];

/** Programs shown with the program as the title and the company underneath. */
export const PROGRAMS: ExperienceItem[] = PROGRAMS_RAW.map(p => ({
  logo: p.logo,
  name: p.program,
  year: p.year,
  role: p.name,
}));

export const PROJECTS: Project[] = [
  { name: 'Hue — AI Language Coach', desc: 'AI-powered English fluency coach for ESL learners. Hue grades speaking through natural 1:1 conversations in a gamified format.', tags: ['React', 'TypeScript', 'Gemini 2.5'], link: 'https://hue-teal.vercel.app/' },
  { name: 'Hue iOS', desc: 'Native iOS port of Hue, bringing AI fluency coaching to iPhone with a JavaScript backend.', tags: ['Swift', 'Xcode', 'Node'], link: 'https://hue-teal.vercel.app/' },
  { name: 'QuikChek', desc: 'Mobile-first news + fact-checking app for Gen Z. Verifies TikTok links in real time using audio transcription and multi-source NLP.', tags: ['React Native', 'NLP', 'Audio'], link: 'https://quik-chek.vercel.app' },
  { name: 'SkillBridge', desc: 'A CLI that critiques your résumé and generates a new one from scratch. Parses PDF/DOCX, drafts impact bullets with GPT, outputs LaTeX.', tags: ['Python', 'GPT-3.5', 'LaTeX'], link: 'https://github.com/AlonzoJI/SkillBridge' },
  { name: 'NetPay', desc: 'Rails app for splitting trip expenses. Creates trips, tracks participants and expenses, and computes a minimal settlement graph.', tags: ['Rails', 'PostgreSQL'], link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_final_project' },
  { name: 'Curriculum Visualization', desc: 'Interactive 4-year map of OSU CS&E. Hover any course to highlight its full prereq/postreq chain across all 8 semesters.', tags: ['D3', 'Graph traversal'], link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_vis' },
];

export const CONTACT_INTRO = "If anything here resonated, the easiest way to connect is the link below. I read every message.";

export const CONTACT: ContactLink[] = [
  { label: "Schedule", value: "cal.com/alonzoji", action: "15-min intro", href: "https://cal.com/alonzoji" },
  { label: "LinkedIn", value: "jared-alonzo", action: "connect", href: "https://www.linkedin.com/in/jared-alonzo/" },
  { label: "GitHub", value: "AlonzoJI", action: "code", href: "https://github.com/AlonzoJI" },
  { label: "X", value: "@chapisalonzo", action: "read", href: "https://x.com/chapisalonzo" },
];

export const CLOSING_LINE = 'Thanks for stopping by.';
