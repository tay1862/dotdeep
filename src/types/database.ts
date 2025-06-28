export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone?: string
          avatar_url?: string
          role: 'admin' | 'client' | 'visitor'
          status: 'active' | 'inactive' | 'suspended'
          language_preference: 'en' | 'lo'
          created_at: string
          updated_at: string
          last_login?: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string
          avatar_url?: string
          role?: 'admin' | 'client' | 'visitor'
          status?: 'active' | 'inactive' | 'suspended'
          language_preference?: 'en' | 'lo'
          created_at?: string
          updated_at?: string
          last_login?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string
          avatar_url?: string
          role?: 'admin' | 'client' | 'visitor'
          status?: 'active' | 'inactive' | 'suspended'
          language_preference?: 'en' | 'lo'
          created_at?: string
          updated_at?: string
          last_login?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          title: string
          description?: string
          package_type: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          status: 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled'
          price: number
          currency: 'LAK' | 'USD' | 'THB'
          deadline?: string
          started_at?: string
          completed_at?: string
          files?: Json
          notes?: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          progress_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description?: string
          package_type: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          status?: 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled'
          price: number
          currency?: 'LAK' | 'USD' | 'THB'
          deadline?: string
          started_at?: string
          completed_at?: string
          files?: Json
          notes?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          package_type?: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          status?: 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled'
          price?: number
          currency?: 'LAK' | 'USD' | 'THB'
          deadline?: string
          started_at?: string
          completed_at?: string
          files?: Json
          notes?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      portfolio: {
        Row: {
          id: string
          title: string
          description?: string
          category: 'logo' | 'branding' | 'graphic' | 'artboard' | 'web' | 'print'
          images: Json
          client_name?: string
          project_year: number
          featured: boolean
          tags?: string[]
          before_image?: string
          after_image?: string
          case_study?: string
          testimonial?: string
          sort_order: number
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          category: 'logo' | 'branding' | 'graphic' | 'artboard' | 'web' | 'print'
          images: Json
          client_name?: string
          project_year: number
          featured?: boolean
          tags?: string[]
          before_image?: string
          after_image?: string
          case_study?: string
          testimonial?: string
          sort_order?: number
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'logo' | 'branding' | 'graphic' | 'artboard' | 'web' | 'print'
          images?: Json
          client_name?: string
          project_year?: number
          featured?: boolean
          tags?: string[]
          before_image?: string
          after_image?: string
          case_study?: string
          testimonial?: string
          sort_order?: number
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          name: string
          code: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          price: number
          currency: 'LAK' | 'USD' | 'THB'
          description: string
          features: Json
          delivery_time: number
          revisions: number
          is_active: boolean
          is_popular: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          price: number
          currency?: 'LAK' | 'USD' | 'THB'
          description: string
          features: Json
          delivery_time: number
          revisions: number
          is_active?: boolean
          is_popular?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
          price?: number
          currency?: 'LAK' | 'USD' | 'THB'
          description?: string
          features?: Json
          delivery_time?: number
          revisions?: number
          is_active?: boolean
          is_popular?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type: 'text' | 'file' | 'image' | 'system'
          file_url?: string
          file_name?: string
          file_size?: number
          read_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          file_url?: string
          file_name?: string
          file_size?: number
          read_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          message_type?: 'text' | 'file' | 'image' | 'system'
          file_url?: string
          file_name?: string
          file_size?: number
          read_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          project_id: string
          client_id: string
          invoice_number: string
          amount: number
          currency: 'LAK' | 'USD' | 'THB'
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at?: string
          payment_method?: string
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          client_id: string
          invoice_number: string
          amount: number
          currency?: 'LAK' | 'USD' | 'THB'
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at?: string
          payment_method?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          client_id?: string
          invoice_number?: string
          amount?: number
          currency?: 'LAK' | 'USD' | 'THB'
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          paid_at?: string
          payment_method?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          project_id?: string
          participants: string[]
          title?: string
          last_message?: string
          last_message_at?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string
          participants: string[]
          title?: string
          last_message?: string
          last_message_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          participants?: string[]
          title?: string
          last_message?: string
          last_message_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'client' | 'visitor'
      user_status: 'active' | 'inactive' | 'suspended'
      project_status: 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled'
      package_code: 'DOT1' | 'DOT2' | 'DOT3' | 'CUSTOM'
      currency: 'LAK' | 'USD' | 'THB'
      portfolio_category: 'logo' | 'branding' | 'graphic' | 'artboard' | 'web' | 'print'
      message_type: 'text' | 'file' | 'image' | 'system'
      invoice_status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
    }
  }
} 