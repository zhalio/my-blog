'use client';

import * as React from 'react';
import { useRouter } from '@/i18n/routing';
import { Search } from 'lucide-react';
import { PostData } from '@/lib/posts';
import { create, insertMultiple, search, Orama } from '@orama/orama';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [oramaDb, setOramaDb] = React.useState<Orama<any> | null>(null);
  const [results, setResults] = React.useState<PostData[]>([]);
  const locale = useLocale();
  const t = useTranslations('Common');

  React.useEffect(() => {
    const initOrama = async () => {
      const db = await create({
        schema: {
          id: 'string',
          title: 'string',
          summary: 'string',
          category: 'string',
          date: 'string',
        },
      });

      const res = await fetch(`/api/search`);
      const data: (PostData & { locale: string })[] = await res.json();
      const filteredPosts = data.filter(post => post.locale === locale);

      await insertMultiple(db, filteredPosts as unknown as Record<string, unknown>[]);
      setOramaDb(db);
      setResults(filteredPosts);
    };

    initOrama();
  }, [locale]);

  React.useEffect(() => {
    const searchOrama = async () => {
      if (!oramaDb) return;
      if (!query) {
        // If no query, we might want to show all, but Orama search requires a term or we can search for empty string?
        // Actually, if no query, we can just show the initial list if we saved it, 
        // but for now let's just search for empty string which might return everything or nothing depending on config.
        // Better to just keep a separate 'allPosts' state if we want to show default, 
        // but the previous implementation showed 'posts' (all) when query was empty.
        // Let's try searching with empty string or just return.
        // Orama search with empty string returns all documents usually.
        const searchResult = await search(oramaDb, { term: query, limit: 5 });
        // Map hits back to items. 
        // The hits contain 'document'.
        setResults(searchResult.hits.map(hit => hit.document as unknown as PostData));
        return;
      }

      const searchResult = await search(oramaDb, { term: query, limit: 5 });
      setResults(searchResult.hits.map(hit => hit.document as unknown as PostData));
    };

    searchOrama();
  }, [query, oramaDb]);

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
