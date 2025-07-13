CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT, -- Optional, for Gravatar or internal use
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add an index for faster lookups by post_slug
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments (post_slug);
