-- Enable Supabase Realtime on the mindtask_user_state table.
-- Run once in Supabase SQL Editor. This lets the client receive
-- postgres_changes events for cross-device live sync.

alter publication supabase_realtime add table public.mindtask_user_state;
