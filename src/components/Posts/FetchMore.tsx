"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const FetchMore = () => {
    const supabase = supabaseBrowser();
    const [posts, setPosts] = useState<any>([]);
    const [page, setPage] = useState<number>(0);
    const [user, setUser] = useState<any>(async () => {
        return await supabase.auth.getUser();
    });
    const getFromAndTo = () => {
        const ITEMS_PER_PAGE = 1;
        let from = page * ITEMS_PER_PAGE;
        let to = from + ITEMS_PER_PAGE;

        if (page > 0) {
            from += 1;
        }

        return { from, to };
    };

    // function getFromAndTo(page: number, limit: number) {
    //     page = Math.max(page, 1);
    //     limit = Math.max(limit, 1);
    //     page = page - 1;

    //     const from = page * limit;
    //     const to = from + limit - 1;

    //     return { from, to };
    // }

    // const getPosts = async () => {
    //     const { from, to } = getFromAndTo(page, 1);
    //     console.log(from);
    //     console.log(to);
    //     const { data } = await supabase
    //         .from("posts")
    //         .select(
    //             "*,images(name),profiles(display_name, handle, image_url, role)"
    //         )
    //         .range(from, to)
    //         .order("created_at", { ascending: false });
    //     if (!data) {
    //         return;
    //     }
    //     setPage(page + 1);
    //     for (let i = 0; i < data.length; i++) {
    //         const post = posts[i];
    //         let images: any[] = [];
    //         // for (let j = 0; j < post.images.length; j++) {
    //         //     const imageObject = post.images[j];
    //         //     const { name } = imageObject;
    //         //     images.push(`${post.post_by}/${post.id}/${name}`);
    //         // }
    //         console.log(post);
    //         const newPost = createPostObject(post);
    //         setPosts((currentData: any) => [...currentData, { ...newPost }]);
    //     }
    // };
    const getPosts = async () => {
        const { from, to } = getFromAndTo();
        console.log(from);
        console.log(to);
        const { data } = await supabase
            .from("posts")
            .select(
                "*,images(name),profiles(display_name, handle, image_url, role)"
            )
            .range(from, to)
            .order("created_at", { ascending: false });
        if (!data) {
            return;
        }
        setPage(page + 1);
        const formattedPosts = data.map(createPostObject);
        setPosts((currentPosts: any) => [...currentPosts, ...formattedPosts]);
    };

    const imageUrlHost = process.env.BUCKET_URL || "";
    function createPostObject(post: any) {
        let images: any[] = [];
        for (let j = 0; j < post?.images?.length; j++) {
            const imageObject = post.images[j];
            console.log(imageObject);
            const { name } = imageObject;
            images.push(`${post.post_by}/${post.id}/${imageObject.name}`);
        }
        console.log(images);
        return {
            id: post.id,
            created_at: post.created_at,
            images,
            description: post.description,
            post_by: post.post_by,
            display_name: post.profiles?.display_name,
            handle: post.profiles?.handle,
            image_user: post.profiles?.image_url,
            role: post.profiles?.role
        };
    }
    let currentPost: number = 0;
    const re = /(?:\.([^.]+))?$/;
    let imagePrio = false;

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="max-h-auto bg-slate-950 w-[598.67px]">
            {posts
                .map((post: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className="border-b-[1px] border-x-[1px] p-4 border-slate-400"
                        >
                            {JSON.stringify(post)}
                        </div>
                    );
                })
                .reverse()}
            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
            <Button
                onClick={() => {
                    getPosts();
                }}
                className="w-full bg-amber-600 my-20"
            >
                Fetch More
            </Button>
        </div>
    );
};

export default FetchMore;
