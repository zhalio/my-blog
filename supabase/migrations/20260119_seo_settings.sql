-- Enable RLS (Row Level Security) if not already enabled, but for simplicity in this script we assume tables are public or handled by logic
-- 1. Create site_settings table (Singleton)
CREATE TABLE IF NOT EXISTS site_settings (
  id INT8 PRIMARY KEY DEFAULT 1, -- Always use ID 1
  site_title TEXT NOT NULL DEFAULT 'My Blog',
  site_description TEXT,
  site_keywords TEXT[], -- Array of strings
  favicon_url TEXT,
  footer_text TEXT,
  social_links JSONB DEFAULT '[]'::jsonb, -- Array of { platform: string, url: string, icon: string }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default row if not exists
INSERT INTO site_settings (id, site_title, footer_text)
VALUES (1, 'My Awesome Blog', '© 2026 All Rights Reserved')
ON CONFLICT (id) DO NOTHING;

-- 2. Create friend_links table
CREATE TABLE IF NOT EXISTS friend_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  avatar_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add SEO columns to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT;
