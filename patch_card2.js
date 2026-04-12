const fs = require('fs');
let file = fs.readFileSync('features/blog/components/shared/post-list.tsx', 'utf-8');

file = file.replace(
  /className="block h-full outline-none .*? relative flex flex-col overflow-hidden"/g,
  'className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem] bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-3 hover:translate-x-1 hover:-rotate-1 hover:shadow-[12px_12px_0px_rgba(203,213,225,0.4)] dark:hover:shadow-[12px_12px_0px_rgba(30,41,59,0.7)] border-2 border-slate-200/60 dark:border-slate-700/60 active:translate-y-0 active:shadow-none active:translate-x-0 relative flex flex-col overflow-hidden group"'
);

file = file.replace(
  /<div className="h-40 w-full relative overflow-hidden flex items-center justify-center transition-colors bg-slate-50 dark:bg-slate-900\/50">/g,
  '<div className="h-44 w-full relative overflow-hidden flex items-center justify-center transition-colors bg-slate-50 dark:bg-slate-900/50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#334155_1px,transparent_1px)]">'
);

const blobOld = '<Blob className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 -rotate-12 opacity-80 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${thumbBg.blob}`}/>';
const blobNew = '<Blob className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] animate-[spin_40s_linear_infinite] opacity-90 group-hover:scale-[1.1] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${thumbBg.blob}`}/>';
file = file.split(blobOld).join(blobNew);

const iconOld = `<div className={\`w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 border-2 border-white dark:border-slate-800 ring-4 ring-white/50 dark:ring-slate-800/50 \${thumbBg.text}\`}>
                <Icon className="w-10 h-10" />
              </div>`;

const iconNew = `<div className={\`w-20 h-20 bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,0.06)] dark:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-slate-100 dark:border-slate-700 \${thumbBg.text}\`}>
                <Icon className="w-10 h-10 drop-shadow-sm" />
              </div>`;

file = file.split(iconOld).join(iconNew);

fs.writeFileSync('features/blog/components/shared/post-list.tsx', file);
console.log('patched');