import Delete from "@/components/Delete";
import UserProfile from "@/components/UserProfile";
import { supabaseServer } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Suspense } from "react";

const Page = async () => {
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
                let gridLayoutClass = "";

                switch (images.length) {
                    case 1:
                        gridLayoutClass = "grid-cols-1 grid-rows-1";
                        break;
                    case 2:
                        gridLayoutClass = "grid-cols-2 grid-rows-2";
                        break;
                    case 3:
                        gridLayoutClass = "grid-cols-2 grid-rows-2";
                        break;
                    case 4:
                        gridLayoutClass = "grid-cols-2 grid-rows-2";
                        break;
                    default:
                        // Handle cases where there are more than 4 images if needed
                        break;
                }

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
                            className={`grid ${gridLayoutClass} rounded-lg overflow-hidden`}
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

            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10">
                {/* {posts?.map((post) => {
                    let ext: string | null | undefined = re.exec(post.name)[1];

                    return (
                        <div
                            key={post.id}
                            className="rounded-md w-full space-y-5 relative"
                        >
                            <div className="flex items-end gap-2">
                                <UserProfile user_id={post.post_by} />
                                <h1>@{post.profiles?.display_name}</h1>
                            </div>
                            <div className="w-full h-[500px] relative rounded-md border-2 flex">
                                {ext === "mp4" ? (
                                    <video
                                        controls
                                        className="rounded-md object-cover object-center w-full"
                                    >
                                        <source
                                            src={imageUrlHost + post.image}
                                        />
                                    </video>
                                ) : (
                                    <Image
                                        src={imageUrlHost + post.image}
                                        alt={post.description || ""}
                                        fill
                                        sizes="100vw"
                                        className="rounded-md object-cover object-center"
                                    />
                                )}
                            </div>
                            <DeletePost
                                post_by={post.post_by}
                                image={post.image}
                            />
                        </div>
                    );
                })} */}
            </div>
        </div>
    );
};

export default Page;
