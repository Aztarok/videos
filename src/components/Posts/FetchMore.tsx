"use client";
import increaseData from "@/app/actions/increaseData";
import { usePostsStore } from "@/app/Context/postStore";
import { useAppContext } from "@/app/Context/store";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import PostClient from "./PostClient";

let debounce = require("lodash.debounce");

export function createPostObject(post: any) {
    let images: any[] = [];
    for (let j = 0; j < post?.images?.length; j++) {
        const imageObject = post.images[j];
        images.push(`${post.post_by}/${post.id}/${imageObject.name}`);
    }
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

const FetchMore = ({ FollowingList }: { FollowingList?: any }) => {
    const { postsArray, setPostsArray } = usePostsStore((state) => ({
        postsArray: state.posts,
        setPostsArray: state.setPosts
    }));
    const supabase = supabaseBrowser();
    const [page, setPage] = useState<number>(0);
    const scrollPercentage = useRef<number>(0);
    const [fetching, setFetching] = useState(false);
    const [turnOff, setTurnOff] = useState<boolean>(false);
    const { tabDisplay } = useAppContext();

    const getFromAndTo = () => {
        const ITEMS_PER_PAGE = 5;
        let from = page * ITEMS_PER_PAGE;
        let to = from + ITEMS_PER_PAGE;
        to -= 1;
        return { from, to };
    };

    const getPosts = async () => {
        if (turnOff) {
            toast.error("Can't load more posts, you have reached the end");
            return;
        }

        const { from, to } = getFromAndTo();
        const data = await increaseData(from, to);
        if (!data) {
            toast.error("Failed to get posts");
            return;
        }
        if (data.length === 0) {
            toast.error("Failed to get more posts");
            setTurnOff(true);
            return;
        }
        setPage(page + 1);

        const formattedPosts = data.map(createPostObject);
        setPostsArray(formattedPosts);
        setFetching(false);
    };

    const runFollowing = async () => {
        let idsForFollowing = FollowingList?.map(
            (item: any) => item.following_id
        );
        const { from, to } = getFromAndTo();
        const { data } = await supabase
            .from("posts")
            .select(
                "*,images(name),profiles(display_name, handle, image_url, role)"
            )
            .in("post_by", idsForFollowing)
            .range(from, to)
            .order("created_at", { ascending: false });
        if (!data) {
            toast.error("Failed to get posts");
            return;
        }
        setPage(page + 1);
        const formattedPosts = data.map(createPostObject);
        setPostsArray(formattedPosts);
        setFetching(false);
    };

    const handleScroll = debounce(() => {
        const { scrollY } = window;
        const { scrollHeight, clientHeight } = document.documentElement;
        const newScrollPercentage =
            (scrollY / (scrollHeight - clientHeight)) * 100;

        scrollPercentage.current = newScrollPercentage;

        if (newScrollPercentage > 98 && !fetching && !turnOff) {
            setFetching(true);
            if (tabDisplay === "For you") {
                document.getElementById("fetch")?.click();
            } else if (tabDisplay === "Following") {
                runFollowing();
            }
        }
    }, 1000);

    // ? I don't think I need this
    // const handleResize = () => {
    //     handleScroll();
    // };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // window.addEventListener("resize", handleResize);

        handleScroll();
        // handleResize();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            // window.removeEventListener("resize", handleResize);
        };
    }, [scrollPercentage, tabDisplay]);

    useEffect(() => {
        if (tabDisplay === "Following") {
            setPostsArray([]);
            setPage(0);
            runFollowing();
            setFetching(true);
        }
        if (tabDisplay === "For you") {
            setPostsArray([]);
            setPage(0);
            getPosts();
            setFetching(true);
        }
    }, [tabDisplay]);

    const imageUrlHost = "";

    let currentPost: number = 0;

    return (
        <div className="max-h-auto bg-slate-950 w-[598.67px]">
            {postsArray.map((post: any, index: number) => {
                currentPost++;
                return (
                    <div
                        key={index}
                        className="border-b-[1px] border-x-[1px] border-slate-400"
                    >
                        <PostClient
                            post={post}
                            imageUrlHost={imageUrlHost}
                            currentPost={currentPost}
                        />
                    </div>
                );
            })}
            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
            <Button
                onClick={() => {
                    getPosts();
                }}
                className="w-full bg-amber-600 my-5 hidden"
                id="fetch"
            >
                Fetch More
            </Button>
        </div>
    );
};

export default FetchMore;
