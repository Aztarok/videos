export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            Follows: {
                Row: {
                    created_at: string;
                    follower_id: string;
                    following_id: string;
                    id: number;
                };
                Insert: {
                    created_at?: string;
                    follower_id: string;
                    following_id: string;
                    id?: number;
                };
                Update: {
                    created_at?: string;
                    follower_id?: string;
                    following_id?: string;
                    id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_Follows_follower_id_fkey";
                        columns: ["follower_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_Follows_following_id_fkey";
                        columns: ["following_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            images: {
                Row: {
                    id: string;
                    name: string;
                    num: number;
                    object_id: string;
                    post_id: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    num: number;
                    object_id: string;
                    post_id: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    num?: number;
                    object_id?: string;
                    post_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_images_object_id_fkey";
                        columns: ["object_id"];
                        isOneToOne: false;
                        referencedRelation: "objects";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_images_post_id_fkey";
                        columns: ["post_id"];
                        isOneToOne: false;
                        referencedRelation: "posts";
                        referencedColumns: ["id"];
                    }
                ];
            };
            posts: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: string;
                    post_by: string;
                    type: string | null;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    post_by: string;
                    type?: string | null;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    post_by?: string;
                    type?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_posts_post_by_fkey";
                        columns: ["post_by"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    created_at: string;
                    display_name: string | null;
                    email: string;
                    handle: string | null;
                    id: string;
                    image_url: string | null;
                    role: string | null;
                };
                Insert: {
                    created_at?: string;
                    display_name?: string | null;
                    email: string;
                    handle?: string | null;
                    id: string;
                    image_url?: string | null;
                    role?: string | null;
                };
                Update: {
                    created_at?: string;
                    display_name?: string | null;
                    email?: string;
                    handle?: string | null;
                    id?: string;
                    image_url?: string | null;
                    role?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey";
                        columns: ["id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
          Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
          Database["public"]["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof Database["public"]["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
