'use client';

import * as React from 'react';
import { useRouter } from '@/i18n/routing';
import { Search } from 'lucide-react';
import { PostData } from '@/lib/posts';
import Fuse from 'fuse.js';
import { useLocale, useTranslations } from 'next-intl';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [posts, setPosts] = React.useState<PostData[]>([]);
  const locale = useLocale();
  const t = useTranslations('Common');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    // Fetch data immediately on mount or when locale changes, 
    // so it's ready when user types. Or fetch on first open.
    // Let's fetch on first open to save bandwidth, but since we want inline experience,
    // maybe fetch on mount is better if data is small.
    // Given it's a static JSON, it's fast.
    fetch(`/api/search`)
      .then((res) => res.json())
      .then((data: (PostData & { locale: string })[]) => {
        const filteredPosts = data.filter(post => post.locale === locale);
        setPosts(filteredPosts);
      });
  }, [locale]);

  const fuse = React.useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'summary', 'category'],
      threshold: 0.3,
    });
  }, [posts]);

  const results = React.useMemo(() => {
    if (!query) return posts;
    return fuse.search(query).map((result) => result.item);
  }, [query, posts, fuse]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <div className="relative w-full md:w-64">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-background dark:bg-input/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) setOpen(true);
              }}
              onClick={() => setOpen(true)}
            />
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Posts">
                {results.slice(0, 5).map((post) => (
                  <CommandItem
                    key={post.id}
                    value={post.title}
                    onSelect={() => {
                      runCommand(() => router.push(`/posts/${post.id}`));
                    }}
                  >
                    <div className="flex flex-col">
                      <span>{post.title}</span>
                      <span className="text-xs text-muted-foreground">{post.category}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
