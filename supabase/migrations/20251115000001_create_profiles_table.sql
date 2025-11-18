-- Migration: Create base profiles table
-- Description: Create the profiles table that will be extended by later migrations
-- Date: 2025-11-15
-- NOTE: This migration must run BEFORE 20251116000001_create_profiles_extension.sql

-- Create the base profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a function to handle new user signup
-- This automatically creates a profile row when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
-- This fires after a new user is inserted into auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users who don't have profiles
-- This ensures any users who signed up before this migration have a profile
INSERT INTO profiles (id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- Add comment for documentation
COMMENT ON TABLE profiles IS 'User profiles with paper trading balance and subscription info';
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a profile row when a new user signs up';
