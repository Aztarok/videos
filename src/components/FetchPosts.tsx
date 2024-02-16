import Profile from "@/components/Profile";
import { supabaseServer } from "@/lib/supabase/server";
import { Post } from "@/lib/types/custom";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const FetchPosts = async ({ variant }: { variant?: any }) => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*,profiles(display_name)");
    const baseUrl =
        "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
    const posts: Post[] = [];
    const { data: user } = await supabase.auth.getUser();
    async function getPosts() {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const post = data[i];
                const { data: newOne } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", post.post_by)
                    .single();
                if (variant === "profile") {
                    if (post.post_by === user.user?.id) {
                        posts.push({
                            id: post.id,
                            name: post.name,
                            post_by: post.post_by,
                            image: `${baseUrl}${post.post_by}/${post.id}/${post.name}`,
                            description: post.description,
                            image_user: newOne?.image_url
                        });
                    }
                } else {
                    posts.push({
                        id: post.id,
                        name: post.name,
                        post_by: post.post_by,
                        image: `${baseUrl}${post.post_by}/${post.id}/${post.name}`,
                        description: post.description,
                        image_user: newOne?.image_url
                    });
                }
            }
        }
    }
    await getPosts();

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-5">
                {posts
                    ?.map((post, index) => {
                        let lastThree = post.name.substr(post.name.length - 3);
                        return (
                            <div
                                key={index}
                                className="p-5 bg-slate-800 hover:bg-slate-950 hover:cursor-pointer border-white border-2 rounded-lg w-[75%] flex flex-col justify-center items-center space-y-5"
                            >
                                <div className="h-8 flex justify-start w-full flex-col">
                                    <Suspense>
                                        <Profile
                                            fade={false}
                                            imageNew={post.image_user}
                                        />
                                    </Suspense>
                                </div>
                                <h1 className="text-white flex justify-start w-full text-xl font-medium">
                                    {post.description}
                                </h1>
                                {lastThree !== "mp4" ? (
                                    <Image
                                        src={post.image}
                                        alt={`${post.id}`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="object-fill w-96"
                                    />
                                ) : (
                                    <video controls>
                                        <source
                                            src={post.image}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>
                        );
                    })
                    .reverse()}
            </div>
        </div>
    );
};

export default FetchPosts;
