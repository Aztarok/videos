"use client";

import { useAppContext } from "@/app/Context/store";
import { supabaseBrowser } from "@/lib/supabase/browser";
import React, { Suspense } from "react";
import UserProfile from "../UserProfile";
import Delete from "../Delete";
import BanUser from "../BanUser";
import { cn } from "@/lib/utils";
import ImageComponent from "./Image";
import VideoComponent from "./VideoComponent";
import Link from "next/link";

interface PostProps {
    post: {
        id: string;
        created_at: string;
        images: string[];
        description: string;
        post_by: string;
        display_name: string;
        handle: string;
        image_user: string;
        role: string;
    };
}
const PostClient: React.FC<PostProps> = ({ post }) => {
    const imagePaths = ["png", "jpg", "jpeg"];
    const images = post.images;
    const supabase = supabaseBrowser();
    const re = /(?:\.([^.]+))?$/;
    const { state } = useAppContext();
    let imagePrio = false;
    const handleClick = () => {
        console.log("hi");
    };
    return (
        <div
            className="hover:cursor-pointer w-full h-full p-4"
            onClick={handleClick}
        >
            <div className="flex w-full justify-between">
                <div className="w-[50px] h-[50px] mb-2">
                    <Suspense>
                        <UserProfile
                            handle={post.handle}
                            display_name={post.display_name}
                            imageNew={post.image_user}
                        />
                    </Suspense>
                </div>
                <div className="flex gap-2">
                    {state?.role === "admin" ? (
                        <>
                            <Delete postId={post.id} post_name={post.images} />
                            <BanUser />
                        </>
                    ) : (
                        <div>
                            {state?.id === post.post_by && (
                                <Delete
                                    postId={post.id}
                                    post_name={post.images}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <h1 className="mb-2 h-auto break-words text-white">
                {post?.description}
            </h1>
            <div
                className={cn(
                    "grid rounded-xl overflow-hidden ml-12",
                    images.length === 1
                        ? "grid-cols-1 grid-rows-1"
                        : "grid-cols-2 grid-rows-2",
                    images.length === 0 ? "" : "border-[#E1E8ED] border-[1px]"
                )}
            >
                {images.map((image, index) => {
                    const ext: string | undefined = re.exec(
                        post?.images[index]
                    )?.[1];
                    if (!ext) {
                        return null;
                    }
                    const aspectRatio = 1 / 1;
                    const isLargeImage =
                        images.length === 2 ||
                        (images.length === 3 && index === 0);
                    if (index === 0) {
                        imagePrio = true;
                    } else {
                        imagePrio = false;
                    }
                    // image.split('/')[1]
                    return (
                        <div
                            key={index}
                            className={`w-full ${
                                isLargeImage
                                    ? "col-span-1 row-span-2"
                                    : "h-full"
                            } cursor-pointer`}
                        >
                            {imagePaths.includes(ext) ? (
                                <Link
                                    href={`/${post.handle}/post/${
                                        post.id
                                    }/photo/${index + 1}`}
                                >
                                    <ImageComponent
                                        imageUrl={`${image} `}
                                        alt={""}
                                        aspectRatio={
                                            isLargeImage ? 1 / 2 : 1 / 1
                                        }
                                        prio={imagePrio}
                                    />
                                </Link>
                            ) : (
                                <VideoComponent
                                    videoUrl={`${image} `}
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

export default PostClient;
