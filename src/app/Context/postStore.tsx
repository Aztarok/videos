import { create } from "zustand";
import { produce } from "immer";
import { Post } from "@/lib/types/custom";

type postStore = {
    posts: any[];
    setPosts: (newPosts: any[]) => void;
    followingPosts: any[];
    setFollowingPosts: (newFollowingPosts: any[]) => void;
};

export const usePostsStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (newPosts: any[]) => {
        set((state) => ({ posts: [...newPosts] }));
    },
    followingPosts: [],
    setFollowingPosts: (newFollowingPosts: any[]) => {
        set((state) => ({
            followingPosts: [...newFollowingPosts]
        }));
    }
    // immer example
    // setFollowingPosts: (newFollowingPosts: Post[]) => {
    //     set(
    //         produce((state) => {
    //             state.followingPosts = newFollowingPosts;
    //         })
    //     );
    // }
}));
