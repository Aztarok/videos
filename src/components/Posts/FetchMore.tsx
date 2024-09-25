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

const FetchMore = () => {
    const {
        posts,
        setPosts,
        followingPosts,
        setFollowingPosts,
        profilePosts,
        setProfilePosts,
        currentProfileId
    } = usePostsStore((state) => ({
        posts: state.posts,
        setPosts: state.setPosts,
        followingPosts: state.followingPosts,
        setFollowingPosts: state.setFollowingPosts,
        profilePosts: state.profilePosts,
        setProfilePosts: state.setProfilePosts,
        currentProfileId: state.currentProfileId
    }));

    const supabase = supabaseBrowser();
    const [pageForYou, setPageForYou] = useState<number>(0);
    const [pageFollowing, setPageFollowing] = useState<number>(0);
    const [pageProfile, setPageProfile] = useState<number>(0);
    const [fetching, setFetching] = useState(false);
    const [turnOffForYou, setTurnOffForYou] = useState<boolean>(false);
    const [turnOffFollowing, setTurnOffFollowing] = useState<boolean>(false);
    const [turnOffProfile, setTurnOffProfile] = useState<boolean>(false);
    const { tabDisplay } = useAppContext();

    const ITEMS_PER_PAGE = 5;

    const getFromAndTo = (page: number) => {
        let from = page * ITEMS_PER_PAGE;
        let to = from + ITEMS_PER_PAGE - 1;
        return { from, to };
    };

    const getPosts = async () => {
        if (turnOffForYou) {
            toast.error("Can't load more posts, you have reached the end");
            return;
        }

        const { from, to } = getFromAndTo(pageForYou);
        const { data } = await supabase
            .from("posts")
            .select(
                "*,images(name),profiles(display_name, handle, image_url, role)"
            )
            .range(from, to)
            .order("created_at", { ascending: false });

        if (!data || data.length === 0) {
            setTurnOffForYou(true);
            if (!data) toast.error("Failed to get posts");
            else toast.error("No more posts");
            return;
        }

        const formattedPosts = data.map(createPostObject);
        setPosts([...posts, ...formattedPosts]);
        setPageForYou(pageForYou + 1);
        setFetching(false);
    };

    const runFollowing = async () => {
        if (turnOffFollowing) {
            toast.error("Can't load more posts, you've reached the end");
            return;
        }

        const { from, to } = getFromAndTo(pageFollowing);
        let idsForFollowing: string[] = []; // Assuming you have this list available

        // Ensure you have the FollowingList available from context or props
        // Replace `FollowingList` with the actual source of following IDs
        // Example: const FollowingList = useFollowing().data;

        const { data } = await supabase
            .from("posts")
            .select(
                "*,images(name),profiles(display_name, handle, image_url, role)"
            )
            .in("post_by", idsForFollowing)
            .range(from, to)
            .order("created_at", { ascending: false });

        if (!data || data.length === 0) {
            setTurnOffFollowing(true);
            if (!data) toast.error("Failed to get posts");
            else toast.error("No more posts");
            return;
        }

        const formattedPosts = data.map(createPostObject);
        setFollowingPosts([...followingPosts, ...formattedPosts]);
        setPageFollowing(pageFollowing + 1);
        setFetching(false);
    };

    const runProfilePosts = async () => {
        if (turnOffProfile || !currentProfileId) {
            toast.error("Can't load more posts, you've reached the end");
            return;
        }

        const { from, to } = getFromAndTo(pageProfile);
        const { data } = await supabase
            .from("posts")
            .select(
                "*,images(name),profiles(display_name, handle, image_url, role)"
            )
            .eq("post_by", currentProfileId)
            .range(from, to)
            .order("created_at", { ascending: false });

        if (!data || data.length === 0) {
            setTurnOffProfile(true);
            if (!data) toast.error("Failed to get posts");
            else toast.error("No more posts");
            return;
        }

        const formattedPosts = data.map(createPostObject);
        setProfilePosts([...profilePosts, ...formattedPosts]);
        setPageProfile(pageProfile + 1);
        setFetching(false);
    };

    const handleScroll = debounce(() => {
        const { scrollY } = window;
        const { scrollHeight, clientHeight } = document.documentElement;
        const newScrollPercentage =
            (scrollY / (scrollHeight - clientHeight)) * 100;

        if (newScrollPercentage > 98 && !fetching) {
            setFetching(true);
            if (tabDisplay === "For you") {
                getPosts();
            } else if (tabDisplay === "Following") {
                runFollowing();
            } else if (tabDisplay === "Profile") {
                runProfilePosts();
            }
        }
    }, 1000);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetching, tabDisplay, pageForYou, pageFollowing, pageProfile]);

    useEffect(() => {
        setFetching(true);
        if (tabDisplay === "For you") {
            if (posts.length === 0) {
                setTurnOffForYou(false);
                setPageForYou(0);
                getPosts();
            }
        } else if (tabDisplay === "Following") {
            if (followingPosts.length === 0) {
                setTurnOffFollowing(false);
                setPageFollowing(0);
                runFollowing();
            }
        } else if (tabDisplay === "Profile") {
            if (profilePosts.length === 0) {
                setTurnOffProfile(false);
                setPageProfile(0);
                runProfilePosts();
            }
        }
    }, [tabDisplay]);

    return (
        <div className="max-h-auto bg-slate-950 w-[598.67px]">
            {tabDisplay === "For you" &&
                posts.map((post: any, index: number) => (
                    <div
                        key={index}
                        className="border-b-[1px] border-x-[1px] border-slate-400"
                    >
                        <PostClient post={post} />
                    </div>
                ))}
            {tabDisplay === "Following" &&
                followingPosts.map((post: any, index: number) => (
                    <div
                        key={index}
                        className="border-b-[1px] border-x-[1px] border-slate-400"
                    >
                        <PostClient post={post} />
                    </div>
                ))}
            {tabDisplay === "Profile" &&
                profilePosts.map((post: any, index: number) => (
                    <div
                        key={index}
                        className="border-b-[1px] border-x-[1px] border-slate-400"
                    >
                        <PostClient post={post} />
                    </div>
                ))}
            <div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
            <Button
                onClick={() => {
                    if (tabDisplay === "For you") {
                        getPosts();
                    } else if (tabDisplay === "Following") {
                        runFollowing();
                    } else if (tabDisplay === "Profile") {
                        runProfilePosts();
                    }
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
