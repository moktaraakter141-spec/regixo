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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      custom_form_fields: {
        Row: {
          created_at: string
          event_id: string
          field_name: string
          field_options: Json | null
          field_type: string
          id: string
          is_required: boolean | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          event_id: string
          field_name: string
          field_options?: Json | null
          field_type?: string
          id?: string
          is_required?: boolean | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          event_id?: string
          field_name?: string
          field_options?: Json | null
          field_type?: string
          id?: string
          is_required?: boolean | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_form_fields_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_templates: {
        Row: {
          allow_late_registration: boolean
          created_at: string
          created_by: string
          custom_fields: Json | null
          description: string | null
          guest_limit: number | null
          id: string
          instructions: string | null
          organizer_contact_email: string | null
          organizer_contact_phone: string | null
          price: number | null
          seat_limit: number | null
          show_registered_list: boolean
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          allow_late_registration?: boolean
          created_at?: string
          created_by: string
          custom_fields?: Json | null
          description?: string | null
          guest_limit?: number | null
          id?: string
          instructions?: string | null
          organizer_contact_email?: string | null
          organizer_contact_phone?: string | null
          price?: number | null
          seat_limit?: number | null
          show_registered_list?: boolean
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          allow_late_registration?: boolean
          created_at?: string
          created_by?: string
          custom_fields?: Json | null
          description?: string | null
          guest_limit?: number | null
          id?: string
          instructions?: string | null
          organizer_contact_email?: string | null
          organizer_contact_phone?: string | null
          price?: number | null
          seat_limit?: number | null
          show_registered_list?: boolean
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          allow_late_registration: boolean | null
          banner_url: string | null
          created_at: string
          description: string | null
          guest_limit: number | null
          id: string
          instructions: string | null
          organizer_contact_email: string | null
          organizer_contact_phone: string | null
          organizer_id: string
          payment_instruction: string | null
          payment_methods: string[] | null
          payment_number: string | null
          price: number | null
          registration_deadline: string | null
          seat_limit: number | null
          show_email_field: boolean | null
          show_phone_field: boolean | null
          show_registered_list: boolean | null
          slug: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          allow_late_registration?: boolean | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          guest_limit?: number | null
          id?: string
          instructions?: string | null
          organizer_contact_email?: string | null
          organizer_contact_phone?: string | null
          organizer_id: string
          payment_instruction?: string | null
          payment_methods?: string[] | null
          payment_number?: string | null
          price?: number | null
          registration_deadline?: string | null
          seat_limit?: number | null
          show_email_field?: boolean | null
          show_phone_field?: boolean | null
          show_registered_list?: boolean | null
          slug?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          allow_late_registration?: boolean | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          guest_limit?: number | null
          id?: string
          instructions?: string | null
          organizer_contact_email?: string | null
          organizer_contact_phone?: string | null
          organizer_id?: string
          payment_instruction?: string | null
          payment_methods?: string[] | null
          payment_number?: string | null
          price?: number | null
          registration_deadline?: string | null
          seat_limit?: number | null
          show_email_field?: boolean | null
          show_phone_field?: boolean | null
          show_registered_list?: boolean | null
          slug?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          full_name: string | null
          id: string
          max_seat_limit: number
          status: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          max_seat_limit?: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          max_seat_limit?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          custom_fields: Json | null
          email: string | null
          event_id: string
          guest_count: number | null
          id: string
          ip_address: string | null
          name: string
          phone: string | null
          registration_number: string | null
          rejection_reason: string | null
          status: string
          tag: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          event_id: string
          guest_count?: number | null
          id?: string
          ip_address?: string | null
          name: string
          phone?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          status?: string
          tag?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          event_id?: string
          guest_count?: number | null
          id?: string
          ip_address?: string | null
          name?: string
          phone?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          status?: string
          tag?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "organizer"
      event_status: "draft" | "published" | "closed"
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
      app_role: ["admin", "organizer"],
      event_status: ["draft", "published", "closed"],
    },
  },
} as const
