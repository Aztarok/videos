import React from "react";
import { Suspense } from "react";
import UserProfile from "../UserProfile";
import Delete from "../Delete";
import ImageComponent from "./Image";
import { supabaseServer } from "@/lib/supabase/server";
import VideoComponent from "./VideoComponent";
import { cn } from "@/lib/utils";
import BanUser from "../BanUser";

interface PostProps {
    post: {
        id: string;
        images: string[];
        description: string;
        post_by: string;
        image_user?: string;
    };
    user: any; // Adjust type as per your user data structure
    imageUrlHost: string;
    currentPost: number;
}

const Post: React.FC<PostProps> = async ({
    post,
    user,
    imageUrlHost,
    currentPost
}) => {
    const imagePaths = ["png", "jpg", "jpeg"];
    const images = post.images;
    const supabase = supabaseServer();
    const re = /(?:\.([^.]+))?$/;
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
    let loadType = false;
    if (currentPost === 1) {
        loadType = true;
    } else {
        loadType = false;
    }
    function getAspectRatio(extension: string): number {
        return imagePaths.includes(extension) ? 1 / 1 : 1 / 1; // Adjust aspect ratios as needed
    }
    let imagePrio = false;

    return (
        <div className="border-b-[1px] border-x-[1px] p-4 border-slate-400">
            <div className="flex w-full justify-between">
                <div className="w-[50px] h-[50px] mb-2">
                    <Suspense>
                        <UserProfile
                            user_id={post.post_by}
                            imageNew={post.image_user}
                        />
                    </Suspense>
                </div>
                <div className="flex gap-2">
                    {data?.role === "admin" ? (
                        <>
                            <Delete post_name={post.images} postId={post.id} />
                            <BanUser />
                        </>
                    ) : (
                        <div>
                            {user?.id === post.post_by && (
                                <Delete
                                    post_name={post.images}
                                    postId={post.id}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <h1 className="mb-2 h-auto break-words">{post.description}</h1>
            <div
                className={cn(
                    "grid rounded-xl overflow-hidden",
                    images.length === 1
                        ? "grid-cols-1 grid-rows-1"
                        : "grid-cols-2 grid-rows-2",
                    images.length === 0 ? "" : "border-[#E1E8ED] border-[1px]"
                )}
            >
                {images.map((image, index) => {
                    const ext: any = re.exec(post.images[index]);
                    const aspectRatio = 1 / 1;
                    const isLargeImage =
                        images.length === 2 ||
                        (images.length === 3 && index === 0);
                    if (index === 0) {
                        imagePrio = true;
                    } else {
                        imagePrio = false;
                    }
                    return (
                        <div
                            key={index}
                            className={`w-full ${
                                isLargeImage
                                    ? "col-span-1 row-span-2"
                                    : "h-full"
                            } cursor-pointer`}
                        >
                            {imagePaths.includes(ext[1]) ? (
                                <ImageComponent
                                    imageUrl={`${imageUrlHost}${image}`}
                                    alt={`${index} image`}
                                    aspectRatio={isLargeImage ? 1 / 2 : 1 / 1}
                                    prio={loadType}
                                />
                            ) : (
                                <VideoComponent
                                    videoUrl={`${imageUrlHost}${image}`}
                                    aspectRatio={isLargeImage ? 1 / 2 : 1 / 1}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Post;
