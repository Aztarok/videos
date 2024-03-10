// FetchPosts.tsx
import { supabaseServer } from "@/lib/supabase/server";
import { Suspense } from "react";
import Post from "./Post";
import FetchMore from "./FetchMore";

interface FetchPostsProps {
    userName?: string;
}

const FetchPosts: React.FC<FetchPostsProps> = async ({
    userName
}: FetchPostsProps) => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*,images(id, post_id, name, object_id)")
        .order("created_at", { ascending: false });

    const imageUrlHost = process.env.BUCKET_URL || ""; // Ensure to provide a fallback value
    const posts: any[] = [];

    function createPostObject(post: any, images: string[], newOne: any) {
        return {
            id: post.id,
            images,
            description: post.description,
            post_by: post.post_by,
            image_user: newOne?.image_url
        };
    }

    async function getPosts() {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const post = data[i];
                const { data: newOne } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", post.post_by)
                    .single();
                let images = [];
                for (let j = 0; j < post.images.length; j++) {
                    const imageObject = post.images[j];
                    const { id, name, post_id, object_id } = imageObject;
                    images.push(`${post.post_by}/${post_id}/${name}`);
                }
                if (userName) {
                    const { data: profilePosts } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("display_name", userName)
                        .single();
                    if (post.post_by === profilePosts?.id) {
                        posts.push({
                            id: post.id,
                            images,
                            description: post.description,
                            post_by: post.post_by,
                            image_user: newOne?.image_url
                        });
                    }
                } else {
                    posts.push({
                        id: post.id,
                        images,
                        description: post.description,
                        post_by: post.post_by,
                        image_user: newOne?.image_url
                    });
                }
            }
        }
    }
    let currentPost: number = 0;

    await getPosts();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    return (
        <div className="max-h-auto bg-slate-950 w-[598.67px]">
            {posts.map((post, index) => {
                currentPost++;
                return (
                    <Post
                        key={index}
                        post={post}
                        user={user}
                        imageUrlHost={imageUrlHost}
                        currentPost={currentPost}
                    />
                );
            })}
            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
            <FetchMore />
        </div>
    );
};

export default FetchPosts;
