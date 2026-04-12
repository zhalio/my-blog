const fs = require('fs');
let file = fs.readFileSync('app/[locale]/page.tsx', 'utf-8');

const target1 = '<div className="px-8 py-3 border-[3px] border-dashed border-slate-300 dark:border-slate-600 rounded-[2rem] font-black text-slate-400 dark:text-slate-400 tracking-[0.25em] text-sm md:text-base uppercase hover:scale-110 hover:-rotate-[3deg] hover:border-sky-400 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-all duration-300 font-heading bg-white dark:bg-slate-800 shadow-sm cursor-crosshair z-20 hover:shadow-xl">';

const replacement1 = '<div className="relative px-10 py-3.5 border-[3px] border-dashed border-slate-300 dark:border-slate-600 rounded-[2rem] font-black text-slate-400 dark:text-slate-400 tracking-[0.25em] text-sm md:text-base uppercase hover:scale-110 hover:-rotate-[3deg] hover:border-sky-400 dark:hover:border-slate-500 hover:text-sky-500 dark:hover:text-sky-300 transition-all duration-300 font-heading bg-white dark:bg-slate-800 cursor-crosshair z-20 shadow-[6px_6px_0px_#e2e8f0] dark:shadow-[6px_6px_0px_#0f172a] hover:shadow-[10px_10px_0px_#38bdf8] dark:hover:shadow-[10px_10px_0px_#38bdf8] -translate-y-1 hover:-translate-y-3">';

file = file.split(target1).join(replacement1);

fs.writeFileSync('app/[locale]/page.tsx', file);
console.log('patched explore');