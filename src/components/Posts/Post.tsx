import { Suspense } from "react";
import { cn } from "@/lib/utils";
import UserProfile from "../UserProfile";
import Delete from "../Delete";
import ImageComponent from "./Image";

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
}

const Post: React.FC<PostProps> = ({ post, user, imageUrlHost }) => {
    const images = post.images;

    const re = /(?:\.([^.]+))?$/;

    return (
        <div className="border-b-[2px] border-x-[2px] p-4">
            <div className="flex w-full justify-between">
                <div className="w-[50px] h-[50px] mb-2">
                    <Suspense>
                        <UserProfile
                            user_id={post.post_by}
                            imageNew={post.image_user}
                        />
                    </Suspense>
                </div>
                {user?.id === post.post_by && (
                    <Delete post_name={post.images} postId={post.id} />
                )}
            </div>
            <h1 className="mb-2 h-auto break-words">{post.description}</h1>
            <div
                className={cn(
                    "grid rounded-lg overflow-hidden",
                    images.length === 1
                        ? "grid-cols-1 grid-rows-1"
                        : "grid-cols-2 grid-rows-2"
                )}
            >
                {images.map((image, index) => {
                    const ext: any = re.exec(post.images[index]);
                    const isLargeImage =
                        images.length === 2 ||
                        (images.length === 3 && index === 0);

                    return (
                        <div
                            key={index}
                            className={`w-full ${
                                isLargeImage
                                    ? "col-span-1 row-span-2"
                                    : "h-full"
                            } cursor-pointer`}
                        >
                            {ext === "png" || "jpg" ? (
                                <ImageComponent
                                    imageUrl={`${imageUrlHost}${image}`}
                                    alt={`${index} image`}
                                    aspectRatio={isLargeImage ? 1 / 2 : 1 / 1}
                                />
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Post;
