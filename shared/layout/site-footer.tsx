import Link from "next/link";

export function SiteFooter({ text }: { text: string }) {
  return (
    <footer className="w-full mt-auto z-10 relative pb-6 pt-12">      
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-center lg:px-8">
        <p className="text-center text-xs md:text-sm text-slate-400 dark:text-slate-500">
          {text}
        </p>
      </div>
    </footer>
  )
}
