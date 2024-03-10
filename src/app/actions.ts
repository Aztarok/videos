import { revalidatePath } from "next/cache";

// export default async function authCheck(pathname: string) {
//     revalidatePath(pathname);
// }
export default async function postsGet() {
    // const { data } = await supabase
    //     .from("posts")
    //     .select("*,images(id, post_id, name, object_id)")
    //     .order("created_at", { ascending: false });
    // return data;
    return 5;
}
