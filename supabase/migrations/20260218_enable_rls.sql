-- Enable RLS for all tables to fix Security Advisor warnings
-- Tables: posts, pages, tags, media, friend_links, site_settings

-- 1. Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON posts;

DROP POLICY IF EXISTS "Public pages are viewable by everyone" ON pages;
DROP POLICY IF EXISTS "Authenticated users can manage pages" ON pages;

DROP POLICY IF EXISTS "Tags are viewable by everyone" ON tags;
DROP POLICY IF EXISTS "Authenticated users can manage tags" ON tags;

DROP POLICY IF EXISTS "Media is viewable by everyone" ON media;
DROP POLICY IF EXISTS "Authenticated users can manage media" ON media;

DROP POLICY IF EXISTS "Friend links are viewable by everyone" ON friend_links;
DROP POLICY IF EXISTS "Authenticated users can manage friend links" ON friend_links;

DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;

-- 3. Create policies

-- POSTS
-- Public read access for published posts
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (published = true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage posts" 
ON posts FOR ALL 
USING (auth.role() = 'authenticated');

-- PAGES
-- Public read access for published pages
CREATE POLICY "Public pages are viewable by everyone" 
ON pages FOR SELECT 
USING (published = true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage pages" 
ON pages FOR ALL 
USING (auth.role() = 'authenticated');

-- TAGS
-- Public read access
CREATE POLICY "Tags are viewable by everyone" 
ON tags FOR SELECT 
USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage tags" 
ON tags FOR ALL 
USING (auth.role() = 'authenticated');

-- MEDIA
-- Public read access
CREATE POLICY "Media is viewable by everyone" 
ON media FOR SELECT 
USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage media" 
ON media FOR ALL 
USING (auth.role() = 'authenticated');

-- FRIEND LINKS
-- Public read access
CREATE POLICY "Friend links are viewable by everyone" 
ON friend_links FOR SELECT 
USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage friend links" 
ON friend_links FOR ALL 
USING (auth.role() = 'authenticated');

-- SITE SETTINGS
-- Public read access
CREATE POLICY "Site settings are viewable by everyone" 
ON site_settings FOR SELECT 
USING (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated users can manage site settings" 
ON site_settings FOR ALL 
USING (auth.role() = 'authenticated');
