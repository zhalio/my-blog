
-- 1. Create site_settings table if not exists (for completeness)
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  site_title TEXT,
  site_description TEXT,
  site_keywords TEXT[] DEFAULT '{}',
  favicon_url TEXT,
  footer_text TEXT,
  social_links JSONB DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- 2. Add new JSONB columns for flexible configuration
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS author_info JSONB DEFAULT '{}';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS seo_config JSONB DEFAULT '{}';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS comments_config JSONB DEFAULT '{}';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS feature_flags JSONB DEFAULT '{}';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS analytics_config JSONB DEFAULT '{}';

-- 3. Insert default row if not exists
INSERT INTO site_settings (id, site_title)
VALUES (1, 'My Awesome Blog')
ON CONFLICT (id) DO NOTHING;

-- 4. Enable RLS (Optional, but good practice)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public settings are viewable by everyone"
  ON site_settings FOR SELECT
  USING (true);

-- Only authenticated users can update (handled by API check, but RLS adds safety)
CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');
