export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          profile_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          message: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blocked_words: {
        Row: {
          category: string
          created_at: string | null
          id: string
          word: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          word: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          word?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_deleted: boolean | null
          message: string
          name: string
          reference_id: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_deleted?: boolean | null
          message: string
          name: string
          reference_id: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_deleted?: boolean | null
          message?: string
          name?: string
          reference_id?: string
          status?: string
        }
        Relationships: []
      }
      links: {
        Row: {
          button_color: string | null
          button_style: string | null
          clicks: number | null
          id: string
          image_url: string | null
          is_embed_disabled: boolean | null
          is_pinned: boolean | null
          is_shop_item: boolean | null
          open_in_new_tab: boolean | null
          product_price: string | null
          profile_id: string
          shortened_url: string | null
          sort_order: number
          title: string
          url: string
        }
        Insert: {
          button_color?: string | null
          button_style?: string | null
          clicks?: number | null
          id?: string
          image_url?: string | null
          is_embed_disabled?: boolean | null
          is_pinned?: boolean | null
          is_shop_item?: boolean | null
          open_in_new_tab?: boolean | null
          product_price?: string | null
          profile_id: string
          shortened_url?: string | null
          sort_order: number
          title: string
          url: string
        }
        Update: {
          button_color?: string | null
          button_style?: string | null
          clicks?: number | null
          id?: string
          image_url?: string | null
          is_embed_disabled?: boolean | null
          is_pinned?: boolean | null
          is_shop_item?: boolean | null
          open_in_new_tab?: boolean | null
          product_price?: string | null
          profile_id?: string
          shortened_url?: string | null
          sort_order?: number
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_customizations: {
        Row: {
          accent_color: string | null
          additional_gradient_colors: string[] | null
          audio_url: string | null
          avatar_animation: string | null
          background_color: string | null
          background_effect: string | null
          background_image_url: string | null
          button_gradient: Json | null
          card_style: string | null
          cursor_effect: string | null
          custom_css: string | null
          custom_cursor_url: string | null
          custom_font_url: string | null
          custom_js: string | null
          custom_sections: Json | null
          description: string | null
          discord_presence: string | null
          enable_animations: boolean | null
          featured_section_layout: Json | null
          font_family: string | null
          footer_layout: Json | null
          glow_elements: string[] | null
          glow_settings: Json | null
          grid_layout: Json | null
          header_layout: Json | null
          icon_color: string | null
          id: string
          layout_mode: string | null
          load_animation: string | null
          location: string | null
          primary_gradient_color: string | null
          profile_blur: number | null
          profile_id: string
          profile_opacity: number | null
          secondary_gradient_color: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          show_view_count: boolean | null
          show_volume_control: boolean | null
          social_preview_image: string | null
          text_animation: string | null
          text_color: string | null
          theme_preset: string | null
          username_animation_effect: string | null
          username_color_effect: string | null
          username_effect: string | null
        }
        Insert: {
          accent_color?: string | null
          additional_gradient_colors?: string[] | null
          audio_url?: string | null
          avatar_animation?: string | null
          background_color?: string | null
          background_effect?: string | null
          background_image_url?: string | null
          button_gradient?: Json | null
          card_style?: string | null
          cursor_effect?: string | null
          custom_css?: string | null
          custom_cursor_url?: string | null
          custom_font_url?: string | null
          custom_js?: string | null
          custom_sections?: Json | null
          description?: string | null
          discord_presence?: string | null
          enable_animations?: boolean | null
          featured_section_layout?: Json | null
          font_family?: string | null
          footer_layout?: Json | null
          glow_elements?: string[] | null
          glow_settings?: Json | null
          grid_layout?: Json | null
          header_layout?: Json | null
          icon_color?: string | null
          id?: string
          layout_mode?: string | null
          load_animation?: string | null
          location?: string | null
          primary_gradient_color?: string | null
          profile_blur?: number | null
          profile_id: string
          profile_opacity?: number | null
          secondary_gradient_color?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_view_count?: boolean | null
          show_volume_control?: boolean | null
          social_preview_image?: string | null
          text_animation?: string | null
          text_color?: string | null
          theme_preset?: string | null
          username_animation_effect?: string | null
          username_color_effect?: string | null
          username_effect?: string | null
        }
        Update: {
          accent_color?: string | null
          additional_gradient_colors?: string[] | null
          audio_url?: string | null
          avatar_animation?: string | null
          background_color?: string | null
          background_effect?: string | null
          background_image_url?: string | null
          button_gradient?: Json | null
          card_style?: string | null
          cursor_effect?: string | null
          custom_css?: string | null
          custom_cursor_url?: string | null
          custom_font_url?: string | null
          custom_js?: string | null
          custom_sections?: Json | null
          description?: string | null
          discord_presence?: string | null
          enable_animations?: boolean | null
          featured_section_layout?: Json | null
          font_family?: string | null
          footer_layout?: Json | null
          glow_elements?: string[] | null
          glow_settings?: Json | null
          grid_layout?: Json | null
          header_layout?: Json | null
          icon_color?: string | null
          id?: string
          layout_mode?: string | null
          load_animation?: string | null
          location?: string | null
          primary_gradient_color?: string | null
          profile_blur?: number | null
          profile_id?: string
          profile_opacity?: number | null
          secondary_gradient_color?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_view_count?: boolean | null
          show_volume_control?: boolean | null
          social_preview_image?: string | null
          text_animation?: string | null
          text_color?: string | null
          theme_preset?: string | null
          username_animation_effect?: string | null
          username_color_effect?: string | null
          username_effect?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_customizations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_views: {
        Row: {
          created_at: string | null
          date: string
          id: string
          profile_id: string
          updated_at: string | null
          views: number
        }
        Insert: {
          created_at?: string | null
          date?: string
          id?: string
          profile_id: string
          updated_at?: string | null
          views?: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          profile_id?: string
          updated_at?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          uid: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          id: string
          uid?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          uid?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          username?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      theme_presets: {
        Row: {
          accent_color: string | null
          background_color: string | null
          button_style: string | null
          card_style: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          font_family: string | null
          id: string
          is_public: boolean | null
          name: string
          text_color: string | null
          thumbnail_url: string | null
        }
        Insert: {
          accent_color?: string | null
          background_color?: string | null
          button_style?: string | null
          card_style?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          font_family?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          text_color?: string | null
          thumbnail_url?: string | null
        }
        Update: {
          accent_color?: string | null
          background_color?: string | null
          button_style?: string | null
          card_style?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          font_family?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          text_color?: string | null
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theme_presets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: { user_id_param: string; role_param: string }
        Returns: undefined
      }
      check_username_available: {
        Args: { new_username: string; user_id?: string } | { username: string }
        Returns: boolean
      }
      create_settings_table_if_not_exists: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_active_announcement: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          message: string
          updated_at: string | null
        }[]
      }
      get_all_user_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          role: string
        }[]
      }
      get_maintenance_mode_status: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_storage_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_size_bytes: number
          storage_limit_bytes: number
        }[]
      }
      get_user_roles: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"][]
      }
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      increment_link_clicks: {
        Args: { link_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_verified: {
        Args: { user_id: string }
        Returns: boolean
      }
      record_profile_view: {
        Args: { view_profile_id: string }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "verified"
      user_type: "regular" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "verified"],
      user_type: ["regular", "admin"],
    },
  },
} as const
