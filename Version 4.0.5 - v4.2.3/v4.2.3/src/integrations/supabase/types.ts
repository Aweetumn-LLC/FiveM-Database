export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
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
      admin_chat_messages: {
        Row: {
          content: string | null
          created_at: string
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_deleted: boolean
          maintainer_id: string
          maintainer_username: string
          message_type: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_deleted?: boolean
          maintainer_id: string
          maintainer_username: string
          message_type?: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_deleted?: boolean
          maintainer_id?: string
          maintainer_username?: string
          message_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_permissions: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          permission_key: string
          permission_value: boolean
          updated_at: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          permission_key: string
          permission_value?: boolean
          updated_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          permission_key?: string
          permission_value?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_active: boolean
          password_hash: string
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          password_hash: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          password_hash?: string
          updated_at?: string
          username?: string | null
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
      blacklist_reviews: {
        Row: {
          approvals_count: number | null
          approved_by: Json | null
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
          approvals_count?: number | null
          approved_by?: Json | null
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
          approvals_count?: number | null
          approved_by?: Json | null
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
      blacklist_statistics: {
        Row: {
          blacklist_type: string
          created_at: string
          id: string
          last_search_date: string | null
          searches_this_month: number
          searches_this_week: number
          searches_today: number
          total_entries: number
          total_searches: number
          updated_at: string
        }
        Insert: {
          blacklist_type: string
          created_at?: string
          id?: string
          last_search_date?: string | null
          searches_this_month?: number
          searches_this_week?: number
          searches_today?: number
          total_entries?: number
          total_searches?: number
          updated_at?: string
        }
        Update: {
          blacklist_type?: string
          created_at?: string
          id?: string
          last_search_date?: string | null
          searches_this_month?: number
          searches_this_week?: number
          searches_today?: number
          total_entries?: number
          total_searches?: number
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
      compliance_statistics: {
        Row: {
          checks_this_month: number
          checks_this_week: number
          checks_today: number
          clean_results: number
          created_at: string
          id: string
          statistic_type: string
          total_checks: number
          total_violations: number
          updated_at: string
          violation_percentage: number | null
          violations_this_month: number
          violations_this_week: number
          violations_today: number
        }
        Insert: {
          checks_this_month?: number
          checks_this_week?: number
          checks_today?: number
          clean_results?: number
          created_at?: string
          id?: string
          statistic_type: string
          total_checks?: number
          total_violations?: number
          updated_at?: string
          violation_percentage?: number | null
          violations_this_month?: number
          violations_this_week?: number
          violations_today?: number
        }
        Update: {
          checks_this_month?: number
          checks_this_week?: number
          checks_today?: number
          clean_results?: number
          created_at?: string
          id?: string
          statistic_type?: string
          total_checks?: number
          total_violations?: number
          updated_at?: string
          violation_percentage?: number | null
          violations_this_month?: number
          violations_this_week?: number
          violations_today?: number
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
      contributors: {
        Row: {
          avatar_hash: string | null
          avatar_url: string | null
          blacklist_count: string
          created_at: string
          discord_id: string
          fetched_at: string | null
          global_name: string | null
          id: string
          manual_info: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_hash?: string | null
          avatar_url?: string | null
          blacklist_count: string
          created_at?: string
          discord_id: string
          fetched_at?: string | null
          global_name?: string | null
          id?: string
          manual_info?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_hash?: string | null
          avatar_url?: string | null
          blacklist_count?: string
          created_at?: string
          discord_id?: string
          fetched_at?: string | null
          global_name?: string | null
          id?: string
          manual_info?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      creator_releases: {
        Row: {
          created_at: string
          creator_name: string
          id: string
          is_approved: boolean
          is_featured: boolean
          preview_images: string[] | null
          price: string
          resource_link: string
          resource_name: string
          store_link: string
          store_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_name: string
          id?: string
          is_approved?: boolean
          is_featured?: boolean
          preview_images?: string[] | null
          price: string
          resource_link: string
          resource_name: string
          store_link: string
          store_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_name?: string
          id?: string
          is_approved?: boolean
          is_featured?: boolean
          preview_images?: string[] | null
          price?: string
          resource_link?: string
          resource_name?: string
          store_link?: string
          store_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      discord_blacklist: {
        Row: {
          created_at: string
          discord_invite_links: string[] | null
          discord_server_name: string
          evidence_links: string[] | null
          id: string
          owner_discord_id: string
          proof_images: string[] | null
          reason: string
          resource_prefix: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          discord_invite_links?: string[] | null
          discord_server_name: string
          evidence_links?: string[] | null
          id?: string
          owner_discord_id: string
          proof_images?: string[] | null
          reason: string
          resource_prefix?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          discord_invite_links?: string[] | null
          discord_server_name?: string
          evidence_links?: string[] | null
          id?: string
          owner_discord_id?: string
          proof_images?: string[] | null
          reason?: string
          resource_prefix?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      false_positive_reports: {
        Row: {
          connection_code: string | null
          created_at: string
          id: string
          last_reported_at: string
          report_count: number
          report_type: string
          resource_name: string
          server_name: string | null
        }
        Insert: {
          connection_code?: string | null
          created_at?: string
          id?: string
          last_reported_at?: string
          report_count?: number
          report_type: string
          resource_name: string
          server_name?: string | null
        }
        Update: {
          connection_code?: string | null
          created_at?: string
          id?: string
          last_reported_at?: string
          report_count?: number
          report_type?: string
          resource_name?: string
          server_name?: string | null
        }
        Relationships: []
      }
      featured_creators: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      fivem_database_statistics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          statistic_key: string
          statistic_value: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          statistic_key: string
          statistic_value?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          statistic_key?: string
          statistic_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      game_images: {
        Row: {
          created_at: string
          description: string
          id: string
          is_compliant: boolean
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_compliant: boolean
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_compliant?: boolean
          updated_at?: string
          url?: string
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
      maintainer_activity_logs: {
        Row: {
          action_description: string
          action_type: string
          created_at: string
          id: string
          ip_address: string | null
          maintainer_id: string
          maintainer_username: string
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          target_id: string | null
          target_table: string | null
          user_agent: string | null
        }
        Insert: {
          action_description: string
          action_type: string
          created_at?: string
          id?: string
          ip_address?: string | null
          maintainer_id: string
          maintainer_username: string
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Update: {
          action_description?: string
          action_type?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          maintainer_id?: string
          maintainer_username?: string
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      maintainer_permissions: {
        Row: {
          created_at: string
          id: string
          maintainer_id: string
          permission_key: string
          permission_value: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          maintainer_id: string
          permission_key: string
          permission_value?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          maintainer_id?: string
          permission_key?: string
          permission_value?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintainer_permissions_maintainer_id_fkey"
            columns: ["maintainer_id"]
            isOneToOne: false
            referencedRelation: "maintainer_users"
            referencedColumns: ["id"]
          },
        ]
      }
      maintainer_users: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          is_active: boolean
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          password_hash?: string
          updated_at?: string
          username?: string
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
      seal_of_approval: {
        Row: {
          approver_name: string
          created_at: string
          creator_name: string
          id: string
          updated_at: string
        }
        Insert: {
          approver_name: string
          created_at?: string
          creator_name: string
          id?: string
          updated_at?: string
        }
        Update: {
          approver_name?: string
          created_at?: string
          creator_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      search_logs: {
        Row: {
          country: string | null
          created_at: string
          id: string
          ip_address: string | null
          result_found: boolean
          search_query: string
          search_type: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          result_found?: boolean
          search_query: string
          search_type: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          result_found?: boolean
          search_query?: string
          search_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      server_blacklist: {
        Row: {
          created_at: string
          evidence_links: string[] | null
          id: string
          owner_fivem_id: string
          proof_images: string[] | null
          reason: string
          server_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evidence_links?: string[] | null
          id?: string
          owner_fivem_id: string
          proof_images?: string[] | null
          reason: string
          server_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evidence_links?: string[] | null
          id?: string
          owner_fivem_id?: string
          proof_images?: string[] | null
          reason?: string
          server_name?: string
          updated_at?: string
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
      store_blacklist: {
        Row: {
          created_at: string
          evidence_links: string[] | null
          id: string
          proof_images: string[] | null
          reason: string
          resource_prefix: string | null
          store_links: string[] | null
          store_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evidence_links?: string[] | null
          id?: string
          proof_images?: string[] | null
          reason: string
          resource_prefix?: string | null
          store_links?: string[] | null
          store_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evidence_links?: string[] | null
          id?: string
          proof_images?: string[] | null
          reason?: string
          resource_prefix?: string | null
          store_links?: string[] | null
          store_name?: string
          updated_at?: string
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
      tool_usage_statistics: {
        Row: {
          created_at: string
          id: string
          last_used_at: string | null
          tool_name: string
          updated_at: string
          usage_count: number
          usage_this_month: number
          usage_this_week: number
          usage_today: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_used_at?: string | null
          tool_name: string
          updated_at?: string
          usage_count?: number
          usage_this_month?: number
          usage_this_week?: number
          usage_today?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_used_at?: string | null
          tool_name?: string
          updated_at?: string
          usage_count?: number
          usage_this_month?: number
          usage_this_week?: number
          usage_today?: number
        }
        Relationships: []
      }
      user_blacklist: {
        Row: {
          created_at: string
          discord_id: string | null
          evidence_links: string[] | null
          fivem_id: string | null
          id: string
          proof_images: string[] | null
          reason: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          discord_id?: string | null
          evidence_links?: string[] | null
          fivem_id?: string | null
          id?: string
          proof_images?: string[] | null
          reason: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          discord_id?: string | null
          evidence_links?: string[] | null
          fivem_id?: string | null
          id?: string
          proof_images?: string[] | null
          reason?: string
          updated_at?: string
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
      approve_blacklist_entry: {
        Args: { approver_username: string; entry_id: string }
        Returns: Json
      }
      cleanup_old_resource_searches: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_resource_stats: {
        Args: { increment_amount?: number; is_blacklisted: boolean }
        Returns: undefined
      }
      increment_server_stats: {
        Args: {
          coc_violations?: number
          is_new_server?: boolean
          player_count?: number
          tos_violations?: number
        }
        Returns: undefined
      }
      upsert_false_positive_report: {
        Args: {
          p_connection_code?: string
          p_report_type: string
          p_resource_name: string
          p_server_name?: string
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
