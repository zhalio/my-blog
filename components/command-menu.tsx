'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostData } from '@/lib/posts';
import Fuse from 'fuse.js';
import { useLocale } from 'next-intl';

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [posts, setPosts] = React.useState<PostData[]>([]);
  const locale = useLocale();

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
    if (open) {
      fetch(`/api/search`)
        .then((res) => res.json())
        .then((data: (PostData & { locale: string })[]) => {
          // Filter posts by current locale
          const filteredPosts = data.filter(post => post.locale === locale);
          setPosts(filteredPosts);
        });
    }
  }, [open, locale]);

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
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search posts...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandPrimitive.Input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type a command or search..."
                value={query}
                onValueChange={setQuery}
              />
            </div>
            <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
              <CommandPrimitive.Empty className="py-6 text-center text-sm">
                No results found.
              </CommandPrimitive.Empty>
              {results.map((post) => (
                <CommandPrimitive.Item
                  key={post.id}
                  value={post.title}
                  onSelect={() => {
                    runCommand(() => router.push(`/posts/${post.id}`));
                  }}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <div className="flex flex-col">
                    <span>{post.title}</span>
                    <span className="text-xs text-muted-foreground">{post.category}</span>
                  </div>
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </DialogContent>
      </Dialog>
    </>
  );
}
