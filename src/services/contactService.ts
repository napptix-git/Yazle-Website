
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert'];

export const submitContactForm = async (data: ContactSubmission) => {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);

  if (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to submit contact form');
  }
};
