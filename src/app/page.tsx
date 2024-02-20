import DeletePost from "@/components/ui/DeletePost";
import UserProfile from "@/components/UserProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase/server";
import Image from "next/image";

const Page = async () => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*,profiles(display_name,image_url)")
        .order("created_at", { ascending: false });
    const imageUrlHost =
        "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
    const posts = data?.map((post) => {
        return {
            image: `${post.post_by}/${post.id}/${post.name}`,
            ...post
        };
    });
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    );

    const re: any = /(?:\.([^.]+))?$/;
    return (
        <div className="border-x-2 border-slate-600 h-screen">
            <div className="grid grid-cols-1 w-[80%] ml-auto mr-auto gap-10 ">
                Wow
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
