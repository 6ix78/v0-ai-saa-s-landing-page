CREATE TABLE IF NOT EXISTS user_balances (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC(18, 8) NOT NULL DEFAULT 0.0,
  currency TEXT NOT NULL DEFAULT 'ETH',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_balances ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own balance
CREATE POLICY "Users can view their own balance" ON user_balances
FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to update their own balance (e.g., after a withdrawal or mining)
CREATE POLICY "Users can update their own balance" ON user_balances
FOR UPDATE USING (auth.uid() = user_id);

-- Policy for inserting new user balances (e.g., on user signup)
CREATE POLICY "Users can create their own balance entry" ON user_balances
FOR INSERT WITH CHECK (auth.uid() = user_id);
