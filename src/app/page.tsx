import Uploader from "@/components/Uploader";
import { supabaseServer } from "@/lib/supabase/server";
import Image from "next/image";
import React from "react";

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
            {posts?.map((post, index) => {
                return (
                    <div key={index}>
                        <Image
                            src={post.image}
                            alt="post"
                            width={100}
                            height={300}
                        />
                        <h1>{post.description}</h1>
                    </div>
                );
            })}
            <Uploader />
        </div>
    );
};

export default Page;
