import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = supabase.auth

// Database operations
export const db = {
  // Portfolio operations
  portfolios: {
    getAll: () => supabase.from('portfolios').select(`
      *,
      portfolio_categories(*)
    `),
    getById: (id) => supabase.from('portfolios').select(`
      *,
      portfolio_categories(*),
      portfolio_images(*)
    `).eq('id', id).single(),
    getByCategory: (categoryId) => supabase.from('portfolios').select(`
      *,
      portfolio_categories(*)
    `).eq('category_id', categoryId)
  },

  // Categories operations
  categories: {
    getAll: () => supabase.from('portfolio_categories').select('*'),
    create: (data) => supabase.from('portfolio_categories').insert(data),
    update: (id, data) => supabase.from('portfolio_categories').update(data).eq('id', id),
    delete: (id) => supabase.from('portfolio_categories').delete().eq('id', id)
  },

  // Services operations
  services: {
    getAll: () => supabase.from('services').select('*').eq('is_active', true),
    getById: (id) => supabase.from('services').select('*').eq('id', id).single(),
    create: (data) => supabase.from('services').insert(data),
    update: (id, data) => supabase.from('services').update(data).eq('id', id),
    delete: (id) => supabase.from('services').delete().eq('id', id)
  },

  // Orders operations
  orders: {
    create: (data) => supabase.from('orders').insert(data),
    getByUserId: (userId) => supabase.from('orders').select(`
      *,
      services(*)
    `).eq('user_id', userId),
    getAll: () => supabase.from('orders').select(`
      *,
      services(*),
      users(*)
    `),
    updateStatus: (id, status) => supabase.from('orders').update({ 
      status, 
      updated_at: new Date().toISOString() 
    }).eq('id', id)
  },

  // Users operations
  users: {
    getProfile: (userId) => supabase.from('users').select('*').eq('id', userId).single(),
    updateProfile: (userId, data) => supabase.from('users').update(data).eq('id', userId),
    createProfile: (data) => supabase.from('users').insert(data),
    getAll: () => supabase.from('users').select('*')
  },

  // System settings operations
  settings: {
    getAll: () => supabase.from('system_settings').select('*'),
    update: (key, value) => supabase.from('system_settings').upsert({ 
      setting_key: key, 
      setting_value: value 
    })
  }
}

// Storage operations
export const storage = {
  portfolioImages: {
    upload: (file, fileName) => supabase.storage
      .from('portfolio-images')
      .upload(fileName, file),
    getPublicUrl: (fileName) => supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName),
    delete: (fileName) => supabase.storage
      .from('portfolio-images')
      .remove([fileName])
  },
  
  sampleFiles: {
    upload: (file, fileName) => supabase.storage
      .from('sample-files')
      .upload(fileName, file),
    getSignedUrl: (fileName) => supabase.storage
      .from('sample-files')
      .createSignedUrl(fileName, 3600), // 1 hour expiry
    delete: (fileName) => supabase.storage
      .from('sample-files')
      .remove([fileName])
  }
}

