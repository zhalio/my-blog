export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

export type PostData = {
  id: string;
  title: string;
  date: string;
  summary: string;
  contentHtml?: string;
  content?: string; // Raw content for search
  toc?: TocItem[];
  readingTime?: string;
  tags?: string[];
  language?: string; // the language of the content as stored in Sanity (e.g. 'zh')
};
