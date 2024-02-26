import { supabaseServer } from "@/lib/supabase/server";

import UserProfileButton from "./UserProfileButton";

export default async function UserProfile({
    fade = false,
    imageNew,
    user_id
}: {
    fade?: boolean;
    imageNew?: string;
    user_id: string;
}) {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user_id)
        .single();

    const imageUrl = data?.image_url;

    return (
        <div>
            {data?.id ? <UserProfileButton data={data} fade={fade} /> : ""}
        </div>
    );
}
