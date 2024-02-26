import { supabaseServer } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Suspense } from "react";
import Delete from "./Delete";
import UserProfile from "./UserProfile";

const FetchPosts = async ({ userId }: { userId?: string }) => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*,images(id, post_id, name, object_id)")
        .order("created_at", { ascending: false });
    const imageUrlHost = process.env.BUCKET_URL;
    const posts: any[] = [];
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
                    const { id, name, post_id, object_id } = imageObject; // Extract specific properties here
                    images.push(post.post_by + "/" + post_id + "/" + name); // Push extracted values into the images array
                }
                if (userId) {
                    if (post.post_by === userId) {
                        posts.push({
                            id: post.id,
                            images: images,
                            description: post.description,
                            post_by: post.post_by,
                            image_user: newOne?.image_url
                        });
                    } else {
                    }
                }
                posts.push({
                    id: post.id,
                    images: images,
                    description: post.description,
                    post_by: post.post_by,
                    image_user: newOne?.image_url
                });
            }
        }
    }
    const re: any = /(?:\.([^.]+))?$/;
    await getPosts();
    const { data: userData } = await supabase.auth.getUser();
    const user: User | null = userData?.user;

    return (
        <div className=" border-slate-700 max-h-[200vh] w-[598.67px] ">
            {posts?.map((post, index) => {
                const images = post.images;

                return (
                    <div
                        key={index}
                        className="border-b-[2px] border-x-[2px] p-4"
                    >
                        <div className="w-[50px] h-[50px] mb-2">
                            <Suspense>
                                <UserProfile
                                    user_id={post.post_by}
                                    imageNew={post.image_user}
                                />
                            </Suspense>
                        </div>
                        <h1 className="mb-2">{post.description}</h1>
                        <div
                            className={cn(
                                "grid rounded-lg overflow-hidden",
                                images.length === 1
                                    ? "grid-cols-1 grid-rows-1"
                                    : "grid-cols-2 grid-rows-2"
                            )}
                        >
                            {user?.id === post.post_by && (
                                <Delete post_name={post.images} />
                            )}
                            {post.images.map((image: string, index: number) => {
                                let ext: string | null | undefined = re.exec(
                                    post.images[index]
                                );
                                if (images.length === 3 && index === 0) {
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full col-span-1 row-span-2 cursor-pointer`}
                                        >
                                            {ext === "png" || "jpg" ? (
                                                <Image
                                                    src={imageUrlHost + image}
                                                    alt={`${index} image`}
                                                    width={0}
                                                    height={0}
                                                    priority={true}
                                                    sizes="100vw"
                                                    className="object-cover object-center w-full h-full"
                                                    style={{
                                                        aspectRatio: 1 / 1
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    );
                                } else if (images.length === 2) {
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full col-span-1 row-span-2 cursor-pointer`}
                                        >
                                            {ext === "png" || "jpg" ? (
                                                <Image
                                                    src={imageUrlHost + image}
                                                    alt={`${index} image`}
                                                    width={0}
                                                    height={0}
                                                    priority={true}
                                                    sizes="100vw"
                                                    className="object-cover object-center w-full h-full"
                                                    style={{
                                                        aspectRatio: 1 / 2
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full h-full cursor-pointer`}
                                        >
                                            {ext === "png" || "jpg" ? (
                                                <Image
                                                    src={imageUrlHost + image}
                                                    alt={`${index} image`}
                                                    width={0}
                                                    height={0}
                                                    priority={true}
                                                    sizes="100vw"
                                                    className="object-cover object-center w-full h-full"
                                                    style={{
                                                        aspectRatio: 1 / 1
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
        </div>
    );
};

export default FetchPosts;
