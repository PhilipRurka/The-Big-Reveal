export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
        Relationships: [
          {
            foreignKeyName: "post_base_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "post_description_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "post_base"
            referencedColumns: ["base_id"]
          },
          {
            foreignKeyName: "post_description_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "profiles_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_base_and_description: {
        Args: {
          post_id_val: string
        }
        Returns: undefined[]
      }
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
      update_base_and_description: {
        Args: {
          post_id_val: string
          post_title_val: string
          base_content_val: string
          description_content_val: string
        }
        Returns: Database["public"]["CompositeTypes"]["update_post_return_type"][]
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
      update_post_return_type: {
        base_content: string
        description_content: string
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

