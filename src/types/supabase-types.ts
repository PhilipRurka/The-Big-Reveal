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
          allow_published_at: string
          base_content: string
          base_id: string
          created_at: string
          enable_reveal: boolean
          enable_reveal_date: string
          is_published: boolean
          post_title: string
          tags: string
          updated_at: string
          user_id: string
          written_at: string
        }
        Insert: {
          allow_published_at?: string
          base_content: string
          base_id?: string
          created_at?: string
          enable_reveal?: boolean
          enable_reveal_date?: string
          is_published?: boolean
          post_title?: string
          tags?: string
          updated_at?: string
          user_id?: string
          written_at?: string
        }
        Update: {
          allow_published_at?: string
          base_content?: string
          base_id?: string
          created_at?: string
          enable_reveal?: boolean
          enable_reveal_date?: string
          is_published?: boolean
          post_title?: string
          tags?: string
          updated_at?: string
          user_id?: string
          written_at?: string
        }
      }
      post_description: {
        Row: {
          description_content: string
          description_id: string
          post_id: string
          user_id: string
        }
        Insert: {
          description_content?: string
          description_id?: string
          post_id: string
          user_id?: string
        }
        Update: {
          description_content?: string
          description_id?: string
          post_id?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          path: string | null
          profile_id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          path?: string | null
          profile_id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          path?: string | null
          profile_id?: string
          updated_at?: string | null
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
        Returns: string
      }
      select_authors_posts: {
        Args: {
          profile_path: string
        }
        Returns: Database["public"]["CompositeTypes"]["select_authors_posts_type"][]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      select_authors_posts_type: {
        base_id: string
        created_at: string
        post_title: string
        username: string
      }
    }
  }
}
