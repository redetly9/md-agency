import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xibybxkhcldnowzbuqvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpYnlieGtoY2xkbm93emJ1cXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTk3MDIsImV4cCI6MjA0ODI3NTcwMn0.yOeJlJWscEBRDc_kWBzP_mhIoma_Po95waKzKXmyktU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);