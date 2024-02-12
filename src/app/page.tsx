import Uploader from "@/components/Uploader";
import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase/server";
import Image from "next/image";
import React from "react";

interface Post {
    id: string;
    post_by: string;
    name: string;
    description: string;
}

const Page = async () => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*,profiles(display_name)");

    const posts = data?.map((post) => {
        return {
            image: `https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/${post.post_by}/${post.id}/${post.name}`,
            description: post.description
        };
        // https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/074610ae-4939-4b6a-9afa-b5714ec218b4/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/main_Vivian_spec_v2.png
        // https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/main_Vivian_spec_v2.png
    });

    return (
        <div>
            {JSON.stringify(data)}
            {JSON.stringify(posts)}
            <div className="flex flex-wrap">
                {posts?.map((post, index) => {
                    return (
                        <div
                            key={index}
                            className="p-5 bg-slate-700 border-white border-2 rounded-lg w-full flex flex-col justify-center items-center"
                        >
                            <Image
                                src={post.image}
                                alt="post"
                                width={500}
                                height={20}
                                sizes="100vw"
                                style={{ width: `auto`, height: `700px` }}
                                className="object-fill"
                            />
                            <Button className="mt-10 w-full">Hi</Button>
                        </div>
                    );
                })}
            </div>
            <Uploader />
        </div>
    );
};

export default Page;
