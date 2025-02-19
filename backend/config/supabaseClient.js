import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdbpnsjmczxbozctcqsk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYnBuc2ptY3p4Ym96Y3RjcXNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwNTU4MiwiZXhwIjoyMDU0OTgxNTgyfQ.7lNKpYR-BnVoC4P55nIlLGGV1z84IGCxiuCvCou8WZo'

export const supabase = createClient(supabaseUrl, supabaseKey);