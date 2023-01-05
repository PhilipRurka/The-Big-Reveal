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
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      todo: {
        Row: {
          content: string | null
          user_id: string | null
          is_complete: boolean | null
          created_at: string | null
          updated_at: string | null
          id: number
        }
        Insert: {
          content?: string | null
          user_id?: string | null
          is_complete?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          id?: number
        }
        Update: {
          content?: string | null
          user_id?: string | null
          is_complete?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
