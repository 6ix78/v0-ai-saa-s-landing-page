CREATE TABLE user_balances (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- In a real app, link this to your auth.users table
  balance NUMERIC(20, 8) NOT NULL DEFAULT 0.0,
  currency TEXT NOT NULL DEFAULT 'ETH',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a dummy balance for a user (e.g., user_id '1' for demonstration)
-- In a real app, this would be managed by your user registration/onboarding process.
INSERT INTO user_balances (user_id, balance, currency)
VALUES ('00000000-0000-0000-0000-000000000001', 10.5, 'ETH')
ON CONFLICT (user_id) DO UPDATE SET balance = user_balances.balance;
