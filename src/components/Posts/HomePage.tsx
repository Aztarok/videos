"use client";

import increaseData from "@/app/actions/increaseData";
import { usePostsStore } from "@/app/Context/postStore";
import { useAppContext } from "@/app/Context/store";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostList from "./PostList";

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

const HomePage = ({ FollowingList }: { FollowingList?: any }) => {
    const posts = usePostsStore((state) => state.posts);
    const setPosts = usePostsStore((state) => state.setPosts);
    const followingPosts = usePostsStore((state) => state.followingPosts);
    const setFollowingPosts = usePostsStore((state) => state.setFollowingPosts);
    const [page, setPage] = useState<number>(0);
    const [fetching, setFetching] = useState(false);
    const { tabDisplay } = useAppContext();
    const supabase = supabaseBrowser();
    const getFromAndTo = () => {
        const ITEMS_PER_PAGE = 7;
        let from = page * ITEMS_PER_PAGE;
        let to = from + ITEMS_PER_PAGE - 1;
        return { from, to };
    };

    const [turnOff, setTurnOff] = useState<boolean>(false);
    const getPosts = async () => {
        if (turnOff) {
            toast.error("Can't load more posts, you have reached the end");
            return;
        }
        console.log("getting posts");
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
        setPosts(formattedPosts);
        setFetching(false);
    };
    const runFollowing = async () => {
        let idsForFollowing = FollowingList?.map(
            (item: any) => item.following_id
        );
        console.log("running following");
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
        setFollowingPosts(formattedPosts);
        setFetching(false);
    };

    useEffect(() => {
        if (tabDisplay === "Following") {
            if (followingPosts.length === 0) {
                setPage(0);
                setTurnOff(false);
                setFetching(true);
            }
        }
        if (tabDisplay === "For you") {
            if (posts.length === 0) {
                setPage(0);
                setTurnOff(false);
                setFetching(true);
            }
        }
    }, [tabDisplay]);

    useEffect(() => {
        if (fetching) {
            if (tabDisplay === "Following") {
                runFollowing();
            } else if (tabDisplay === "For you") {
                getPosts();
            }
        }
    }, [page, fetching]);
    return (
        <div className="text-white max-h-auto bg-slate-950 w-[600px]">
            {/* {tabDisplay === "For you" ? (
                <div>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border-b border-x border-slate-400"
                        >
                            <PostClient post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {followingPosts.map((post) => (
                        <div
                            key={post.id}
                            className="border-b border-x border-slate-400"
                        >
                            <PostClient post={post} />
                        </div>
                    ))}
                </div>
            )} */}
            {tabDisplay === "For you" ? (
                <PostList posts={posts} />
            ) : (
                <PostList posts={followingPosts} /> // Update if you have a separate state for following posts
            )}
        </div>
    );
};

export default HomePage;
