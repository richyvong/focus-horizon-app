// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mysavwhsfnlqdicpffyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15c2F2d2hzZm5scWRpY3BmZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NzYxNzUsImV4cCI6MjA2MTA1MjE3NX0.O8Sj62Hr1WEwqxYhXinxg9NA2uEjXhfnLbndOUWspjk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);