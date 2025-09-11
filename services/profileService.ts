import { supabase } from './supabase';

export interface ProfileData {
  full_name: string;
  phone: string;
  bio: string;
  avatar_url?: string;
}

export const profileService = {
  // Get user profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as ProfileData;
  },

  // Update user profile
  async updateProfile(userId: string, profile: Partial<ProfileData>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as ProfileData;
  },

  // Update user metadata (for display name)
  async updateUserMetadata(userId: string, metadata: any) {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata
    });

    if (error) throw error;
    return data;
  }
};
