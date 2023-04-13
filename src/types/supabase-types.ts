export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "follow post": {
        Row: {
          id: number
          post_content: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          id?: number
          post_content?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          id?: number
          post_content?: string | null
          post_id?: string
          user_id?: string
        }
      }
      "private posts": {
        Row: {
          id: string
          post_content: string
          post_id: string
          user_id: string | null
        }
        Insert: {
          id: string
          post_content: string
          post_id: string
          user_id?: string | null
        }
        Update: {
          id?: string
          post_content?: string
          post_id?: string
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          website?: string | null
        }
      }
      "public posts": {
        Row: {
          created_at: string | null
          id: string
          post_content: string
          post_subtitle: string
          post_title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          post_content: string
          post_subtitle: string
          post_title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_content?: string
          post_subtitle?: string
          post_title?: string
          updated_at?: string | null
          user_id?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
