import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://itguqtsgjliinrycnljm.supabase.co';
const SUPABASE_ANON_KEY =
  'sb_publishable__RYR3P-qfBC4GySYyPHm3Q_-5PssRBp';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const MINDTASK_STATE_TABLE = 'mindtask_user_state';
