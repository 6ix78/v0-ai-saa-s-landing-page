export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: number
          created_at: string
          content: string
          author: string
          post_slug: string
        }
        Insert: {
          id?: number
          created_at?: string
          content: string
          author: string
          post_slug: string
        }
        Update: {
          id?: number
          created_at?: string
          content?: string
          author?: string
          post_slug?: string
        }
      }
      user_balances: {
        Row: {
          id: number
          user_id: string
          balance: string
          created_at: string
          updated_at: string
          last_mining_update: string | null
        }
        Insert: {
          id?: number
          user_id: string
          balance?: string
          created_at?: string
          updated_at?: string
          last_mining_update?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          balance?: string
          created_at?: string
          updated_at?: string
          last_mining_update?: string | null
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
