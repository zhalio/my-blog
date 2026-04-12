const fs = require('fs');

// ==== 1. Optimize Hero & Separator (page.tsx) ====
let pageFile = fs.readFileSync('app/[locale]/page.tsx', 'utf-8');

// A. Make the avatar card neo-brutalism style too (Desktop & Mobile)
const avatarOld = 'shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none z-20 rounded-[2.5rem] border border-white dark:border-slate-700/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:border-slate-600/80 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group';
const avatarNew = 'shadow-[8px_8px_0px_#e2e8f0] dark:shadow-[8px_8px_0px_#1e293b] z-20 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-700 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[14px_14px_0px_#cbd5e1] dark:hover:shadow-[14px_14px_0px_#0f172a] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group bg-white dark:bg-slate-800';
if (pageFile.includes(avatarOld)) {
    pageFile = pageFile.split(avatarOld).join(avatarNew);
} else {
    // fallback or just replace border to give it brutalism edge
    pageFile = pageFile.replace(/shadow-\[0_15px_40px_-15px_rgba\(0,0,0,0\.05\)\] dark:shadow-none.*?group/g, avatarNew);
}

// Ensure the profile card has a clean white/dark-slate background rather than blurry glassmorphism so it fits the thick border
pageFile = pageFile.replace('bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl', 'bg-white dark:bg-slate-800');

// B. Show the Explore Separator on Mobile, adjust padding and hide inner doodles to prevent crowding
let sepTarget = 'z-10 hidden sm:flex';
pageFile = pageFile.split(sepTarget).join('z-10 flex w-full relative py-8 md:py-20');

// Make some middle doodles hidden on sm to prevent cramped layout
pageFile = pageFile.replace(
  '<HandDrawnPlanet className="w-14 h-14',
  '<HandDrawnPlanet className="hidden sm:block w-14 h-14'
);
pageFile = pageFile.replace(
  '<HandDrawnStar className="w-12 h-12 text-amber-400',
  '<HandDrawnStar className="hidden md:block w-12 h-12 text-amber-400'
);

// Scale down the Explore button font and padding for mobile
pageFile = pageFile.replace(
  'relative px-10 py-3.5 border-[3px]',
  'relative px-6 py-2.5 sm:px-10 sm:py-3.5 border-[3px]'
);

fs.writeFileSync('app/[locale]/page.tsx', pageFile);


// ==== 2. Optimize Post Cards (post-list.tsx) ====
let listFile = fs.readFileSync('features/blog/components/shared/post-list.tsx', 'utf-8');

// A. Give card a persistent shadow on mobile so it looks like a physical card even without hover
const cardOld = 'hover:-translate-y-3 hover:translate-x-1 hover:-rotate-1 hover:shadow-[12px_12px_0px_rgba(203,213,225,0.4)] dark:hover:shadow-[12px_12px_0px_rgba(30,41,59,0.7)] border-2 border-slate-200/60 dark:border-slate-700/60 active:translate-y-0 active:shadow-none active:translate-x-0 relative flex flex-col overflow-hidden group"';
const cardNew = 'shadow-[6px_6px_0px_rgba(203,213,225,0.4)] dark:shadow-[6px_6px_0px_rgba(30,41,59,0.4)] hover:-translate-y-3 hover:translate-x-1 hover:-rotate-1 hover:shadow-[14px_14px_0px_rgba(203,213,225,0.8)] dark:hover:shadow-[14px_14px_0px_rgba(30,41,59,0.8)] border-2 border-slate-200 dark:border-slate-700/80 active:translate-y-1 active:translate-x-1 active:shadow-[2px_2px_0px_rgba(203,213,225,0.8)] dark:active:shadow-[2px_2px_0px_rgba(30,41,59,0.8)] relative flex flex-col overflow-hidden group"';

listFile = listFile.replace(cardOld, cardNew);

// B. Slightly reduce cover height on mobile to save space
listFile = listFile.replace(
  '<div className="h-44 w-full relative',
  '<div className="h-36 sm:h-44 w-full relative'
);

fs.writeFileSync('features/blog/components/shared/post-list.tsx', listFile);

console.log('Optimizations applied!');