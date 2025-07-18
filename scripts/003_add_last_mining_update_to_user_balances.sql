ALTER TABLE user_balances
ADD COLUMN last_mining_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Optional: Update existing rows to set last_mining_update if they exist
UPDATE user_balances
SET last_mining_update = NOW()
WHERE last_mining_update IS NULL;
