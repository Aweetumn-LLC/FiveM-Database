export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_alerts: {
        Row: {
          alert_type: string
          created_at: string
          description: string
          id: string
          is_read: boolean
          resolved_at: string | null
          severity: string
          title: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          description: string
          id?: string
          is_read?: boolean
          resolved_at?: string | null
          severity: string
          title: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          description?: string
          id?: string
          is_read?: boolean
          resolved_at?: string | null
          severity?: string
          title?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_countries: {
        Row: {
          country: string
          created_at: string
          id: string
          updated_at: string
          visits: number | null
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          updated_at?: string
          visits?: number | null
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          updated_at?: string
          visits?: number | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          country: string | null
          created_at: string
          event_type: string
          id: string
          page_path: string
          referrer: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          event_type: string
          id?: string
          page_path: string
          referrer?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          event_type?: string
          id?: string
          page_path?: string
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      analytics_pages: {
        Row: {
          avg_time_on_page: number | null
          created_at: string
          id: string
          path: string
          title: string | null
          unique_views: number | null
          updated_at: string
          views: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          created_at?: string
          id?: string
          path: string
          title?: string | null
          unique_views?: number | null
          updated_at?: string
          views?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          created_at?: string
          id?: string
          path?: string
          title?: string | null
          unique_views?: number | null
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      analytics_stats: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          id: string
          page_views: number | null
          period: Database["public"]["Enums"]["period_type"]
          period_start: string
          unique_visitors: number | null
          visits: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          id?: string
          page_views?: number | null
          period: Database["public"]["Enums"]["period_type"]
          period_start: string
          unique_visitors?: number | null
          visits?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          id?: string
          page_views?: number | null
          period?: Database["public"]["Enums"]["period_type"]
          period_start?: string
          unique_visitors?: number | null
          visits?: number | null
        }
        Relationships: []
      }
      blacklist_entries: {
        Row: {
          blacklisted_since: string | null
          category: string
          created_at: string
          discord_server_id: string | null
          flagged_by: string
          id: string
          keyword: string
          links: string[] | null
          name: string
          reason: string
          severity: string
          updated_at: string
        }
        Insert: {
          blacklisted_since?: string | null
          category: string
          created_at?: string
          discord_server_id?: string | null
          flagged_by: string
          id?: string
          keyword: string
          links?: string[] | null
          name: string
          reason: string
          severity: string
          updated_at?: string
        }
        Update: {
          blacklisted_since?: string | null
          category?: string
          created_at?: string
          discord_server_id?: string | null
          flagged_by?: string
          id?: string
          keyword?: string
          links?: string[] | null
          name?: string
          reason?: string
          severity?: string
          updated_at?: string
        }
        Relationships: []
      }
      coc_bypass_keywords: {
        Row: {
          created_at: string
          id: string
          keyword: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          updated_at?: string
        }
        Relationships: []
      }
      coc_contextual_patterns: {
        Row: {
          created_at: string
          id: string
          pattern: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          pattern: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          pattern?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      coc_violation_keywords: {
        Row: {
          created_at: string
          id: string
          keyword: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      ip_bypass_keywords: {
        Row: {
          created_at: string
          id: string
          keyword: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          updated_at?: string
        }
        Relationships: []
      }
      ip_violation_keywords: {
        Row: {
          created_at: string
          id: string
          keyword: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          keyword: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          keyword?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          cv_url: string | null
          email: string
          full_name: string
          id: string
          job_id: number
          phone: string | null
          status: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          cv_url?: string | null
          email: string
          full_name: string
          id?: string
          job_id: number
          phone?: string | null
          status?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string
          full_name?: string
          id?: string
          job_id?: number
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          featured: boolean
          id: string
          logo_url: string | null
          metadata: Json | null
          name: string
          partner_type: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured?: boolean
          id?: string
          logo_url?: string | null
          metadata?: Json | null
          name: string
          partner_type: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured?: boolean
          id?: string
          logo_url?: string | null
          metadata?: Json | null
          name?: string
          partner_type?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      resource_checker_stats: {
        Row: {
          blacklisted_searches: number
          clean_searches: number
          created_at: string
          id: string
          total_searches: number
          updated_at: string
        }
        Insert: {
          blacklisted_searches?: number
          clean_searches?: number
          created_at?: string
          id?: string
          total_searches?: number
          updated_at?: string
        }
        Update: {
          blacklisted_searches?: number
          clean_searches?: number
          created_at?: string
          id?: string
          total_searches?: number
          updated_at?: string
        }
        Relationships: []
      }
      resource_searches: {
        Row: {
          country: string | null
          created_at: string
          id: string
          ip_address: string | null
          is_blacklisted: boolean
          search_query: string
          search_type: string
          user_agent: string | null
          violation_keywords: string[] | null
          violation_type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_blacklisted?: boolean
          search_query: string
          search_type: string
          user_agent?: string | null
          violation_keywords?: string[] | null
          violation_type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_blacklisted?: boolean
          search_query?: string
          search_type?: string
          user_agent?: string | null
          violation_keywords?: string[] | null
          violation_type?: string | null
        }
        Relationships: []
      }
      server_checker_stats: {
        Row: {
          created_at: string
          id: string
          total_checks: number
          total_players_seen: number
          total_violations_coc: number
          total_violations_tos: number
          unique_servers_checked: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          total_checks?: number
          total_players_seen?: number
          total_violations_coc?: number
          total_violations_tos?: number
          unique_servers_checked?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          total_checks?: number
          total_players_seen?: number
          total_violations_coc?: number
          total_violations_tos?: number
          unique_servers_checked?: number
          updated_at?: string
        }
        Relationships: []
      }
      server_checks: {
        Row: {
          checked_at: string
          connection_code: string
          error_message: string | null
          id: string
          server_data: Json | null
          status: string | null
        }
        Insert: {
          checked_at?: string
          connection_code: string
          error_message?: string | null
          id?: string
          server_data?: Json | null
          status?: string | null
        }
        Update: {
          checked_at?: string
          connection_code?: string
          error_message?: string | null
          id?: string
          server_data?: Json | null
          status?: string | null
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          category: string
          created_at: string
          id: string
          log_level: string
          message: string
          metadata: Json | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          log_level: string
          message: string
          metadata?: Json | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          log_level?: string
          message?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          ip_address: string | null
          last_activity: string
          pages_visited: number | null
          session_duration: unknown | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          last_activity?: string
          pages_visited?: number | null
          session_duration?: unknown | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          last_activity?: string
          pages_visited?: number | null
          session_duration?: unknown | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_resource_searches: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_resource_stats: {
        Args: { is_blacklisted: boolean; increment_amount?: number }
        Returns: undefined
      }
      increment_server_stats: {
        Args: {
          tos_violations?: number
          coc_violations?: number
          player_count?: number
          is_new_server?: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      period_type: "hour" | "day" | "week" | "month" | "year"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      period_type: ["hour", "day", "week", "month", "year"],
    },
  },
} as const
