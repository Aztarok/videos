export interface Post {
    id: any;
    name: any;
    post_by: any;
    image: any;
    description: any;
    image_user: any;
    width?: any;
    height?: any;
}
export interface CustomUser {
    id: string;
    handle: string | null;
    display_name: string | null;
    created_at?: any;
    image_url?: string | null;
    email?: string;
}
