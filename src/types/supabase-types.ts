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
      post_base: {
        Row: {
          allow_published_at: string | null
          created_at: string | null
          enable_reveal: boolean | null
          enable_reveal_date: string | null
          id: string
          is_published: boolean
          post_content: string
          post_title: string
          tags: string | null
          updated_at: string | null
          user_id: string | null
          written_at: string | null
        }
        Insert: {
          allow_published_at?: string | null
          created_at?: string | null
          enable_reveal?: boolean | null
          enable_reveal_date?: string | null
          id?: string
          is_published?: boolean
          post_content: string
          post_title?: string
          tags?: string | null
          updated_at?: string | null
          user_id?: string | null
          written_at?: string | null
        }
        Update: {
          allow_published_at?: string | null
          created_at?: string | null
          enable_reveal?: boolean | null
          enable_reveal_date?: string | null
          id?: string
          is_published?: boolean
          post_content?: string
          post_title?: string
          tags?: string | null
          updated_at?: string | null
          user_id?: string | null
          written_at?: string | null
        }
      }
      post_description: {
        Row: {
          id: string
          post_content: string | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          id?: string
          post_content?: string | null
          post_id: string
          user_id?: string | null
        }
        Update: {
          id?: string
          post_content?: string | null
          post_id?: string
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          full_name: string | null
          id: string
          path: string | null
          updated_at: string | null
          username: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          full_name?: string | null
          id: string
          path?: string | null
          updated_at?: string | null
          username?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          full_name?: string | null
          id?: string
          path?: string | null
          updated_at?: string | null
          username?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_base_and_description: {
        Args: {
          post_title: string
          tags: string
          enable_reveal_date: string
          enable_reveal: boolean
          allow_published_at: string
          written_at: string
          is_published: boolean
          base_content: string
          description_content: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
